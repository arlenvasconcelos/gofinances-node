import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += item.value;
        } else if (item.type === 'outcome') {
          acc.outcome += item.value;
        }
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }

  public checkIsPossibleOutcomeTransaction(value: number): boolean {
    const balance = this.getBalance();
    if (balance.total < value) return false;
    return true;
  }
}

export default TransactionsRepository;
