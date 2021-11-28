const nodemailer = require('nodemailer');

const sendEmail = async () => { 
  const trasporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 465,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
      },
  });

  const mailOptions = {
      from: process.env.EMIL_FROM,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC,
      subject: process.env.EMAIL_SUBJECT,
      html: `<div>
      <div ><u></u>
        <div style="background-color:#fafafa;font-family:Roboto,sans-serif">
          <div style="width:600px;margin:0 auto">
            <table style="width:100%;padding:34px 0px;border-spacing:0">
              <tbody>
                <tr>
                  <td style="padding:0">
                    <img src="https://storage.googleapis.com/mmcam_public_src/Logo-MM.png" alt="Google Cloud"
                      style="vertical-align:top" class="CToWUd" height="80px">
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style="background-color:white;border-top:4px solid #d40001;border-left:1px solid #eee;border-right:1px solid #eee;border-radius:6px 6px 0 0;height:24px">
            </div>
            <div
              style="background-color:white;border-left:1px solid #eee;border-right:1px solid #eee;padding:0 24px;overflow:hidden">
              <table style="width:100%;border-spacing:0">
                <tbody>
                  <tr>
                    <td style="width:35px;padding:0">
                      <img
                        src="https://www.gstatic.com/stackdriver/notification/exclamation_mark.png"
                        alt="exclamation mark" style="vertical-align:top" class="CToWUd">
                    </td>
                    <td style="padding:0;font-family:inherit">
                      <span style="color:#d40001;font-size:130%;font-weight:bold">
                       CTD API - Excel Generado!</span>
                       <img src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png" alt="Google Cloud"
                      style="display:block;
                      margin:auto;" class="CToWUd" height="80px">
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="height:54px"></div>
            </div>
            <div
              style="background-color:white;border-left:1px solid #eee;border-right:1px solid #eee;border-bottom:1px solid #eee;height:58px">
            </div>
            <div style="padding:62px 6px;text-align:center;color:#757575">
              <p>© 2021 <span class="il">Métrica Móvil</span> S.A. de C.V.<br>
                <a style="color:inherit;text-decoration:none">C. Heliotropos #5, Torreón Jardín, 27200 Torreón, Coah.</a>
              </p>
              <p>Disclaimer: La información contenida en el presente correo es de carácter confidencial y para uso
                exclusivo de la persona o institución a que se refiere. Si usted no es el destinatario de este mensaje, es
                ilegal cualquier distribución, divulgación, reproducción, completa o parcial, aprovechamiento, uso o
                cualquier otra acción relativa del mismo. Por favor notifique al remitente y borre el presente mensaje de
                forma permanente de cualquier computadora en la que resida y en caso de existir, destruya cualquier copia
                impresa.
                Disclaimer: The information in this email is confidential and exclusively for the person or institution to
                which it refers. If you are not the intended recipient of this message, any full or partial distribution,
                disclosure, copying, use or any other relative action of the same kind is prohibited and may be unlawful.
                Please notify the sender and immediately and permanently delete this message from any computer in which it
                resides and in case of existing, destroy any copy printed out.</p>
              <div></div>
              <div>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div>
        </div>
      </div>
  </div>`,

      attachments: [
          {  
              filename: 'Excel.xlsx',
              path: 'Excel.xlsx',
          },
      ]

  };

  trasporter.sendMail(mailOptions, (error, info) => {
      if(error) {
          res.status(500).send(error.message);
      } else {
          console.log("Email Enviado!");
          res.status(200).jsonp(req.body);
      }
  });
}

module.exports = {
  sendEmail,
}


  