import {Operation, Side} from '../models';

interface CreateOrderCommand {
  qty: number;
  price: number;
  operation: Operation
  side: Side;
  security: string;
}

export default CreateOrderCommand;
