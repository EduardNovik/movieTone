import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/theme-provider';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Header />
        {children}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
