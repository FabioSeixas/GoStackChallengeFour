import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: CreateTransactionDTO): Transaction {
    const newTransaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
