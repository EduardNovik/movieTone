// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
// In GraphQL, comments are indicated by the # symbol, and they extend to the end of the line. Therefore, the comment ends at the newline character or the end of the line.
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
  id: 15125,
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

// Make the HTTP Api request
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response: any) {
  return response.json().then(function (json: any) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data: any) {
  console.log(data);
}

function handleError(error: any) {
  alert('Error, check console');
  console.error(error);
}

// https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/getting-started
