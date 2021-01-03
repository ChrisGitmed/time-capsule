require('dotenv/config');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

// let now = new Date();
// now = JSON.stringify(now);

const sql = `
  select (recipient, content, "sendOn")
    from capsules
`;

db.query(sql)
  .then(res => {
    for (let i = 0; i < res.rows.length; i++) {
      // const rowAsArr = res.rows[i].row.split(',');
      // const recipient = rowAsArr[0].substring(1);
      // console.log('recipient: ', recipient);
      // const location = rowAsArr[1].substring(0, rowAsArr[1].length - 1);
      // console.log('location: ', location);
    }

  })
  .catch(err => {
    throw (err);
  });
