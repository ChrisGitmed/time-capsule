require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const staticMiddleware = require('./static-middleware');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
const jsonMiddleware = express.json();
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1'
});
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'lfztimecapsule',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/download/:capsuleId', (req, res, next) => {
  const { capsuleId } = req.params;
  const sql = `
    select content
      from capsules
     where "capsuleId" = $1
  `;
  const params = [capsuleId];
  db.query(sql, params)
    .then(result => {
      const { content } = result.rows[0];
      const path = new URL(content).pathname;
      const key = path.substring(1);
      const bucketParams = { Bucket: 'lfztimecapsule', Key: key };
      s3.getSignedUrlPromise('getObject', bucketParams)
        .then(url => {
          res.redirect(303, url);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" (username, "hashedPassword")
             values ($1,
                     $2)
          returning "userId", username
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId", "hashedPassword"
      from "users"
     where username = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/capsules', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from capsules
     where "userId" = $1
  order by "sendOn"
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/uploads', upload.single('file'), (req, res, next) => {
  const {
    recipient,
    sendOn
  } = req.body;
  const {
    location,
    mimetype
  } = req.file;
  const { userId } = req.user;
  const sql = `
    insert into "capsules" (recipient, content, "sendOn", "userId", type)
         values ($1,
                 $2,
                 $3,
                 $4,
                 $5)
      returning *;
  `;
  const params = [recipient, location, sendOn, userId, mimetype];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
