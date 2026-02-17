import {Router} from "express";
import {db} from "./index.js";
import {createHash} from "node:crypto"
import jwt from "jsonwebtoken";
import {auth} from "./middleware.js";

export  const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    const {name,password} = req.body;


    const user = await db.get("select id,password, role from users where name=?",name);

    if (!user) {
        return res.status(401).json({err: "User not found"});
    }

    const { id, password: storedPassword, role } = user;

    const sha256 = createHash("sha256")
    sha256.update(password)
    const pwdMath = Buffer.compare(sha256.digest(), storedPassword) === 0

    if (!pwdMath) {
        return res.status(401).json({err: "invalid password"})
    }

    const token = jwt.sign({sub:id,role}, "titkos",{expiresIn: "1h"});

    res.cookie("token", token, {maxAge: 60*60*1000, httpOnly: true});

    res.status(200).json({role,name})
   //res.sendStatus(204)
});

userRouter.post("/register", async (req, res) => {
    const {name,password} = req.body;

    let {c:useCount} = await db.get("select count(1) as c from users")

    const sha256 = createHash("sha256")
    sha256.update(password)

    const newUser = await db.get("insert into users (name, password, role) values (?,?,?) returning id, role",name,sha256.digest(), useCount === 0? 1:0)


    res.send(newUser);
})

userRouter.patch("/:userId",auth, async (req, res) => {

    if (req.user.role !== 1) {
        return res.status(401).json({err: "Incorrect user role"});
    }

    const {userId,role} = req.body;

    await db.run("update users set role = ? where userId = ?",role,userId)


    res.sendStatus(204)
    //res.send({userRole: req.body.role})
})