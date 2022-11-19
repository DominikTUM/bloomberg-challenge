import axios from 'axios';
import config from '../configuration.json';
import CreateOrderCommand from '../models/order';

export type OrderWithoutOperation = Omit<CreateOrderCommand, 'operation'>;

export default class OrderService {
  public static addOrder(order: OrderWithoutOperation) {
    return axios.post(`${config.BACKEND_URL}/order`,
        {...order, operation: 'add'});
  }

  public static deleteOrder(order: OrderWithoutOperation) {
    return axios.post(`${config.BACKEND_URL}/order`,
        {...order, operation: 'del'});
  }
}
