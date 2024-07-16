const router = require("express").Router();
const { encrypt, sendEmail, Utils } = require("../utils");

const Admin = require("../models/admin.model");
const Company = require("../models/company.model");

router.post("/login", async (req, res) => {
    try {
        let result = null;
        let count = await Admin.countDocuments();
        if (!count) {
            let newAdmin = new Admin({ username: "admin", password: encrypt("admin") });
            result = await newAdmin.save();
            if (req.body.username === "admin" && req.body.password === "admin") {
                res.json(result);
            } else {
                res.json({ error: "emailOrPasswordIncorrect" });
            }
            return;
        }

        result = await Admin.findOne({ username: req.body.username, password: encrypt(req.body.password) });
        if (!result) {
            res.json({ error: "emailOrPasswordIncorrect" });
            return;
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/:id", async (req, res) => {
    try {
        let result = await Admin.findByIdAndUpdate(req.params.id, { username: req.body.username, password: req.body.password });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.get("/pending", async (req, res) => {
    try {
        let result = await Company.find({ "account.permission": 0 });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.get("/approved", async (req, res) => {
    try {
        let result = await Company.find({ "account.permission": 2 });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/:id/approve", async (req, res) => {
    try {
        let result = await Company.findByIdAndUpdate(req.params.id, { "account.permission": 2 });
        if (!result || !result.profile || !result.profile.pec) {
            res.status(400).json({ error: "databaseFailed" });
            return;
        }

        try {
            await sendEmail({
                address: result.profile.pec,
                subject: Utils.CONFIRM_EMAIL_SUBJECT,
                html: Utils.CONFIRM_EMAIL_BODY + Utils.EMAIL_FOOTER,
            });
            console.log(`Email sent to ${result.profile.pec}`);
            res.json({ success: "Email has been sent" });
        } catch (e) {
            console.log(e.toString());
            res.status(400).json({ error: "databaseFailed" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

module.exports = router;
