require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const nodemailer = require('nodemailer');

const app = express();
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1'
});
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
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
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'cgitmed@gmail.com',
    pass: ''
  }
});

app.use(staticMiddleware);

app.post('/api/uploads', upload.single('file'), (req, res, next) => {
  const { recipient } = req.body;
  const { location } = req.file;
  const sql = `
    insert into "capsules" (recipient, content)
         values ($1,
                 $2)
      returning *;
  `;
  const params = [recipient, location];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .then(
      transporter.sendMail({
        from: '<cgitmed@gmail.com>',
        to: 'cgitmed@gmail.com',
        subject: 'Is this working?',
        html: '<h1>Hello world!<h1>'
      })
    )
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
