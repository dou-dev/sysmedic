import { userModel } from "../models/User.js";
import { verifyToken } from "../utils/generateToken.js";
import { sendConfirmationEmail } from "../utils/sedEmail.js";
import path from "path";

export class userController {
  static async getAll(req, res) {
    try {
      const users = await userModel.getAll();
      if (!users.success) return req.status(404).json(users.message);
      res.json(users.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { email } = req.body;
      const userExists = await userModel.userExists(email);

      if (userExists.success)
        return res.status(409).json({ message: userExists.message });

      const isCreatedUser = await userModel.create({ data: req.body });

      if (!isCreatedUser.success)
        return res.status(400).json(isCreatedUser.message);
      const { token } = isCreatedUser;
      await sendConfirmationEmail({ token, email });
      res.status(201).sendFile(path.join(__dirname, "./assets/sendEmail.html"));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async confirmAcount(req, res) {
    try {
      const { token } = req.query;
      const result = verifyToken(token);
      if (result.err) res.status(400).json({ message: result.error });

      const isConfirmed = await userModel.confirmAcount({ token });
      if (isConfirmed.success)
        res
          .status(200)
          .sendFile(path.join(__dirname, "./assets/confirmEmail.html"));
    } catch (err) {
      console.error(err);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getById({ id });
      if (!user.success) return res.status(404).json(user.message);
      res.status(200).json(user.data[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}
