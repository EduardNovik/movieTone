import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import { shallow } from 'zustand/shallow';
import '../services/supertokens';

// export const FetchUserInfo_OrganizationFragmentDocument = graphql(
//   /* GraphQL */ `
//     fragment fetchUserInfo_Organization on Organization {
//       id
//       slug
//       name
//     }
//   `,
// );

// const fetchUserInfo = async () => {
//   if (await doesSessionExist()) {
//     return client.request(MeQuery).catch((data: unknown) => {
//       if (data instanceof Object && 'request' in data && 'response' in data) {
//         // @ts-expect-error graphql-request doesn't export types, so we hack around it
//         const errors = data.response?.errors as GraphQLError[] | undefined;
//         if (errors?.[0].extensions?.code === 'UNAUTHORIZED') {
//           return null;
//         }
//       }
//       throw data;
//     });
//   }
//   return null;
// };
