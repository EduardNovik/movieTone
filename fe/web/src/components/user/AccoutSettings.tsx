import { useState } from 'react';
// import axios from 'axios';
import { Button, useToast, Input } from '@movieTone/ui';

import { Library } from 'lucide-react';

const AccoutSettings = () => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

  const updateUsernameHandler = () => {
    console.log('update username');
    toast({ variant: 'destructive', title: 'Username updated' });
  };

  const updateUserEmailHandler = () => {
    console.log('update user email');
  };
  return (
    <div className="flex flex-col w-full max-w-lg items-center gap-8">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="New username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Button
          type="submit"
          onClick={updateUsernameHandler}
          variant="secondary"
        >
          <Library className="mr-2" />
          <span className="mr-1">Update</span>
        </Button>
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="New email"
          value={userEmail}
          onChange={event => setUserEmail(event.target.value)}
        />
        <Button
          type="submit"
          onClick={updateUserEmailHandler}
          variant="secondary"
        >
          <Library className="mr-2" />
          <span className="mr-1">Update</span>
        </Button>
      </div>
    </div>
  );
};

export default AccoutSettings;
