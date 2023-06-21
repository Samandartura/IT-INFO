const bcrypt = require("bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const { adminValidation } = require("../validations/admin.validation");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/JwtService");

// const generateAccessToken = (id, is_active, is_creator) => {
//     const payload = {
//         id,
//         is_active,
//         is_creator,
//     };
//     return jwt.sign(payload, config.get("secret"), { expiresIn: "1h" });
// };

exports.addAdmin = async (req, res) => {
  try {
    // const { error, value } = adminValidation(req.body);
    // if (error) {
    //     return res.status(400).send({ message: error.details[0].message });
    // }
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    const admin = await Admin.findOne({ admin_email });
    if (admin) {
      return res.status(400).send({ message: "Admin exists" });
    }
    const hashedPassword = await bcrypt.hash(admin_password, 9);
    const newAdmin = await Admin({
      admin_name,
      admin_email,
      admin_password: hashedPassword,
      admin_is_active,
      admin_is_creator,
    });
    await newAdmin.save();
    res.status(200).send({ message: "Admin added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (admins.length < 1) {
      return res.status(400).send({ message: "Admins not found" });
    }
    res.json(admins);
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    // const { error, value } = adminValidation(req.body);
    // if (error) {
    //     return res.status(400).send({ message: error.details[0].message });
    // }
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    const hashedPassword = await bcrypt.hash(admin_password, 8);
    const updatedAdmin = await Admin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          admin_name,
          admin_email,
          admin_password: hashedPassword,
          admin_is_active,
          admin_is_creator,
        },
      }
    );
    if (updatedAdmin.acknowledged) {
      res.status(200).send({ message: "Admin updated" });
    } else {
      res.status(400).send({ message: "Admin is not updated" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }
    const validPassword = await bcrypt.compare(
      admin_password,
      admin.admin_password
    );
    if (!validPassword) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }
    // const token = generateAccessToken(
    //     admin._id,
    //     admin.admin_is_active,
    //     admin.admin_is_creator
    // );

    const payload = {
      id: admin._id,
      is_active: admin.admin_is_active,
      is_creator: admin.admin_is_creator,
    };

    const tokens = myJwt.genereateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ token: token });
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.logoutAdmin = async (req, res) => {
  const { refreshToken } = req.cookies;
  let admin;
  if (!refreshToken) {
    return res.status(400).send({ message: "Token topilmadi" });
  }
  admin = await Admin.findOneAndUpdate(
    { admin_token: refreshToken },
    { admin_token: "" },
    { new: true }
  );
  if (!admin) return res.status(400).send({ message: "Token topilmadi" });
  res.clearCookie("refreshToken");
  res.status(200).send({ admin });
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    if (!admin) {
      return res.status(400).send({ message: "Admin not found" });
    }
    const deletedAdmin = await Admin.deleteOne({ _id: req.params.id });
    if (deletedAdmin.acknowledged) {
      res.status(200).send({ message: "Admin deleted" });
    } else {
      res.status(200).send({ message: "Admin is not deleted" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
