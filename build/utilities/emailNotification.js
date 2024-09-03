"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.GMAIL_USER}`,
        pass: `${process.env.GMAIL_PASSWORD}`,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendMail = async (to, password, email) => {
    const maxRetries = 4;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await transport.sendMail({
                from: `${process.env.GMAIL_USER}`,
                to,
                subject: "Welcome to Oasis Industries, below are your login details",
                html: `<div width="50%" style="text-align: center; padding: 25px; border-radius: 5px; border: 2px solid #27AE60;"><h1>Welcome to Oasis Industries</h1>
              <p style="margin-bottom: 10px">Email: ${email}</p>
              <br />
              <p style="margin-bottom: 10px">Password: ${password}</p>
              <br />
              <p>Thank you.</p>`,
            });
            console.log('Email sent successfully');
            break;
        }
        catch (error) {
            attempt++;
            console.log(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= maxRetries) {
                console.log('All attempts to send email failed');
            }
        }
    }
};
exports.sendMail = sendMail;
