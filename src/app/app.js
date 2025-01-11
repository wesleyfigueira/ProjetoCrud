import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Endpoint para criar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome_produto, categoria, quantidade_estoque,preco } = req.body;

  // Validação dos dados enviados
  if (!nome_produto || !categoria || typeof quantidade_estoque !== 'number' || typeof preco !== 'number') {
    return res.status(400).json({ error: "Dados inválidos! Certifique-se de enviar nome_produto, categoria e quantidade_estoque corretamente." });
  }

  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome_produto,
        categoria,
        quantidade_estoque,
      },
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
});

// Endpoint para listar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar os produtos." });
  }
});

app.listen(3000, () => console.log('O servidor está rodando na porta 3000!'));
