//------ write to provide path ext ---//

//----- this approch is better for server side----//

// domain.com / verifytoken / aaknkffsfhhth

// ------- this approch is better for client side ---------//

// domain.com / verifytoken ? token = asnmbhjh

import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hash token

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "33e77b08eee42f",
        pass: "ee437e1845a7db",
      },
    });

    const mailOption = {
      from: "project@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}
      /verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } -OR- copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`,
    };

    const mailresponses = await transport.sendMail(mailOption);

    return mailresponses;
  } catch (error: any) {
    // console.log("err", error);

    throw new Error(error.message);
  }
};
