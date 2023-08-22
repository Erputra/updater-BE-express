const jwt = require('jsonwebtoken');
 
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token){
        return res.status(401).json({error: 'No token, authorization denied'});
    }
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.username; 
        req.decodedToken = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Token is not valid'});
    }
};
 
module.exports = authMiddleware;