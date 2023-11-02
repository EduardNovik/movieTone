import Modal from '../Modal';
import useRegisterModalState from '../../hooks/useRegisterModalState';
import Input from '../Input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useToast } from '@movieTone/ui';

const RegisterModal = () => {
  const registerModal = useRegisterModalState();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //REGISTER AND LOG IN
      axios.post('http://localhost:4000/registration', {
        email,
        password,
        name,
      });

      toast({ title: 'Account created.' });

      setEmail('');
      setPassword('');
      setName('');
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
  // const onToggle = useCallback(() => {
  //   if (isLoading) {
  //     return;
  //   }
  //   registerModal.onClose();
  //   loginModal.onOpen();
  // }, [isLoading, registerModal, loginModal]);

  // const footerContent = (
  //   <div className="text-neutral-400 text-center mt-4">
  //     <p>
  //       Already have an account?
  //       <span
  //         className="
  //       text-white
  //       cursor-pointer
  //       hover:underline
  //       "
  //         onClick={onToggle}
  //       >
  //         Sign in
  //       </span>
  //     </p>
  //   </div>
  // );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
