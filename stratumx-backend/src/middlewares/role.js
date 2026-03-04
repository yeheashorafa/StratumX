export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new Error("Forbidden"));
    }
    next();
  };
};