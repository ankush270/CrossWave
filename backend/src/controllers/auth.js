import bcrypt from "bcrypt";
import prisma from "../config/prisma_db.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const is_buyer = role === "buyer";
    const is_seller = role === "seller";

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        is_buyer,
        is_seller,
      },
    });
    user.logged_in_as = role;

    console.log(user);

    const token = jwt.sign(
      {
        id: user.id,
        role: is_buyer ? "buyer" : "seller",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      msg: "User registered",
      user,
      logged_in_as: role,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);

    const role = req.body.role ? req.body.role : "buyer";
    // const role = "buyer";
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
    // console.log(user);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // console.log(user);

    //   const profileData = await prisma.user.findUnique({
    //     where: {
    //         id: user.id
    //     },
    //     include:{
    //         profile: true
    //     }
    // })
    // destructure profile data to user doc itself
    // user = {...user, ...profileData};
    user.logged_in_as = role;
    console.log(user);

    const is_buyer = user.role === "buyer";

    const token = jwt.sign(
      {
        id: user.id,
        role: is_buyer ? "buyer" : "seller",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // console.log(token);
    res.status(201).cookie("token", token, options).json({
      success: true,
      msg: "User logged in",
      user,
      logged_in_as: role,
      token,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    return res.status(200).cookie("token", null, options).json({
      success: true,
      msg: "Logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      is_buyer: true,
      is_seller: true,
    },
  });

  return res.status(200).json(user);
};
