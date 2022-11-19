import {Button, Card, Space} from 'antd';
import React, {useState} from 'react';
import OrderService from '../services/order';
import CreateOrder from './CreateOrder';

export default function OrderManagement() {
  const [operation, setOperation] = useState<'add' | 'del'>('add');
  return <div className='mid-wrapper'>
    <Card title="Operation">
      <Space direction='horizontal'>
        <Button onClick={() => setOperation('add')}>Add</Button>
        <Button onClick={() => setOperation('del')}>Alter</Button>
      </Space>
    </Card>
    <Card>
      <CreateOrder operation={operation} executeOrder={(obj) => {
        if (operation === 'add') {
          OrderService.addOrder(obj);
        } else {
          OrderService.deleteOrder(obj);
        }
      }}/>
    </Card>
  </div>;
}
