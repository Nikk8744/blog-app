const { Router } = require('express');;
const User = require('../models/user.models')
const router = Router();

router.get('/signin', (req,res) => {
    return res.render("signin");
});

router.get('/signup', (req,res) => {
    return res.render("signup");
});

router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    try {
        const token =  await User.matchPasswordAndGenerateToken(email, password);

        // console.log('Token is ', token);
        // agar user sahi password deta hai, toh we create a cookie named token and usko redirect kar diya /home page pe 
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email, 
        password,
    });
    return res.redirect("/");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})


module.exports = router;