// middleware/verifyToken.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: 'fail', message: 'Forbidden' });
      }
      
      if(new Date(decoded.exp) >= new Date()) {
        return res.status(403).json({ status: 'fail', message: 'Token expired' });
      }
      // Attach the decoded user information to the request object
      req.user = {
        identifier: decoded.identifier,
        role: decoded.userRole,
        userId: decoded.userId,
      };
      next();
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
}
