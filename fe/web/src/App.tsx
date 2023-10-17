import Header from './components/Header';
import Layout from './components/Layout';
import { ThemeProvider } from 'ui';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

export default App;
