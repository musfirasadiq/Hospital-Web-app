const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.id; // Save user ID from token for further use
    console.log('User ID from token:', req.userId);
    next();
  });
};
