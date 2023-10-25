import Header from "@/components/Header";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: currentUser } = useCurrentUser();
  const [state, setState] = useState("");
  console.log(currentUser);

  useEffect(() => {
    axios.get("http://localhost:4000/api/").then((res) => setState(res.data));
  }, []);

  return (
    <Layout>
      <Header />
      <LoginModal />
      <RegisterModal />
      {currentUser && <div>LOGGED IN!</div>}
      <p>{state}</p>
    </Layout>
  );
}
