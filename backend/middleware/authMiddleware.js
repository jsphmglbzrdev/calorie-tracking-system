import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
  // 1️⃣ Get authorization header
  const authHeader = req.headers.authorization;

  // 2️⃣ Check if header exists and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Not authorized, no token'
    });
  }

  try {
    // 3️⃣ Extract token from header
    const token = authHeader.split(' ')[1];

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Attach user ID to request object
    req.user = decoded.id;

    // 6️⃣ Continue to next middleware or controller
    next();

  } catch (error) {
    // 7️⃣ Token invalid or expired
    return res.status(401).json({
      message: 'Not authorized, token failed'
    });
  }
};

export default authMiddleware;
