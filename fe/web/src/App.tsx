import Header from './components/Header';
import Layout from './components/Layout';
import { ThemeProvider } from '@movieTone/ui';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { Toaster } from '@movieTone/ui';
import { SuperTokensWrapper } from 'supertokens-auth-react';
interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <SuperTokensWrapper>
      <ThemeProvider attribute="class">
        <Toaster />
        <Header />
        <LoginModal />
        <RegisterModal />
        <Layout>{children}</Layout>
      </ThemeProvider>
    </SuperTokensWrapper>
  );
}
export default App;

// import Header from './components/Header';
// import Layout from './components/Layout';
// import { ThemeProvider } from 'ui';
// import LoginModal from './components/modals/LoginModal';
// import RegisterModal from './components/modals/RegisterModal';
// import { SessionProvider } from 'next-auth/react';
// // import { getServerSideProps } from './libs/getServerSideProps';
// import useCurrentUser from './hooks/useCurrentUser';

// interface AppProps {
//   children: React.ReactNode;
// }

// async function App({ children }: AppProps) {
//   // const {session} = await getServerSideProps();
//   const { data: currentUser } = useCurrentUser();
//   console.log(currentUser);

//   return (
//     <SessionProvider session={currentUser}>
//       <ThemeProvider attribute="class">
//         <Header />
//         <LoginModal />
//         <RegisterModal />
//         <Layout>{children}</Layout>
//       </ThemeProvider>
//     </SessionProvider>
//   );
// }
// export default App;

// interface AppProps {
//   children: React.ReactNode;
//   // pageProps?: Record<string, any>;
// }

// function App({ children, pageProps }: AppProps) {
//   const { data: currentUser } = useCurrentUser();

//   return (
//     <SessionProvider session={currentUser}>
//       <ThemeProvider attribute="class">
//         <Header />
//         <LoginModal />
//         <RegisterModal />

//         <Layout>{children}</Layout>
//       </ThemeProvider>
//     </SessionProvider>
//   );
// }
// export default App;

// const reqData = () => {
//   void fetch('http://localhost:4000/api')
//     .then(res => res.json())
//     .then(data => console.log(data));
// };
//   <Button onClick={reqData}>api req</Button>;
