import Modal from '../Modal';
import Input from '../Input';
import useLoginModalState from '../../hooks/useLoginModalState';
import { useCallback, useState } from 'react';
import { useToast } from '@movieTone/ui';
import { createCode } from 'supertokens-auth-react/recipe/passwordless';
import axios from 'axios';

async function sendMagicLink(email: string) {
  try {
    const response = await createCode({
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
      console.log(err);
    } else {
      console.log('Oops! Something went wrong.');
    }
  }
}

const LoginModal = () => {
  const loginModal = useLoginModalState();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const isRegistered = await axios.post(
        `${window.origin}/api/user/registered`,
        {
          email,
        },
      );
      console.log(isRegistered);

      if (isRegistered) {
        void sendMagicLink(email);
        setEmail('');
        loginModal.onClose();
        toast({ title: 'Check your email' });
      } else {
        setEmail('');
        toast({ title: 'User doesnt exist' });
      }
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        name="email"
        disabled={isLoading}
      />
    </div>
  );
  // const onToggle = useCallback(() => {
  //   loginModal.onClose();
  //   registerModal.onOpen();
  // }, [loginModal, registerModal]);

  // const footerContent = (
  //   <div className="text-neutral-400 text-center mt-4">
  //     <p>
  //       First time using Twitter?
  //       <span
  //         onClick={onToggle}
  //         className="
  //           text-white
  //           cursor-pointer
  //           hover:underline
  //         "
  //       >
  //         {' '}
  //         Create an account
  //       </span>
  //     </p>
  //   </div>
  // );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      xBtn={true}
    />
  );
};

export default LoginModal;
