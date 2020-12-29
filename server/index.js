require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.post('/api', (req, res, next) => {

  const S3 = require('aws-sdk/clients/s3');

  const s3 = new S3({
    apiVersion: '2006-03-01',
    region: 'us-west-1'
  });

  const uploadParams = { Bucket: 'lfztimecapsule', Key: '', Body: '' };
  const { file } = req.body;

  const fs = require('fs');
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', function (err) {
    // console.log('File Error', err);
    if (err) throw err;
  });
  uploadParams.Body = fileStream;
  const path = require('path');
  uploadParams.Key = path.basename(file);

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      // console.log('Error', err);
      throw (err);
    } if (data) {
      // console.log('Upload Success', data.Location);
      res.status(200).send();
    }
  });

  res.status(200).send();
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
