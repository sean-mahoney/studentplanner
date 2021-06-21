import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButtonLarge = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className='btn-outline' onClick={() => loginWithRedirect()}>
        Sign Up
      </div>
    )
  )
}

export default SignupButtonLarge