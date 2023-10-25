import Modal from "../Modal";
import useRegisterModalState from "../../hooks/useRegisterModalState";
import Input from "../Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { useToast } from "ui";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerState = useRegisterModalState();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("http://localhost:4000/api/register", {
        email,
        password,
        username,
        name,
      });

      setIsLoading(false);

      toast({ title: "Success" });

      signIn("credentials", {
        email,
        password,
      });

      registerState.onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, username, name, toast, registerState]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerState.isOpen}
      title="Register"
      actionLabel="Sign up"
      onClose={registerState.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
