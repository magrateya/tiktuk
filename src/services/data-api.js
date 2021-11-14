const BASE_URL = 'https://tiktok33.p.rapidapi.com/';

async function fetchWithErrorHandling(
  url = '',
  config = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
      'x-rapidapi-key': 'cf53bbe90dmsh943748214b7ae1fp182448jsn939dece57c29',
    },
  },
) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPosts() {
  return fetchWithErrorHandling(`${BASE_URL}trending/feed`);
}

export function fetchUserDetails(user) {
  return fetchWithErrorHandling(`${BASE_URL}/user/info/${user}`);
}

export function fetchUserFeed(user) {
  return fetchWithErrorHandling(`${BASE_URL}/user/feed/${user}`);
}
