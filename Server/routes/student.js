const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../model/User.js");

router.get("/list", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.homeworklist);
    } catch (e) {
        res.send({message: "Error in Fetching List"})
    }
});

// request body in form: {hw_number: xxx, link: xxx}
router.post("/add", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        let list = user.homeworklist;
        const {hw_number, link} = req.body;
        list[hw_number] = {link: link, grade: "ungraded"};
        user.save()
        .then(savedDoc => res.json(savedDoc.homeworklist));

    } catch (e) {
        res.send({message: "Error in Adding to List"})
    }
});

// request body in form: {hw_number: xxx}
router.delete("/delete", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        let list = user.homeworklist;
        const hw_number = req.body.hw_number;
        list[hw_number] = {link: "", grade: "ungraded"};
        user.save()
        .then(savedDoc => res.json(savedDoc.homeworklist));

    } catch (e) {
        res.send({message: "Error in Delete From List"})
    }
});


// router.post("/formExtract", auth, async (req, res)=> {
//     try {
//         const hw_number = req.body.homeworkNumber;
//         const link = req.body.homeworkLink;
//         const toAdd = {hw_number: hw_number, link: link};
//         const temp = await axios.post("http://localhost:4000/api/add", toAdd);
//         return res.json(temp.data);
//     } catch(e) {
//         res.send({message: "Erorr in extracting the form"})
//     }
// });






module.exports = router;