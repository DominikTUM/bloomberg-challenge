import {Input, InputNumber, Button, Space, Card} from 'antd';
import React, {useState} from 'react';
import {OrderWithoutOperation} from '../services/order';

interface CreateOrderProps {
  executeOrder: (order: OrderWithoutOperation) => any;
  operation: 'add' | 'del';
}


export default function CreateOrder(
    {executeOrder, operation}: CreateOrderProps) {
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [security, setSecurity] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  return (<Card>
    <Input.Group>
      <Space direction="vertical">
        <div className='button-wrapper'>
          <Button.Group>
            <Button size={action === 'buy'? 'middle': 'small'}
              onClick={() => setAction('buy')}>Buy</Button>
            <Button danger size={action === 'sell'? 'middle': 'small'}
              onClick={() => setAction('sell')}>Sell</Button>
          </Button.Group>
        </div>
        <div>
          <label>Security</label>
          <Input placeholder='Enter a security to trade'
            value={security}
            onChange={({currentTarget}) =>
              setSecurity(currentTarget.value.toUpperCase())}
          />
        </div>
        <div>
          <label>Quantity</label>
          <InputNumber
            defaultValue={10}
            value={quantity}
            onChange={(val) => setQuantity(val || 0)}
          />
        </div>
        <div>
          <label>Price</label>
          <InputNumber
            defaultValue={10}
            value={price}
            prefix="€"
            onChange={(val) => setPrice(val || 0)}
          /></div>
      </Space>
    </Input.Group>
    <div className='button-wrapper'>
      <Button onClick={() =>
        executeOrder({qty: quantity, price, security, side: action})}
      type="primary">
        {operation === 'add'? 'Add': 'Alter'} Order
      </Button>
    </div>
  </Card>
  );
}
