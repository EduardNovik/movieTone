import React from 'react';
import { ErrorComponent } from '@tanstack/react-router';

const ErrorPage: React.FC = () => {
  return (
    <div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <ErrorComponent error={'this is error'} />
    </div>
  );
};

export default ErrorPage;
