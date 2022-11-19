import React, {useState} from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {Layout, MenuProps} from 'antd';
import {Menu} from 'antd';
import {logout} from '../store/tokenSlice';
import {useAppDispatch} from '../hooks/hooks';
import {Navigate} from 'react-router-dom';
import {Content, Header} from 'antd/lib/layout/layout';
import History from './History';
import Matches from './Matches';
import OrderManagement from './OrderManagement';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    theme?: 'light' | 'dark',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

const dashboardContent: { [k: string] : JSX.Element} = {
  'logout': <Navigate to={'/'}/>,
  'overview': <OrderManagement/>,
  'history': <History/>,
  'executed': <Matches/>,
};

export default function Dashboard() {
  const [current, setCurrent] = useState('overview');
  const dispatch = useAppDispatch();
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'logout') {
      dispatch(logout());
    }
  };

  const items: MenuItem[] = [
    getItem('Logout', 'logout', <LogoutOutlined/>),
    getItem('Order Management', 'overview'),
    getItem('Order history', 'history'),
    getItem('Order executed', 'executed'),
  ];

  return (
    <Layout>
      <Header>
        <Menu
          onClick={onClick}
          openKeys={[]}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          items={items}
        />
      </Header>
      <Layout>
        <Content
          style={{height: '100%'}}
        >
          {dashboardContent[current]}
        </Content>
      </Layout>
    </Layout>
  );
};
