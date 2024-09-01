import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import mustache from "mustache";
import mjml from "mjml";

const ENVIRONMENT = process.env.NODE_ENV || "localhost";

export const sendEmail = (template: string, templateData: any) => {
  const mjmlFilePath = path.join(`${__dirname}\\templates\\`, template);

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

  fs.readFile(mjmlFilePath, "utf8", (err, mjmlTemplate) => {
    if (err) {
      console.error("Error reading MJML file:", err);
      return;
    }

    // Render the MJML template with Mustache
    const renderedMjml = mustache.render(mjmlTemplate, templateData);

    // Convert MJML to HTML
    const { html, errors } = mjml(renderedMjml);

    // Handle MJML conversion errors
    if (errors.length > 0) {
      console.error("MJML conversion errors:", errors);
      return;
    }

    const mailOptions =
      ENVIRONMENT === "production"
        ? {
            from: "hiei216@gmail.com",
            to: "jiri.dvorak@gmx.de",
            subject: "Sending Email using Node.js",
            text: "That was easy!",
            html,
          }
        : {
            from: "mailhog@mailhog.com",
            to: "jiri.dvorak@gmx.com",
            subject: "Sending Email using Node.js",
            text: "That was easy!",
            html,
          };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
