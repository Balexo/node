const { User } = require("../models");
const jwt = require("jsonwebtoken");

class LoginController {
  async postAPIJWT(req, res, next) {
    try {
      const { email, password } = req.body;
      const userRegistered = await User.findOne({ email: email });

      if (
        !userRegistered ||
        !(await userRegistered.comparePassword(password))
      ) {
        next(new Error("Invalid email or password"));
        return;
      }

      const tokenJWT = await jwt.sign(
        { userId: userRegistered._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
      );
      res.json({ tokenJWT: tokenJWT });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
