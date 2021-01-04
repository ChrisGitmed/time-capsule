require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
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
