import Modal from '../Modal';
import useLoginModalState from '../../hooks/useLoginModalState';
import useRegisterModalState from '../../hooks/useRegisterModalState';

import Input from '../Input';
import { useCallback, useState } from 'react';
import { useToast } from '@movieTone/ui';

import { createCode } from 'supertokens-auth-react/recipe/passwordless';

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

const LoginModal = () => {
  const loginModal = useLoginModalState();
  const registerModal = useRegisterModalState();

  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // const onSubmit = useCallback(async () => {
  //   try {
  //     setIsLoading(true);

  //     // LOG IN
  //     void sendMagicLink(email);

  //     loginModal.onClose();
  //     toast({ title: 'Account created.' });
  //   } catch (error) {
  //     console.log(error);
  //     toast({ variant: 'destructive', title: 'Something went wrong.' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [loginModal]);

  const onSubmit = () => {
    try {
      setIsLoading(true);

      // LOG IN
      void sendMagicLink(email);

      loginModal.onClose();
      toast({ title: 'Account created.' });
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      {/* <Input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      /> */}
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          {' '}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
