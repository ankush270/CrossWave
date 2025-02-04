const auth = async (req, res, next) => {
  try {
    // Expect user information in headers from the main service
    const userId = req.header('X-User-Id');
    const userEmail = req.header('X-User-Email');
    
    if (!userId || !userEmail) {
      throw new Error('User information missing');
    }

    // Attach user info to request
    req.user = { _id: userId, email: userEmail };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth; 