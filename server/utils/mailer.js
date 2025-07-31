const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mendozacortes20@gmail.com',
    pass: 'mgkityaxuivkicmo'
  }
});

const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.MAIL_USER,
    subject: `Nuevo mensaje de contacto: ${subject}`,
    html: `
      <h2>📩 Has recibido un nuevo mensaje</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong><br/>${message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendContactEmail;
