const Parse = require('parse/node');

const validate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token?.trim().length) {
      return res.status(403).json({
        code: Parse.Error.INVALID_SESSION_TOKEN,
        message: 'Invalid session token',
      });
    }

    Parse.User.enableUnsafeCurrentUser();
    const user = await Parse.User.become(token);

    req.body.requester = user;
  } catch (error) {}
};

module.exports = validate;
