const router = require("express").Router();
const { uploadSingleImage, uploadMultiImages, deleteImages } = require("../aws-s3");
const { encrypt, sendEmail, Utils } = require("../utils");
const initData = [];
const Company = require("../models/company.model");

/*********** REQUEST FOR INIT/TEST - START **************/
router.get("/test/convert", async (req, res) => {
    try {
        // let oldCompanies = await Company.find();
        // console.log(oldCompanies.length);
        let companies = initData.slice(90000, 120000);
        await Promise.all(
            companies.map(async (company) => {
                let lng = parseFloat(company.profile.contact.location.coordinates[0]["$numberDouble"]);
                let lat = parseFloat(company.profile.contact.location.coordinates[1]["$numberDouble"]);
                let data = {
                    profile: {
                        officialName: company.profile.officialName,
                        ateco: company.profile.ateco,
                        vat: company.profile.vat,
                        contact: {
                            address: company.profile.contact.address,
                            location: {
                                type: "Point",
                                coordinates: [lng ? lng : 0, lat ? lat : 0],
                            },
                        },
                    },
                };

                let newCompany = Company(data);
                try {
                    await newCompany.save();
                } catch (error) {
                    console.log(error);
                }
            })
        );
        console.log("done");
        res.json("ok");
    } catch (error) {
        console.log(error);
    }
});

const writeDB = async (offset, count) => {
    let items = initData.slice(offset, offset + count);
    await Promise.all(
        items.map(async (company) => {
            let newCompany = {
                profile: {
                    officialName: company.officialName,
                    ateco: company.ateco,
                    introductionIt: company.introductionIt,
                    vat: company.vat,
                    location: {
                        address: company.companyAddress,
                    },
                },
            };
            // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${company.companyAddress}&key=AIzaSyCp5hvumUKNESChTL27lHTvwytrrMyRXIw`;
            // // let url = `https://api.opencagedata.com/geocode/v1/json?key=fdbc52ad51054b2883386dcfd09e6960&q=${company.companyAddress}&pretty=1&no_annotations=1`;
            // let result = await axios.get(url);
            // if (result.status === 200) {
            //     if (result.data && result.data.results && result.data.results.length) {
            //         let json = result.data.results[0];
            //         if (json.geometry) {
            //             newCompany.profile.location.latitude = json.geometry.location.lat;
            //             newCompany.profile.location.longitude = json.geometry.location.lng;
            //         } else {
            //             console.log("--- google geometry failed ---", newCompany.profile.location.address);
            //         }
            //     } else {
            //         console.log("--- google geocode failed ---", newCompany.profile.location.address);
            //     }
            // } else {
            //     console.log("--- google api failed ---", newCompany.profile.location.address);
            // }
            const newOne = new Company(newCompany);
            await newOne.save();
        })
    );
    return "success";
};

router.get("/test/:offset/:count", async (req, res) => {
    let offset = parseInt(req.params.offset);
    let count = parseInt(req.params.count);

    console.log(initData.length);
    while (true) {
        await writeDB(offset, count);
        offset += count;
        console.log(offset, count);
        if (offset >= 1) {
            break;
        }
    }

    console.log("done");
    res.json("ok");
});
/*********** REQUEST FOR INIT/TEST - END **************/

/*********** REQUEST FOR AUTH - START **************/

