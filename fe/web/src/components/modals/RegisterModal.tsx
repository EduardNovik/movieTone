import Modal from '../Modal';
import useRegisterModalState from '../../hooks/useRegisterModalState';
import useLoginModalState from '../../hooks/useLoginModalState';
import Input from '../Input';
import { useCallback, useState } from 'react';

const RegisterModal = () => {
  const loginModal = useLoginModalState();
  const registerModal = useRegisterModalState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //REGISTER AND LOG IN

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
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

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          className="
        text-white
        cursor-pointer
        hover:underline
        "
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
