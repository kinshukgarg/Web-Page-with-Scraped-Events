const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Subscribe user to event alerts
router.post("/", async (req, res) => {
    const { email } = req.body;
    
    // Configure the email transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { 
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    try {
        // Send email confirmation
        await transporter.sendMail({
            from: `Event Alerts <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Event Subscription Confirmed",
            text: "You will receive event updates soon!"
        });

        res.json({ message: "Subscription Successful" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
});

module.exports = router;
