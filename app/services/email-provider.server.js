import nodemailer from "nodemailer";

export const emailProvider = async (email, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER, // generated ethereal user
      pass: process.env.EMAIL_AUTH_PASS, // generated ethereal password
    },
  });

  return await transporter.sendMail({
    from: "Incline <inclinedevs@gmail.com>",
    to: email,
    subject,
    html: body,
  });
};
