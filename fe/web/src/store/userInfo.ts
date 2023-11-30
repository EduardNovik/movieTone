import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import '../services/supertokens';
import { create } from 'zustand';
import axios from 'axios';

interface UserInfoStateType {
  user: Record<string, string>;
  updateUserInfo: () => void;
}

export const fetchUserInfo = async () => {
  if (await doesSessionExist()) {
    const getCurrentUser = await axios.get(`${window.origin}/api/user/current`);
    return getCurrentUser.data.user;
  }
  return { id: '', name: '', email: '' };
};

const userInfoState = create<UserInfoStateType>(set => ({
  user: { id: '', name: '', email: '' },
  updateUserInfo: async () => {
    const newUser = await fetchUserInfo();
    set({ user: newUser });
  },
}));

export default userInfoState;

// async function getToken(): Promise<void> {
//   const accessToken = await Session.getAccessToken();
//   console.log(accessToken);
// }
