var nodemailer = require("nodemailer");
var { MAIL_USER, MAIL_PASSWORD } = require("../config");
var fs = require("fs");

exports.sendMail = (mailOptions) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD,
        },
    });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

exports.readHTMLFile = async(path) => {
    try {
        var data = fs.readFileSync(path, { encoding: "utf-8" });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};