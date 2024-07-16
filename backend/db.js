const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI || "mongodb://localhost/commerciale4";
// const uri = "mongodb://localhost/commerciale4";
console.log("------------------- MonogoDB init --------------------");
mongoose.connect(uri, {
    dbName: "commerciale4",
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    useFindAndModify: false,
    socketTimeoutMS: 300000,
    connectTimeoutMS: 300000,
    // serverSelectionTimeoutMS: 300000,
    keepAlive: true,
});

const connection = mongoose.connection;
connection.on("error", (err) => {
    console.log(err);
});
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
