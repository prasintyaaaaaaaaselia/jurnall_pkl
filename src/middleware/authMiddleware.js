const jwt= require("jsonwebtoken")
const keyWord="rahasia"
const authJwt=(req,res,next)=>{
    const token =req.header('Authorization')
    if (token)
    {
        const auth=token.split(" ")[1]
        jwt.verify(auth,keyWord,(err,Siswa)=>{
            if (err){
                return res.sendStatus(403)
            }
            req.Siswa=Siswa;
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}
module.exports=authJwt