import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token não fornecido' });

    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Você pode salvar o ID do usuário aqui, se precisar
    next();
  } catch (err) {
     res.status(401).json({ message: 'Token inválido' });
     return;
  }
};

export default authMiddleware;
