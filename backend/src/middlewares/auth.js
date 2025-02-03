import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  try{
    const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({
        isAuthenticated: false,
        msg: "Please log in first"
      })
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  }catch (e) {
    return res.status(500).json({
      success: false,
      msg: e
    })
  }
}

export default authMiddleware;