// import { useEffect, useState } from 'react';
// import useCurrentUser from './useCurrentUserSWR';
// import useSessionState from './useSessionState';

// const useLocalStorageSession = () => {
//   const { data: currentUser } = useCurrentUser();
//   const [sessionData, setSessionData] = useState(null);
//   const sessionState = useSessionState()
//   console.log(currentUser);

//   useEffect(() => {
//     const getLocalStorage = localStorage.getItem('data');

//     try {
//       setSessionData(() => {
//         if (getLocalStorage !== null) {
//           sessionState.setSessionStateStore(JSON.parse(getLocalStorage));
//           return JSON.parse(getLocalStorage);
//         } else if (currentUser) {
//           localStorage.setItem('data', JSON.stringify(currentUser));
//           sessionState.setSessionStateStore(currentUser);
//           return currentUser;
//         } else {
//           sessionState.setSessionStateStore(null);
//           return null;
//         }
//       });
//     } catch (error) {
//       console.error('Error accessing localStorage:', error);
//     }
//   }, [currentUser]);

//   return sessionData;
// };

// export default useLocalStorageSession;
