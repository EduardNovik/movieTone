import React from "react";

interface AppProps {
  children: React.ReactNode;
}
const Wraper = ({ children }: AppProps) => {
  return <div>{children}</div>;
};

export default Wraper;
