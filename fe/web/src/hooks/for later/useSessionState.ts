import { create } from 'zustand';

interface SessionStateType {
  sessionStateStore: string | null;
  setSessionStateStore: (data: string | null) => void;
}

const sessionState = create<SessionStateType>(set => ({
  sessionStateStore: null,
  setSessionStateStore: data => set({ sessionStateStore: data }),
}));

export default sessionState;

// option with ternar operator ----------------

// import { create } from 'zustand';
// import useLocalStorageSession from './useLocalStorageSession';

// const sessionData = useLocalStorageSession();

// interface SessionStateStore {
//   sessionStateData: string | null;
//   setSessionStateData: () => void;
// }

// const sessionState = create<SessionStateStore>(set => ({
//   sessionStateData: null,
//   setSessionStateData: () =>
//     set({ sessionStateData: sessionData ? sessionData : null }),
// }));

// export default sessionState;
