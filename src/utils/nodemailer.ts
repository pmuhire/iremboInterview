import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export class Emailer {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  public sendEmail(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  public notify(requestBody) {
    this.sendEmail(emailConfirmation(requestBody));
  }
}

export const emailer = new Emailer();
export const emailConfirmation = (requestBody) => {
  return {
    from: process.env.GMAIL_USER,
    to: requestBody.email,
    subject: `${requestBody.surname}, Sent info to RICA Import Permit request`,
    text: "",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Import Request Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
        }
        h3, h4 {
          color: #333;
        }
        em {
          font-style: italic;
          color: #555;
        }
        p {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <p>Dear applicant, ${requestBody.surname}</p>
      <p>Thank you for applying for the RICA import permit product import request through Irembo! Below is a copy of the application details we received.</p>
      <h3>Business Owner details</h3>
      <p><em>Applicant citizenship:</em> ${requestBody.citizenship}</p>
      <p><em>Phone number:</em> ${requestBody.phone}</p>
      <p><em>Email address:</em> ${requestBody.email}</p>
      <p><em>National ID:</em> ${requestBody.nationalId}</p>
      <p><em>Passport ID:</em> ${requestBody.passportId}</p>
      <p><em>Business owner address:</em> ${requestBody.province}</p>
    
      <h3>Business details</h3>
      <p><em>Business Type:</em> ${requestBody.businessType}</p>
      <p><em>Company Name:</em> ${requestBody.company}</p>
      <p><em>TIN number:</em> ${requestBody.TIN}</p>
      <p><em>Registration date:</em> ${requestBody.date}</p>
      <p><em>Business Address:</em> ${requestBody.province}</p>
    
      <h3>Product Information</h3>
      <h4>Importation details</h4>
      <p><em>Purpose of importation:</em> ${requestBody.purposeOfImportation}</p>
    
      <h4>Product details</h4>
      <p><em>Product Category:</em> ${requestBody.productCategory}</p>
      <p><em>Weight:</em> ${requestBody.weight}</p>
      <p><em>Unit of measurement:</em> ${requestBody.unitOfMeasurement}</p>
      <p><em>Product quantity:</em> ${requestBody.qty}</p>
      <p><em>Description of products:</em> ${requestBody.desc}</p>
    
      <br />
      <br />
      <br />
      <p>If any of the information is incorrect, please contact us as soon as possible.</p>
      <br />
      <br />
      <p>Irembo Team</p>
    </body>
    </html>
    
`,
  } as MailOptions;
};
