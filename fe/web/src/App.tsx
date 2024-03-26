import Header from './components/Header';
import Layout from './components/Layout';
import LoginModal from './components/modals/LoginModal';
import UpDown from './components/UpDown';
import { ThemeProvider } from '@movieTone/ui';
import { Toaster } from '@movieTone/ui';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { useManageUserSession } from './store/userSession';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  useManageUserSession();
  console.log('App Component');

  return (
    <SuperTokensWrapper>
      <ThemeProvider attribute="class">
        <Provider store={store}>
          <Toaster />
          <Header />
          <LoginModal />
          <UpDown />
          <Layout>{children}</Layout>
        </Provider>
      </ThemeProvider>
    </SuperTokensWrapper>
  );
}
export default App;
