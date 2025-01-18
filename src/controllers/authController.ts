import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
  
      res.status(400).json({ message: 'Email já registrado' });
      return ;
    } 

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar o usuário', error: err });
  }

  return
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    } 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {

      res.status(400).json({ message: 'Senha inválida' });
      return 
    } 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login', error: err });
  }
  
  return
};

export { register, login };
