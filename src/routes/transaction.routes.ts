import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsAll = transactionsRepository.all();

    return response.json(transactionsAll);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transactionResult = transactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transactionResult);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
