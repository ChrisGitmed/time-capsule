require('dotenv/config');
const pg = require('pg');
const nodemailer = require('nodemailer');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
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

let sql = `
  select (recipient, content, "capsuleId")
    from capsules
   where "sendOn" < now()
`;

db.query(sql)
  .then(res => {
    for (let i = 0; i < res.rows.length; i++) {
      const rowAsArr = res.rows[i].row.split(',');
      const recipient = rowAsArr[0].substring(1);
      const location = rowAsArr[1];
      const capsuleId = rowAsArr[2].substring(0, rowAsArr[2].length - 1);
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
        .then(() => {
          sql = `
            update capsules
               set "sentAt" = now()
             where "capsuleId" = $1;
          `;
          const params = [capsuleId];
          db.query(sql, params)
            .catch(err => {
              throw (err);
            });
        });
    }
  })
  .catch(err => {
    throw (err);
  });
