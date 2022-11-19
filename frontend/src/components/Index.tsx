import React from 'react';
import {Button} from 'antd';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';
import Phrase from './Phrase';

export default function Index() {
  const isLoggedIn = useAppSelector((state) => state.token.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to='/dashboard' />;
  }
  return (<>
    <div className='mid-wrapper'>
      <div>
        <Phrase/>
        <div className='button-wrapper'>
          <Button href='/login'>Login</Button>
          <Button href='/Register'>Sign Up</Button>
        </div>
      </div>
    </div>
  </>); ;
}
