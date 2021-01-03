require('dotenv/config');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const sql = `
  select (recipient, content)
    from capsules
    where "sendOn" < now()
`;

db.query(sql)
  .then(res => {
    // for (let i = 0; i < res.rows.length; i++) {
    // const rowAsArr = res.rows[i].row.split(',');
    // const recipient = rowAsArr[0].substring(1);
    // const location = rowAsArr[1].substring(0, rowAsArr.length - 1);
    // }
  })
  .catch(err => {
    throw (err);
  });
