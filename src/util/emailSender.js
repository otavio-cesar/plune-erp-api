const nodemailer = require('nodemailer');

module.exports = {

  async sendEmail(title, to, html = '') {
    if ((!title, !to)) {
      return false;
    }

    const emailAddress = 'joaovribeirojv.rcs@gmail.com';
    let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailAddress,
        pass: 'Hoje_e_sabado@123'
      }
    });

    let mailOptions = {
      from: `"Solução - Equipamentos para rede elétrica" <${emailAddress}>`,
      to,
      subject: title,
      html
    };

    return transporter
      .sendMail(mailOptions)
      .then(info => {
        let result = true;
        if (info.rejected.length > 0) {
          info.rejected.forEach(rej => {
            console.log(`Email rejeitado por ${rej}!`);
          });
          result = false;
        }
        return result;
      })
      .catch(error => {
        console.log(`Falha ao enviar email para ${to}! Erro: ${error}`);
        return false;
      });
  }

}