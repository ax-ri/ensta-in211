import './Auth.css';
import { useEffect, useState } from 'react';
import { login, signUp, logout } from '../../utils/auth.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUserSession } from '../../session.js';

function Auth() {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('Logging you out...');

  const [searchParams] = useSearchParams();
  const isLoggingOut = !!searchParams.get('logout');

  useEffect(() => {
    const user = getUserSession();
    if (user && !isLoggingOut) {
      navigate('/');
    }
  }, []);

  if (isLoggingOut) {
    logout().then((result) => {
      if (result) {
        setLogoutMessage('Logged out successfully!');
        setTimeout(() => {
          navigate('/');
        });
      } else {
        setLogoutMessage('Error: unable to log out');
      }
    });
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  async function login_(event) {
    event.preventDefault();
    setMessageError('');
    setMessage('');

    if (!email || !password) {
      setMessageError('Please enter a valid email and password');
      return;
    }
    if (await login(email, password)) {
      navigate('/');
    } else {
      setMessageError('Invalid username or password');
      setTimeout(() => setMessageError(''), 1500);
    }
  }

  async function signUp_(event) {
    event.preventDefault();
    setMessageError('');
    setMessage('');

    if (!firstName || !lastName) {
      setMessageError('Please enter a valid name');
      return;
    }
    if (!email || !password) {
      setMessageError('Please enter a valid email and password');
      return;
    }
    if (password !== repeatPassword) {
      return setMessageError('Passwords do not match');
    }
    if (await signUp(firstName, lastName, email, password)) {
      setMessage('Account successfully created! You can now log in');
      setTimeout(() => setMessage(''), 1500);
      setIsLoggingIn(true);
    } else {
      setMessageError('Error: Unable to create account');
    }
  }

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  return (
    <div className="auth-wrapper">
      {isLoggingOut ? (
        logoutMessage
      ) : (
        <>
          <form className="auth-form">
            {!isLoggingIn ? (
              <>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : (
              ''
            )}
            <input
              type="text"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLoggingIn ? (
              <input
                type="password"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            ) : (
              ''
            )}
            <input
              type="submit"
              value={isLoggingIn ? 'Login' : 'Sign up'}
              onClick={isLoggingIn ? login_ : signUp_}
            />
            <a className="link" onClick={() => setIsLoggingIn(!isLoggingIn)}>
              {isLoggingIn
                ? 'No account ? Sign up instead'
                : 'Already have an account ? Login instead'}
            </a>
          </form>

          {message.length ? (
            <div className="message info-message">{message}</div>
          ) : (
            ''
          )}
          {messageError.length ? (
            <div className="message error-message">{messageError}</div>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

export default Auth;
