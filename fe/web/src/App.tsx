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