import { Operation, Side } from "../models";

export default interface CreateOrderCommand {
  qty: number;
  price: number;
  operation: Operation
  side: Side;
  security: string;
}