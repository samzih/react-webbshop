/** Prevent access to users without admin privilege */
function adminOnly(req, res, next) {
  if (req.session?.isAdmin) return next();
  res.status(403).json("You don not have permissions to perform this request");
}

/** Prevent access to logged out users */
function auth(req, res, next) {
  if (req.session?._id) return next();
  res.status(401).json("You must login to perform this request");
}

/** Validate request body based on a joi schema */
function validate(joiSchema) {
  return (req, res, next) => {
    const validation = joiSchema.validate(req.body);
    if (!validation.error) return next();
    res.status(400).json(validation.error.message);
  };
}
function exists(Model) {
  return async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (document) return next();
    res.status(404).json(`Document with id: ${req.params.id} was not found.`);
  };
}

module.exports = {
  adminOnly,
  auth,
  exists,
  validate,
};
