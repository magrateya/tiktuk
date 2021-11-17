import { useState, useEffect } from 'react';
import * as dataShelfAPI from '../services/data-api';
import PostsList from '../components/PostsList/PostsList';
import LoaderBlur from '../components/LoaderBlur/LoaderBlur';

export default function PostsView() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dataShelfAPI.fetchPosts().then(data => {
      setPosts([...data]);
      setIsLoading(false);
    });
  }, []);
  console.log(posts);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Posts list</h1>
      {isLoading && <LoaderBlur />}
      <PostsList postsArr={posts} path={'/'} />
    </>
  );
}