router.post("/auth/register", async (req, res) => {
    let data = req.body;

    console.log("----- register ----/n", data);
    try {
        let newCompany = null;
        let result = await Company.find({
            $or: [{ "profile.account.email": data.account.email }, { "profile.vat": data.profile.vat }, { "profile.pec": data.profile.pec }],
        });
        if (result && result.length) {
            for (let company of result) {
                if (company.account.email === data.account.email) {
                    res.json({ error: "emailExist" });
                    return;
                }
                if (company.profile.pec === data.profile.pec) {
                    res.json({ error: "pecExist" });
                    return;
                }
                if (company.profile.vat === data.profile.vat) {
                    if (company.account.permission !== 1) {
                        res.json({ error: "vatExist" });
                        return;
                    }
                    newCompany = company;
                    break;
                }
            }
        }

        if (!newCompany) {
            newCompany = new Company(data);
        } else {
            newCompany.account.email = data.account.email;
            newCompany.account.password = data.account.password;
            newCompany.account.permission = 0;
            newCompany.profile.pec = data.profile.pec;
            newCompany.profile.ateco = data.profile.ateco;
            newCompany.profile.contact.region = data.profile.contact.region;
            newCompany.profile.contact.city = data.profile.contact.city;
            newCompany.profile.contact.location = data.profile.contact.location;
        }
        try {
            result = await newCompany.save();
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "databaseFailed" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/auth/login", async (req, res) => {
    let data = req.body;

    try {
        let result = await Company.findOne({
            "account.email": data.email,
            "account.password": encrypt(data.password),
        });
        console.log("----- login ----/n", result);
        if (!result) {
            res.json({ error: "emailOrPasswordIncorrect" });
        } else {
            if (result.account.permission === 0) {
                res.json({ error: "notApproved" });
            } else {
                res.json(result);
            }
        }
    } catch (error) {
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/auth/email-to-admin", async (req, res) => {
    let data = req.body;
    try {
        await sendEmail({
            address: process.env.ADMIN_EMAIL,
            subject: Utils.EMAIL_TO_ADMIN_SUBJECT,
            html: `<h3>${Utils.EMAIL_TO_ADMIN_BODY} "${data.profile.officialName}".</h3>
                    <p>Official name : ${data.profile.officialName}</p>
                    <p>city : ${data.profile.contact.city}, ${data.profile.contact.region}</p>
                    <p>PEC : ${data.profile.pec}</p>
                    `,
        });
        console.log("Email sent to admin");
        res.json({ success: "Email has been sent" });
    } catch (e) {
        console.log(e.toString());
        res.json({ error: e.toString() });
    }
});

router.get("/auth/email-to-user/:email", async (req, res) => {
    try {
        await sendEmail({
            address: req.params.email,
            subject: Utils.EMAIL_TO_USER_SUBJECT,
            html: Utils.EMAIL_TO_USER_BODY + Utils.EMAIL_FOOTER,
        });
        console.log(`Email sent to ${req.params.email}`);
        res.json({ success: "Email has been sent" });
    } catch (e) {
        console.log(e.toString());
        res.json({ error: e.toString() });
    }
});

router.get("/auth/forgot-password/:email", async (req, res) => {
    let email = req.params.email;
    let result = null;
    try {
        result = await Company.findOne({
            "account.email": email,
            "account.permission": 2,
        });
        if (!result) {
            res.json({ error: "emailNotExist" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
        return;
    }

    try {
        let html = `${Utils.RESET_PASSWORD_BODY}<br/><br/>
          <a href="${process.env.SERVER_URL}/reset-password/${result._id}">${process.env.SERVER_URL}/reset-password?id=${result._id}</a>${Utils.EMAIL_FOOTER}`;

        await sendEmail({
            address: email,
            subject: Utils.RESET_PASSWORD_SUBJECT,
            html: html,
        });
        res.json({ success: "Email has been sent" });
    } catch (e) {
        console.log(e.toString());
        res.status(400).json({ error: "databaseFailed" });
    }
});

/*********** REQUEST FOR AUTH - END **************/

/*********** REQUEST FOR COMPANIES - START **************/
router.post("/", async (req, res) => {
    let filter = req.body;

    let match = { "account.permission": { $gt: 0 } };

    if (filter.keyword) {
        let keyword = new RegExp(filter.keyword, "i");
        if (!filter.count) {
            let result = await Company.find({
                "profile.officialName": keyword,
            }).limit(10);
            res.json(result);
            return;
        }
        match = { ...match, "profile.officialName": keyword };
    }

    if (filter.ateco) {
        let ateco = new RegExp(filter.ateco, "i");
        match = { ...match, "profile.ateco": ateco };
    }
    if (filter.type) {
        match = { ...match, "profile.type": filter.type };
    }
    if (filter.employeeMin) {
        match = { ...match, "profile.employees": { $gte: filter.employeeMin } };
    }
    if (filter.employeeMax) {
        match = { ...match, "profile.employees": { $lte: filter.employeeMax } };
    }
    if (filter.revenueMin) {
        match = { ...match, "profile.revenues": { $gte: filter.revenueMin } };
    }
    if (filter.revenueMax) {
        match = { ...match, "profile.revenues": { $lte: filter.revenueMax } };
    }
    if (filter.testCompany) {
        match = {
            ...match,
            "profile.vat": { $ne: filter.testCompany },
        };
    }

    let queryOr = [];
    if (filter.tags) {
        let tags = filter.tags.en ? filter.tags.en : filter.tags.it;
        let tagsEx = [];
        let tagsExForIntro = [];
        tags.forEach((tag) => {
            tagsEx.push(new RegExp(tag, "i"));
            tagsExForIntro.push({ "profile.introduction.it": new RegExp(tag, "i") });
        });
        let or1 = filter.tags.en ? { "profile.tags.en": { $in: tagsEx } } : { "profile.tags.it": { $in: tagsEx } };
        queryOr = [...queryOr, { $or: [or1, { "account.permission": 1, $and: tagsExForIntro }] }];
    }

    if (filter.location) {
        if (filter.location.coordinates && filter.location.radius) {
            match = {
                ...match,
                "profile.contact.location": {
                    $geoWithin: {
                        $centerSphere: [filter.location.coordinates, filter.location.radius / 6378.1],
                    },
                },
            };
        } else {
            let addressFilter = null;
            let regionCityFilter = {
                "profile.contact.region": filter.location.region.title,
            };
            if (filter.location.city) {
                addressFilter = [new RegExp(`\\(${filter.location.city.short}\\)`, "i")];
                regionCityFilter = {
                    ...regionCityFilter,
                    "profile.contact.city": filter.location.city.title,
                };
            } else {
                addressFilter = filter.location.region.cities.map((city) => {
                    return new RegExp(`\\(${city}\\)`, "i");
                });
            }
            console.log(addressFilter);
            queryOr = [
                ...queryOr,
                {
                    $or: [{ "profile.contact.address": { $in: addressFilter } }, regionCityFilter],
                },
            ];
        }
    }

    if (queryOr.length) {
        match = { ...match, $and: queryOr };
    }
    let query = [];
    // if (filter.myLocation) {
    //     query = [
    //         ...query,
    //         {
    //             $geoNear: {
    //                 near: {
    //                     type: "Point",
    //                     coordinates: filter.myLocation,
    //                 },
    //                 distanceField: "distance",
    //                 spherical: true,
    //             },
    //         },
    //     ];
    // }

    query = [...query, { $match: match }];

    let count = 0;
    try {
        let result = await Company.aggregate(query).count("count");
        if (result && result.length) count = result[0].count;
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
        return;
    }

    let sort = { "account.permission": -1 };
    if (filter.sort) {
        if (filter.sort.title === "distance") {
            sort = { distance: filter.sort.asc };
        } else if (filter.sort.title === "employees") {
            sort = { "profile.employees": filter.sort.asc };
        } else if (filter.sort.title === "revenues") {
            sort = { "profile.revenues": filter.sort.asc };
        }
    }

    query = [
        ...query,
        { $sort: sort },
        // { $group: { _id: 0, total: { $sum: 1 }, document: { $push: "$$ROOT" } } },
        // { $unwind: "$document" },
        { $skip: filter.offset },
        { $limit: filter.count },
        // { $group: { _id: 0, count: { $first: "$total" }, result: { $push: "$document" } } },
    ];

    // console.log(query);

    //get specified company with vat number
    let specifiedCompanyResult;
    try {
        specifiedCompanyResult = await Company.find({
            "profile.vat": filter.testCompany,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
        return;
    }

    try {
        await Company.aggregate(query)
            .allowDiskUse(true)
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: "databaseFailed" });
                    return;
                }
                console.log({
                    count: count,
                    companies: result.length,
                });
                res.json({
                    count: count,
                    companies: result,
                    specifiedCompany: specifiedCompanyResult,
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let result = await Company.findById(req.params.id);
        if (!result) {
            res.json({ error: "companyNotFound" });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/:id", async (req, res) => {
    let id = req.params.id;
    let dataToSave = req.body;
    let result = null;

    if (dataToSave.imageData.background) {
        result = await uploadSingleImage(dataToSave.imageData.background, id);
        if (result.error) {
            res.json({ error: result.error });
            return;
        }
        dataToSave.profile.background = result;
    }

    if (dataToSave.imageData.logo) {
        result = await uploadSingleImage(dataToSave.imageData.logo, id);
        if (result.error) {
            res.json({ error: result.error });
            return;
        }
        dataToSave.profile.logo = result;
    }

    if (dataToSave.imageData.productPhotos) {
        result = await uploadMultiImages(dataToSave.imageData.productPhotos, id);
        if (result.error) {
            res.json({ error: result.error });
            return;
        }
        dataToSave.profile.product.photos = result;
    }

    try {
        result = await Company.findByIdAndUpdate(id, { profile: dataToSave.profile }, { new: true });
        console.log("----- update ----/n", result);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.delete("/:id", async (req, res) => {
    if (req.body.photos) {
        let result = await deleteImages(req.body.photos);
        if (result.error) {
            console.log(result.error);
            res.json({ error: result.error });
            return;
        }
    }

    try {
        let result = await Company.findByIdAndDelete(req.params.id);
        console.log("------------account deleted ----------- ", result);
        res.json({ success: "Account deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/:id/password", async (req, res) => {
    // console.log(req.body.password);
    try {
        let result = await Company.findByIdAndUpdate(req.params.id, { "account.password": encrypt(req.body.password) }, { new: true });

        res.json(result);
    } catch (error) {
        res.json({ error: "databaseFailed" });
    }
});

router.post("/:id/email", async (req, res) => {
    try {
        let result = await Company.find({ "account.email": req.body.email });
        if (result && result.length) {
            res.json({ error: "emailExist" });
            return;
        }

        result = await Company.findByIdAndUpdate(req.params.id, { "account.email": req.body.email }, { new: true });
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json({ error: "databaseFailed" });
    }
});

router.post("/:id/posts", async (req, res) => {
    let id = req.params.id;
    let newPost = req.body.new;
    let posts = req.body.posts.slice(0);

    let result = null;
    if (newPost.photo) {
        try {
            result = await uploadSingleImage(newPost.photo, id);
        } catch (error) {
            res.send({ error: "imageUploadFailed" });
            return;
        }
    }
    newPost.photo = result;
    newPost.id = new Date().getTime();
    posts.push(newPost);
    try {
        result = await Company.findByIdAndUpdate(id, { posts: posts }, { new: true });
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.delete("/:id/posts/:postId", async (req, res) => {
    let id = req.params.id;
    let postId = parseInt(req.params.postId);

    let result = await Company.findById(id);
    if (!result || !result.posts || !result.posts.length) {
        res.json({ error: "postFailed" });
        return;
    }
    let posts = result.posts.slice(0);
    for (let i in posts) {
        let post = posts[i];
        if (post.id === postId) {
            if (post.photo) {
                result = await deleteImages([post.photo]);
                if (result.error) {
                    console.log(result.error);
                    res.json({ error: "postFailed" });
                    return;
                }
            }
            posts.splice(i, 1);
            break;
        }
    }

    try {
        result = await Company.findByIdAndUpdate(id, { posts: posts }, { new: true });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});

router.post("/photos/remove", async (req, res) => {
    let result = await deleteImages(req.body);
    res.json(result);
});
/*********** REQUEST FOR COMPANIES - END **************/

module.exports = router;
