const express = require("express");
const connect  = require("./configs/db");


const { register, login } = require("./controller/auth.controller");
const usercontroller = require("./controller/user.controller");

const app = express();
app.use(express.json());


app.post("/register", register);
app.post("/login", login);

app.use("/users", usercontroller);

app.listen(5000, async () => {
    try {
        await connect();
        console.log("listening on port 5000");
    }
    catch (e) {
        console.log({ message: e.message })
    }
});
    
