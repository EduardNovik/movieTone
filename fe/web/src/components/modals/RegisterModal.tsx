import Input from '../Input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { Button, useToast } from '@movieTone/ui';
import { useNavigate } from '@tanstack/react-router';

// Add useForms

const RegisterModal = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post(`${window.origin}/api/user/onboard`, {
        password,
        name,
      });

      toast({ title: 'Account created.' });

      setPassword('');
      setName('');

      // await manageUserSession();

      await navigate({ to: '/' });
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  }, [password, name]);

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
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );

  return (
    <div
      className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-gradient-to-r from-purple-500 to-pink-500
      bg-cover
      bg-no-repeat
    "
    >
      <div
        className="
        relative
        w-full
        lg:w-3/6
        my-6
        mx-auto
        lg:max-w-3xl
        h-full
        lg:h-auto
      "
      >
        {/* Content */}
        <div
          className="
          h-full
          lg:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative
          flex
          flex-col
          w-full
          bg-black
          outline-none
          focus:outline-none
        "
        >
          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              p-10
              rounded-t          
          "
          >
            <h3 className="text-3xl font-semibold text-white">
              Create an account
            </h3>
          </div>
          {/* Body */}
          <div className="relative p-10 flex-auto">{bodyContent}</div>
          {/* Footer */}
          <div className="flex flex-col gap-2 p-10">
            <Button
              disabled={isLoading}
              variant="outline"
              size="lg"
              onClick={() => onSubmit()}
              className="text-white"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

//REGISTER AND LOG IN

// await axios.post('http://localhost:4000/registration', {
//   email,
//   password,
//   name,
// });
// await axios.post('http://localhost:3000/api/registration', {
//   email,
//   password,
//   name,
// });

// const footerContent = (
//   <Button
//     disabled={isLoading}
//     variant="outline"
//     size="lg"
//     onClick={registerModal.onClose}
//     className="text-white"
//   >
//     Cancel
//   </Button>
// );

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
