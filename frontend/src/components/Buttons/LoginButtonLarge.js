import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButtonLarge = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className='btn-primary' onClick={() => loginWithRedirect()}>
        Log In
      </div>
    )
  )
}

export default LoginButtonLarge