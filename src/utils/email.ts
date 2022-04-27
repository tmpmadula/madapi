import nodemailer from 'nodemailer';

export async function sendEmail(email: string) {
  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'AKIAYC2WWUH4HZPSAMHJ', // generated ethereal user
      pass: 'BGgTMZVsp9QyQctR1q7MLHipKVYK4FilfZYEauNgq724' // generated ethereal password
    }
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <info@kazinzuri.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="">welp</a>` // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
