require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'username and password are required.' });
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
      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ error: 'invalid login' });
  }
  const sql = `
    select ("userId", "hashedPassword")
      from "users"
     where username = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result =>
      res.status(200).json(result.rows))
    .catch(err => console.error(err));
});

app.post('/api/uploads', upload.single('file'), (req, res, next) => {
  const {
    recipient,
    date,
    time
  } = req.body;
  const { location } = req.file;

  const dateArray = date.split('-');
  const timeArray = time.split(':');
  const [
    year,
    month,
    day
  ] = dateArray;
  const [
    hour,
    minute
  ] = timeArray;
  const sendDate = JSON.stringify(new Date(year, month, day, hour, minute));

  const sql = `
    insert into "capsules" (recipient, content, "sendOn")
         values ($1,
                 $2,
                 $3)
      returning *;
  `;
  const params = [recipient, location, sendDate];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
