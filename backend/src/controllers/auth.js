import bcrypt from 'bcrypt';
import prisma from "../config/prisma_db.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try{
    const {email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const is_buyer = role === "buyer"
    const is_seller = role === "seller"

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        is_buyer,
        is_seller,
      }
    })

    console.log(user);


    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }

    res.status(201).cookie('token', token, options).json({
      success: true,
      msg: 'User registered',
      user,
      token
    });
  }catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      error: e,
    })
  }

}

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }

    res.status(201).cookie('token', token, options).json({
      success: true,
      msg: 'User logged in',
      user,
      token
    });


  }catch (e) {
    res.status(500).json({
      success: false,
      error: e
    });
  }
}

export const logout = async (req, res) => {
  try{
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure : true,
      sameSite: "none"
    }
    return res.status(200).cookie('token',null,options).json({
      success: true,
      msg: "Logged out"
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      msg: err.message
    })
  }
}

export const getCurrentUser = async (req, res) => {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      email: true
    }
  })

  return res.status(200).json(user);
}