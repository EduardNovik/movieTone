import Header from './components/Header';
import Layout from './components/Layout';
import { ThemeProvider } from 'ui';
import { Button } from 'ui';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  const reqData = () => {
    void fetch('http://localhost:4000/api')
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <ThemeProvider attribute="class">
      <Header />
      <Button onClick={reqData}>api req</Button>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

export default App;
