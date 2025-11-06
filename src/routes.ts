import { Request, Response, Router } from "express";

const router = Router();
const DATABASE_BOOKS = [
  { id: 1, nome: "Hábitos Atomicos", ano: 2024 },
  { id: 2, nome: "Game of Thrones", ano: 2020 },
  { id: 3, nome: "Senhor dos anéis", ano: 1980 },
  { id: 4, nome: "Neuromancer", ano: 1980 },
];

router.post("/books", (req: Request, res: Response) => {
  const book = req.body;
  DATABASE_BOOKS.push(book);

  res.status(201).json(book);
});

router.get("/books", (req: Request, res: Response) => {
  const ano = Number(req.query.ano);

  if (ano) {
    const filteredBooks = DATABASE_BOOKS.filter(book => book.ano === ano);
    return res.status(200).json(filteredBooks);
  }

  res.status(200).json(DATABASE_BOOKS);
});

router.get("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = DATABASE_BOOKS.find((book: { id: number }) => book.id === id);

  if (!book) {
    return res.status(404).json({ message: "Livro não encontrado!" });
  }

  res.status(200).json(book);
});

router.delete("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookIndex = DATABASE_BOOKS.findIndex(
    (book: { id: number }) => book.id === id
  );

  if (bookIndex < 0) {
    return res.status(404).json({ message: "Livro não encontrado!" });
  }

  DATABASE_BOOKS.splice(bookIndex, 1);
  res.status(204).send();
});

router.patch("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newBook = req.body;
  const bookIndex = DATABASE_BOOKS.findIndex(
    (book: { id: number }) => book.id === id
  );

  if (bookIndex < 0) {
    return res.status(404).json({ message: "Livro não encontrado!" });
  }

  DATABASE_BOOKS[bookIndex] = { ...DATABASE_BOOKS[bookIndex], ...newBook };
  res.status(200).send(DATABASE_BOOKS[bookIndex]);
});

export default router;
