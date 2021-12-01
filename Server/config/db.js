const mongoose = require("mongoose");
// const url = "mongodb://localhost:27017/wdbportal";
const url = "mongodb+srv://JiachenYuan:everthing@cluster0.whlsw.mongodb.net/WDB_project?retryWrites=true&w=majority"
const InitiateMongoServer = async () => {
    await mongoose.connect(url, {useNewUrlParser: true});
    console.log("Database connected");
}


module.exports = InitiateMongoServer;