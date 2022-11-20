import {Button, Card, message, Space} from 'antd';
import React, {useState} from 'react';
import OrderService from '../services/order';
import CreateOrder from './CreateOrder';

export default function OrderManagement() {
  const [operation, setOperation] = useState<'add' | 'del'>('add');
  const [messageApi, contextHolder] = message.useMessage();
  
  return <div className='mid-wrapper'>
    {contextHolder}
    <Card title="Operation">
      <Space direction='horizontal'>
        <Button onClick={() => setOperation('add')}>Add</Button>
        <Button onClick={() => setOperation('del')}>Alter</Button>
      </Space>
    </Card>
    <Card>
      <CreateOrder operation={operation} executeOrder={async (obj) => {
        let res;
        if (operation === 'add') {
          res = await OrderService.addOrder(obj);
        } else {
          res = await OrderService.deleteOrder(obj);
        }

        if (res.status === 200 || res.status === 201) {
          messageApi.success('Order is accepted and will be processed.');
        } else {
          messageApi.error('Order was not accepted. Please try again.');
        }
      }}/>
    </Card>
  </div>;
}
