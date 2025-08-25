import jwt from "jsonwebtoken";

const authenticate=async(req,res,next)=>{
    const token = req.cookies.token;

    if (!token) return res.json({ message: "No token, access denied!" });

    jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
        if (err) return res.json({ message: "Invalid token!" });

        res.user=user;

        next();
    });
}
export default authenticate;
