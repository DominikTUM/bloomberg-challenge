import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Alert, Button, Input, Space} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {register as authRegister} from '../services/authentication';
import Phrase from './Phrase';


export default function Register() {
  const [mail, setMail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>();
  const [retypedPassword, setRetypedPassword] = useState<string>();

  const [errorMsg, setErrorMsg] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();

  const register = async () => {
    if (!mail || !password) {
      return;
    }

    setLoading(true);
    if (password !== retypedPassword) {
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    const res = await authRegister(mail, password, name);

    setLoading(false);

    if (res.status == 400) {
      setErrorMsg(res.data);
      setTimeout(() => setErrorMsg(undefined), 5000);
    } else {
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 10000);
    }
  };

  return (<>
    <div className='mid-wrapper'>
      {
        !isSuccess && <div>
          <Phrase/>
          <h1>Create an account</h1>
          <p>Please sign up with your email address.</p>
          <Input.Group>
            <Space direction="vertical">
              <div>
                <label>Email address</label>
                <Input
                  value={mail}
                  onChange={({currentTarget}) => setMail(currentTarget.value)
                  }
                />
              </div>
              <div>
                <label>Name</label>
                <Input
                  value={name}
                  onChange={({currentTarget}) =>
                    setName(currentTarget.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <Input.Password
                  value={password}
                  type='password'
                  onChange={({currentTarget}) =>
                    setPassword(currentTarget.value)}
                  iconRender={(visible: boolean) => (visible ?
                    <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </div>
              <div>
                <label>Repeat password</label>
                <Input.Password
                  value={retypedPassword}
                  type='password'
                  onChange={({currentTarget}) =>
                    setRetypedPassword(currentTarget.value)}
                  iconRender={(visible: boolean) => (visible ?
                    <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </div>
            </Space>
          </Input.Group>
          {
            errorMsg && <Alert type='error'
              onClose={() => setErrorMsg(undefined)} description={errorMsg}/>
          }
          <div className='button-wrapper'>
            <Button onClick={register} type="primary" loading={loading}>
              Register
            </Button>
          </div>
          <p>Already have an account? Log in <a href='/login'>here</a>.</p>
        </div>
      }
      {
        isSuccess && <div>
          <Phrase/>
          <h1>Create an account</h1>
          <Alert type='success'
            onClose={() => setIsSuccess(undefined)}
            description={
              `Registration successful`
            }/>
          <p>You will be automatically redirected to the login page after 10
            seconds, or click <a href='/login'>here</a> to log in now.</p>
        </div>
      }
    </div>
  </>);
}
