const BASE_URL = 'https://tiktok33.p.rapidapi.com/';

async function fetchWithErrorHandling(
  url = '',
  config = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
      'x-rapidapi-key': '33e79e976cmsh56b4b259b11ae0bp1e7032jsn0518414c7629',
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
  return fetchWithErrorHandling(`${BASE_URL}user/info/${user}`);
}

export function fetchUserFeed() {
  return fetchWithErrorHandling('http://localhost:3000/itemList');
}
