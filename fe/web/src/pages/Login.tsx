import React, { useState } from 'react';
import { createCode } from 'supertokens-auth-react/recipe/passwordless';
import { useToast } from '@movieTone/ui';

async function sendMagicLink(email: string) {
  try {
    let response = await createCode({
      email,
    });
    if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
      // this can happen due to automatic account linking. See that section in our docs.
    } else {
      // Magic link sent successfully.
      console.log('Please check your email for the magic link');
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you,
      // or if the input email / phone number is not valid.
      // window.alert(err.message);
      console.log(err);
    } else {
      // window.alert('Oops! Something went wrong.');
      console.log('Oops! Something went wrong.');
      console.log('ASS');
    }
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      void sendMagicLink(email);
      toast({ title: 'Account created.' });
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
