const jwt = require('jsonwebtoken')
require('dotenv').config()

function makeToken(user) {

return new Promise((resolve, reject) => {
    

    jwt.sign({ email: user.email}, process.env.JWT_KEY, {expiresIn: '1h'}, function (err, token){
        if (err !== null) {
            reject(err)
        }else {
            
            resolve(token)
        }
        console.log(token);
    });

})

}
function verifyToken(req,res,next){
    //get authorization header from api packet
    let auth= req.header('Authorization')
        //split the header into "bearer" and the token
    if (auth !== undefined){
        let [, token] = auth.split(" ")
        //verify the incoming token
        new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_KEY, (error, payload) =>{
                if(error !== null){
                    reject(error)
                } else {
                    resolve(payload)
                }
            })
        })
        .then(payload => {
            req.email = payload.email
            next()
        })
        .catch(error => {
            res.status(403)
        })
    } else {
    res.status(403)
    }  
} 
module.exports.makeToken = makeToken
module.exports.verifyToken = verifyToken
