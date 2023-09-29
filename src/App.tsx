import { useEffect, useState } from "react";

function App() {
  const [cc, setCc] = useState(0);

  useEffect(() => {
    console.log(cc);
    
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!{cc}</h1>
    </>
  );
}

export default App;
