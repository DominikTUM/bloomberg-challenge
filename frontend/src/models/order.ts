export type Operation = 'add' | 'del';
export type Side = 'buy' | 'sell';

interface CreateOrderCommand {
  qty: number;
  price: number;
  operation: Operation
  side: Side;
  security: string;
}

export default CreateOrderCommand;
