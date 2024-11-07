require("dotenv/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// =============== FORGOT PASSWORD ================
function forgotPasswordEmail(firstName, logo, link, email, thisyear) {
  output = `
        <head>
        <style> 
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        body {
          background-color: #f4f5f6;
        }
        
        h1 {
          font-weight: 700;
          font-size: 30px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          color: #333;
          font-family: sans-serif;
        }
        hr {
          margin-top: 20px;
          margin-bottom: 20px;
          border: 0;
          border-top: 1px solid #eee;
        }
        
        </style>
      </head>
      <body>
          <div style="-webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 40px 20px 20px;
          background-color: #f4f5f6;">
          <div style="  width:100%;
          background-color: white;
          position: relative;
          border: 1px solid #eee;">
          <div style="margin: 30px 30px; text-align:center">
          <img style="background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          width: 210px;
          position: relative;" src="${logo}">
      </div>
    
              <hr style="margin-top: 12px; margin-bottom: 12px;">
              <div style="margin: 30px 30px;">
                  <h1>你好 ${firstName},</h1>
                  <br>
                  <p>哎呦喂呀! 忘記密碼了嗎? 不緊張, 小幫手來了.</p>
                      <br/>
                  <p>請點下方的連結, 新視窗將會開啟. 您就可以做密碼重設了.</p>
               
                  <br/>
                  <a href="${link}">${link}</a>
                  <br/><br/>
                  <p>如果開啟有失誤, 請把連結貼在瀏覽器網址輸入的位置試試看.</p>
                          <br/>
                  <p>謝謝您,</p>
                  <p>愛課網客服小組</p>
                  <div style="margin:0">
                  <img style="background-repeat: no-repeat;
                  background-size: contain;
                  background-position: center;
                  margin: 0; width:120.88px" src="${logo}" alt="logo">
                  </div>
                  <br>
                  <div style=" font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">此電子郵件發自愛課網客服小組至 ${email}.</div>
                  <div style="  font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">© <span>${thisyear}</span> 版權所有 愛課網 Mango Tech All Rights Reserved</div>
                  </p>
              </div>
          </div>
      </div>
      </body>
        `;
  return output;
}

function sendforgotPasswordEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };

  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent!!!", err);
    } else {
      console.log("Email sent successfully!!!");
    }
  });
}

// ============ INFORM PASSWORD HAS CHANGED ==============
function informPasswordChangeEmail(firstName, logo, email, thisyear) {
  output = `
      <head>
      <style> 
      html,
      body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      body {
        background-color: #f4f5f6;
      }
      
      h1 {
        font-weight: 700;
        font-size: 30px;
      }
      p {
        font-weight: 500;
        font-size: 14px;
        color: #333;
        font-family: sans-serif;
      }
      hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
      }
      
      </style>
    </head>
    <body>
        <div style="-webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 40px 20px 20px;
        background-color: #f4f5f6;">
        <div style="  width:100%;
        background-color: white;
        position: relative;
        border: 1px solid #eee;">
        <div style="margin: 30px 30px; text-align:center">
        <img style="background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        width: 210px;
        position: relative;" src="${logo}">
    </div>
  
            <hr style="margin-top: 12px; margin-bottom: 12px;">
            <div style="margin: 30px 30px;">
                <h1>你好 ${firstName},</h1>
                <br>
                <p>您的密碼已經確定更新了. 你無需做任何動作, 這封email只是跟您確認密碼更新完畢.</p>
                    <br>
                    <p>如果您沒有做密碼更新的動作, 或是認為有他人更新您的帳號密碼, 請立即連繫愛課網客服小組.  <a href="/contact">聯繫我們</a>.</p>
             
			        	<br>
                <p>謝謝您,</p>
                <p>愛課網客服小組</p>
                <div style="margin:0">
                <img style="background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                margin: 0; width:120.88px" src="${logo}" alt="logo">
                </div>
                <br>
                <div style=" font-size: 12px;
                color: #777;
                text-align: center;
                margin: 10px auto;">此電子郵件發自愛課網客服小組至 ${email}.</div>
                <div style="  font-size: 12px;
                color: #777;
                text-align: center;
                margin: 10px auto;">© <span>${thisyear}</span> 版權所有 愛課網 Mango Tech All Rights Reserved</div>
                </p>
            </div>
        </div>
    </div>
    </body>
      `;
  return output;
}

function sendPasswordChangedEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log("Email sent successfully");
    }
  });
}

// ============ CONTACT US EMAIL ==============
function contactUsContent(name, phone, email, message, thisyear, logo) {
  output = `
      <head>
      <style> 
  
      html,
      body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      body {
        background-color: #f4f5f6;
      }
      
      h1 {
        font-weight: 700;
        font-size: 30px;
      }
      p {
        font-weight: 500;
        font-size: 14px;
        color: #333;
        font-family: sans-serif;
      }
      hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
      }
      

      
      </style>
    </head>
    <body>
        <div style="-webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 40px 20px 20px;
        background-color: #f4f5f6;">
        <div style="  width:100%;
        background-color: white;
        position: relative;
        border: 1px solid #eee;">
        <div style="margin: 30px 30px; text-align:center">
        <img style="background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        width: 210px;
        position: relative;" src="${logo}">
    </div>
  
            <hr style="margin-top: 12px; margin-bottom: 12px;">
            <div style="margin: 30px 30px;">
                <h1>Hi 管理員,</h1>
                <br>
                <p>您收到來自於<b>${name}</b>的訊息.
                    <br><br>
                <div style=" margin: 0;">
                    <h4 style="font-weight: 800; margin-top: 0; margin-bottom: 0;">填寫訊息:</h4>
                    <hr style=" margin-top: 12px;margin-bottom: 12px;">
                    <p style="color: #333; margin-bottom: 5px; white-space: pre-wrap;">${message} </p>
                  
                </div>
                <hr>
                <b>客人聯繫資料:</b>
                <div style=" margin: 0;">
                <p>Email: ${email}</p>
                <p>行動電話: ${phone}</p>
                </div>
                
                <br>
                <br>
                <p>謝謝您,</p>
                <p>${name} 啟</p>
                <div style="margin:0">
                <img style="background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                margin: 0; width:120.88px" src="${logo}" alt="logo">
                </div>
                <br>
                <div style=" font-size: 12px;
                color: #777;
                text-align: center;
                margin: 10px auto;">
                此電子郵件由愛課網「聯絡我們」填寫單發出.</div>
                <div style="  font-size: 12px;
                color: #777;
                text-align: center;
                margin: 10px auto;">© <span>${thisyear}</span> 版權所有 愛課網 Mango Tech All Rights Reserved</div>
                </p>
            </div>
        </div>
    </div>
    </body>
      `;
  return output;
}

function contactUsEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = {
  contactUsContent,
  contactUsEmail,
  forgotPasswordEmail,
  sendforgotPasswordEmail,
  informPasswordChangeEmail,
  sendPasswordChangedEmail,
};
