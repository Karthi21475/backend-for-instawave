import jwt from "jsonwebtoken";

const createToken=(res,user)=>{
    
    const token=jwt.sign({id:user._id,user_name:user.user_name,isadmin:user.role},process.env.SECRET_CODE);
    
    return token;
}
export default createToken;
