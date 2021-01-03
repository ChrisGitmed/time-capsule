require('dotenv/config');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const sql = `
  select (recipient, content)
    from capsules
`;

db.query(sql)
  .then(res => {
    // const rowAsArr = res.rows[0].row.split(',');
    // const recipient = rowAsArr[0].substring(1);
    // const location = rowAsArr[1].substring(0, rowAsArr[1].length - 1);
  })
  .catch(err => {
    throw (err);
  });
