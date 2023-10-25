import Modal from "../Modal";
import useLoginModalState from "../../hooks/useLoginModalState";
import useRegisterModalState from "../../hooks/useRegisterModalState";
import { signIn } from "next-auth/react";

import Input from "../Input";
import { useCallback, useState } from "react";
import { useToast } from "ui";

const LoginModal = () => {
  const loginState = useLoginModalState();
  const registerModal = useRegisterModalState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      toast({ title: "Success" });

      loginState.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, loginState, password, toast]);

  const onToggle = useCallback(() => {
    loginState.onClose();
    registerModal.onOpen();
  }, [loginState, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
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
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginState.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginState.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
