const isUser = (req, res, next) => {
  
  if (req.userInfo.role !== "user") {
    return res.status(403).json({
      message: "Access denied. User rights required."
    });
  }

  next();
};

module.exports = isUser;
