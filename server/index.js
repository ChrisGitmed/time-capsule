require('dotenv/config');
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

app.post('/api/uploads', upload.single('file'), function (req, res, next) {
  // eslint-disable-next-line no-console
  console.log('upload successful');
  res.status(200).send();
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
