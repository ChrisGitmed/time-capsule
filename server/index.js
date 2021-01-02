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
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
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
    insert into "capsules" (recipient, content, send)
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
    .then(
      transporter.sendMail({
        from: '<cgitmed@gmail.com>',
        to: recipient,
        subject: 'Someone sent you a file!',
        html: `
          <div style="height: 100vh;
                      background-color: #E1E5F2;
                      text-align: center">
            <div style="background-color: #022B3A;
                        text-align: center;
                        padding: 1rem;">
              <h1 style="color: #BFDBF7">
                Time Capsule
              </h1>
            </div>

            <div style="display: flex;
                        flex-wrap: wrap;">
              <div style="width: 100%;
                          display: flex;">
                <div style="width: 65%;
                            margin: 4rem auto 2rem auto;
                            background-color: white;
                            text-align: center;
                            border-radius: 10px;
                            padding: 1.5rem 1rem;">
                  <p>
                    Someone sent you a capsule!<br>
                    Click to download.
                  </p>

                  <div style="width: 100%;
                              display: flex">
                    <div style="width: 40%;
                                margin: 1rem auto;
                                background-color: #E1E5F2;
                                border-radius: 5px;
                                padding: 1rem;">
                      <a href="${location}">Download link</a>
                    </div>
                  </div>
                  <em style="font-size: 11px">Sent from a bot. Please do not respond</em>
                </div>
              </div>
            </div>
            <p><em style="font-size: 11px">Visit me here</em><br>
               <em style="font-size: 11px">See how I work here</em></p>
          <div>
        `
      })
    )
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
