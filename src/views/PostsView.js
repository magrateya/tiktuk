import { useState, useEffect } from 'react';
import * as dataShelfAPI from '../services/data-api';
import PostsList from '../components/PostsList';

export default function PostsView() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    dataShelfAPI.fetchPosts().then(data => {
      setPosts([...data]);
    });
  }, []);
  console.log(posts);
  return (
    <>
      <h1>Posts view</h1>
      <PostsList postsArr={posts} path={'/'} />
    </>
  );
}
