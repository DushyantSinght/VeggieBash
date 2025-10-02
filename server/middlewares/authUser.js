// import jwt from 'jsonwebtoken';
// const authUser = async (req,res,next)=>{
//     const {token} = req.cookies;

//     if(!token){
//         return res.json({sucess : false, message : "Not Authorised"});
//     }
//     try {
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
//         if(tokenDecode){
//             req.body.user_Id = tokenDecode.id;
//         }
//         else{
//             return res.json({sucess : false, message : "Not Authorised"});
//         }
//         next();
//     } catch (error) {
//         return res.json({sucess : false, message : error.message});
//     }
// }
// export default authUser;
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode) {
      req.user = { _id: tokenDecode.id }; // ✅ safe
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
