import nodemailer from "nodemailer";

// Function to send a digital receipt to the customer's email
export const sendDigitalReceipt = async (
  customerEmail: string,
  digitalReceipt: any
) => {
  const { EMAIL_USERNAME = "", EMAIL_PASSWORD = "" } = { ...process.env };
  // Create a nodemailer transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USERNAME, // Replace with your email
      pass: EMAIL_PASSWORD, // Replace with your email password
    },
  });

  // Email options
  const mailOptions = {
    from: EMAIL_USERNAME, // Replace with your email
    to: customerEmail,
    subject: "Digital Receipt for Your Purchase",
    html: digitalReceipt, // The HTML content of the digital receipt
    attachments: [
      {
        filename: "digital-receipt.html",
        content: digitalReceipt,
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
