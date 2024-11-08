import nodemailer from "nodemailer";
import config from "../../config";
console.log('config',config)
class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:config.EMAIL,
        pass: config.PASSWORD
      }
    });
  }
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: config.EMAIL,
      to,
      subject,
      text
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
  async sendVerificationEmail(to: string, verificationCode: string) {
    const subject = "Email Verification";
    const text = `Please use the following code to verify your email: ${verificationCode}`;

    return this.sendEmail(to, subject, text);
  }
}
export default new EmailService();