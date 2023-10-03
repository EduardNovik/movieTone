import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Header />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
