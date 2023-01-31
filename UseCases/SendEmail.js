import nodemailer from "nodemailer";

 export default function sendEmail(options){
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.EmailTo,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
    //   throw new ErrorResponse(`Email could not be sent because ${err.message}`,ErrorTypes.INTERNAL_SERVER_ERROR);
    } else {
      const returnObject={
        success: true,
        message: 'email sent',
        body: info
      }

      return returnObject;
    }
  });
};

