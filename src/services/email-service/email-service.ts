import nodemailer from "nodemailer";
import mustache from "mustache";
import mjml from "mjml";

const ENVIRONMENT = process.env.ENVIRONMENT || "localhost";

export const sendEmail = (mjmlTemplate: any, templateData: any) => {
  const renderedMJML = mustache.render(mjmlTemplate, templateData);
  const html = mjml(renderedMJML).html;

  const transporter =
    ENVIRONMENT === "production"
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "hiei216@gmail.com",
            pass: process.env.GMAIL_NODEMAILER_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })
      : nodemailer.createTransport({
          host: "localhost",
          port: 1025,
        });

  const mailOptions =
    ENVIRONMENT === "production"
      ? {
          from: "hiei216@gmail.com",
          to: "jiri.dvorak@gmx.de",
          subject: "Sending Email using Node.js",
          text: "That was easy!",
        }
      : {
          from: "mailhog@mailhog.com",
          to: "jiri.dvorak@gmx.com",
          subject: "Sending Email using Node.js",
          html,
        };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
