import jwt from 'jsonwebtoken';

const authSeller = async(req,res,next)=>{
    const sellerToken = req.cookies?.sellerToken;
    if(!sellerToken){
        return res.json({success : false, message : "Not Authorised"});
    }
    try {
        const tokenDecode = jwt.verify(sellerToken,process.env.JWT_SECRET)
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            req.seller = tokenDecode;
            next();
        }
        else{
            return res.json({success : false, message : "Not Authorised"});
        }
    } catch (error) {
        console.log("JWT verify error:", error.message); // log for production
        return res.json({success : false, message : error.message});
    }
}
export default authSeller;