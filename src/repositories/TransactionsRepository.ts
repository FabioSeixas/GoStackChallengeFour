import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

function filterTransactions(array: Transaction[], type: string): Transaction[] {
  const filtered = array.filter(element => element.type === type);
  return filtered;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): object {
    const { transactions } = this;
    const balance = this.getBalance();

    return {
      transactions,
      balance,
    };
  }

  public getBalance(): Balance {
    const outcome = filterTransactions(this.transactions, 'outcome');
    const income = filterTransactions(this.transactions, 'income');

    const outcomeSum = outcome.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    const incomeSum = income.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    const total = incomeSum - outcomeSum;

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, type, value });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
