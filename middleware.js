 // Cconst jwt = require('jsonwebtoken');

 const jwt = require('jsonwebtoken');
//  const decoded = jwt.verify(token, process.env.JWT_SECRET);


 const auth = (req, res, next) => {
   const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
   if (!token) {
     return res.status(401).json({ message: 'No token, authorization denied' });
   }
 
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = decoded.user;
     next();
   } catch (error) {
     res.status(401).json({ message: 'Token is not valid' });
   }
 };
 
 module.exports = auth;
 


