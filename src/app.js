require("dotenv").config();   //fOR PROTECTION OF SERVER SIDE GMAIL ACCOUNT AND PASSWORD
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// Making an express app
const app = express();

require("./db/conn");
const ContactUser = require("./models/usermessage");
const SignUpUser = require("./models/signupm");
const auth = require("./middleware/auth");

const hbs = require("hbs");
const { registerPartials } = require("hbs");

const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport'); // This is important
const { toNamespacedPath } = require("path");
const { Console } = require("console");

// var favicon = require('serve-favicon');
// app.use(favicon(__dirname + '/favicon.ico'));

//Setting the path
const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


//Middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatespath);
app.use(cookieParser());
hbs.registerPartials(partialpath);


const port = process.env.PORT || 9000;


//-----------------------------------------------------sign Up -------------------------------------------------------------------//

app.get("/", (req, res) => {
    res.render("signup");
})

app.get("/logout", auth, async (req, res) => {
    try {
        // console.log(req.user);

        // logout from one device
        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token != req.token;
        })

        res.clearCookie("jwt");
        console.log("logout successfully");

        await req.user.save();
        res.render("signup")

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/logoutall", auth, async (req, res) => {
    try {
        // console.log(req.user);
        //Logout from all devices
        req.user.tokens = [];

        res.clearCookie("jwt");
        console.log("logout successfully");

        await req.user.save();
        res.render("signup")

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post("/signup", async (req, res) => {
    try {
        const password1 = req.body.password;
        const cpassword = req.body.confirm_password;
        if (password1 == cpassword) {

            const usersignupData = new SignUpUser({
                username: req.body.username,
                email: req.body.email,
                password: password1,
                confirm_password: cpassword
            });

            const token = await usersignupData.getAuthToken();
            // console.log("the token part is" + Token);

            res.cookie("pr_jwt", token, {
                // expires: new Date(Date.now() + 30000),
                httpOnly: true
            });

            await usersignupData.save();
            res.status(201).render("index");

        } else {
            res.send("Password are not matching,Recheck again!!!!");

        }

    } catch (error) {
        res.status(404).send("Can not sign up, Please try again later")
    }



});


//------------------------------------------------login------------------------------------------------------------//
app.get("/login", (req, res) => {

    res.render("login");
})

app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await SignUpUser.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userEmail.password);

        const token = await userEmail.getAuthToken();
        // console.log("the token part is" + Token);

        res.cookie("jwt", token, {
            // expires: new Date(Date.now() + 30000),
            httpOnly: true,
            secure: true
        });


        if (isMatch) {
            res.status(201).render("index");

        } else {
            res.status(401).send("password is not matching");
        }


    } catch (error) {
        res.status(400).send("Email is not exist");
    }


})



//------------------------------------------------Contact us------------------------------------------------------------//

app.post("/contact", async (req, res) => {
    try {
        const userData = new ContactUser(req.body);
        await userData.save();
        res.status(201).render("index");


        // -------------------------------------------------------------------------------------------------------------------------------------//
        // This is the process of sending mail..................................................................................................//
        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport({
            services: "gmail",
            host: 'smtp.gmail.com',
            auth: {
                user: "serverTest@gmail.com", // generated ethereal user(Here,Enter your email address by which you want to send mail)
                pass: "Password of upper mail", // generated ethereal password(Enter the password of above eamil address)

                // user: process.env.EMAIL, // generated ethereal user
                // pass: process.env.PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object............................................................................................//

        var mailoptions = {
            from: 'serverTest@gmail.com', // sender address
            to: userData.email, // list of receivers
            subject: "Backend", // Subject line
            text: `
            Your Entered Details:

            Name: ${userData.name}
            Email: ${userData.email}
            Phone: ${userData.phone}
            Message: ${userData.message}
            You can write your message here like the way you want
            `, // plain text body

        };

        transporter.sendMail(mailoptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent");

            }
        });

    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(port, () => {
    console.log("Server is coonected to port 9000");
})





/// Getting cookie value from the the URL when someone move from home page to any confiddential page.
/// suppose in navigation bar we have one secret page that we will show only if user login into the website only so we will use the cocept of authentication
// app.get("/secret",auth, (req,res)=>{
// res.render("secret");
// })
