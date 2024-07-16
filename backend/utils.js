const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const EMAIL_TO_ADMIN_SUBJECT = `New User`;
const EMAIL_TO_ADMIN_BODY = `Pending request from the company `;
const EMAIL_TO_USER_SUBJECT = `Account verification`;
const EMAIL_TO_USER_BODY = `<h3>Dear User,</h3>
                            Your profile is under inspection. You will receive a confirmation email as soon as your information will be validate.
                            This process can require some time.`;

const CONFIRM_EMAIL_SUBJECT = `Account confirmation`;
const CONFIRM_EMAIL_BODY = `<h3>Welcome to Commerciale4.0!</h3>
                            We are happy to inform that your account is now active. Make sure to complete your profile with all the required info! `;

const RESET_PASSWORD_SUBJECT = "Reset password";
const RESET_PASSWORD_BODY = `<h3>Hello</h3>
                    We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:
					`;

const EMAIL_FOOTER = `<p>Your Commerciale4.0 team!</p>`;

const sendEmail = (emailData) => {
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID, // ClientID
        process.env.OAUTH_CLIENT_SECRET, // Client Secret
        process.env.OAUTH_REDIRECT_URL // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.OAUTH_ACCOUNT,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: emailData.address,
        subject: emailData.subject,
        html: emailData.html,
    };

    return smtpTransport.sendMail(mailOption);
};

const encrypt = (data) => {
    let mykey = crypto.createCipher("aes-128-cbc", data);
    return mykey.update("abc", "utf8", "hex") + mykey.final("hex");
};

module.exports.Utils = {
    EMAIL_TO_ADMIN_SUBJECT,
    EMAIL_TO_ADMIN_BODY,
    EMAIL_TO_USER_SUBJECT,
    EMAIL_TO_USER_BODY,
    CONFIRM_EMAIL_SUBJECT,
    CONFIRM_EMAIL_BODY,
    RESET_PASSWORD_SUBJECT,
    RESET_PASSWORD_BODY,
    EMAIL_FOOTER,
};

module.exports.sendEmail = sendEmail;
module.exports.encrypt = encrypt;
