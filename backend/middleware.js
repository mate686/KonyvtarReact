import jwt from "jsonwebtoken";

export function auth(req, res,next) {
    const token = req.cookies["token"]

    if (!token) {
        return res.status(401).send({err:"No token"});
    }

    try{
        const payload = jwt.verify(token, "titkos")

        req.user = {
            id: payload.sub,
            role: payload.role,
        }

        next()
    } catch (e){
        res.status(401).send({err:"Invalid token"});
    }




    next()
}