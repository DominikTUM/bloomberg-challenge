
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Alert, Button, Input, Space} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks/hooks';
import {login} from '../services/authentication';
import {storeToken, init} from '../store/tokenSlice';
import Phrase from './Phrase';

/**
 *
 * @return {JSX.Element} login component
 */
export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>();

  const [loading, setLoading] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>();

  // const tokenContext = useToken();
  const navigate = useNavigate();

  const signIn = async () => {
    if (!email || !password) {
      return;
    }

    setLoading(true);

    const res = await login(email, password);
    if (res.status === 200) {
      dispatch(storeToken({jwt: res.data.jwt}));
      dispatch(init());
      navigate('/dashboard');
    } else {
      setErrorMsg(res.data);
      setTimeout(() => setErrorMsg(undefined), 5000);
    }
    setLoading(false);
  };

  const handleKeyDown = async (event:
    React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      signIn();
    }
  };

  return (<>
    <div className='mid-wrapper'>
      <div>
        <Phrase/>
        <h1>Log in</h1>
        <Input.Group>
          <Space direction="vertical">
            <div>
              <label>Email address</label>
              <Input placeholder='Enter you email address'
                value={email}
                onChange={({currentTarget}) => setEmail(currentTarget.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <Input.Password placeholder='Enter your password'
                value={password}
                type='password'
                onChange={({currentTarget}) => setPassword(currentTarget.value)}
                iconRender={(visible: boolean) => (visible ?
                  <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </Space>
        </Input.Group>
        {
          errorMsg && <Alert type='error' description={errorMsg}/>
        }
        <div className='button-wrapper'>
          <Button onClick={signIn} type="primary" loading={loading} style={{
            marginTop: 'var(--margin)'}}>
            Login
          </Button>
        </div>
        <p>No account yet? Sign up <a href='/register'>here</a>.</p>
      </div>
    </div>
  </>);
}
