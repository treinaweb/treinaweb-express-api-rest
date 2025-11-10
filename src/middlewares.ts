import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

export const validateBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { nome, ano } = req.body;

  if (!nome || !ano) {
    return res.status(400).json({ message: "Nome e ano são obrigatórios"});
  }

  if (typeof nome !== "string" || typeof ano !== "number") {
    return res.status(400).json({ message: "Formato inválido"});
  }

  next();
}