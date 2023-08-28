import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_TRANSPORTER_HOST,
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_TRANSPORTER_AUTH_USER,
        pass: process.env.NODEMAILER_TRANSPORTER_AUTH_PASS,
      },
    });

    const mailInfo = await transport.sendMail({
      from: process.env.NODMAILER_MAILINFO_FROM, // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN_URL
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "reset your password"
      }</p>`, // html body
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
