import noimg from '../img/noimg.png';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

export default function PostsList({ postsArr, path }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      {postsArr?.length > 0 && (
        <ul>
          {postsArr.map(post => (
            <li key={post.id}>
              <div>
                <video width="240" controls poster={post.covers.default}>
                  <source src={post.videoUrl} type="video/mp4"></source>
                </video>
                <p>{post.text}</p>
              </div>
              <div>
                <div>
                  <Link
                    to={{
                      pathname: path
                        ? `${path}${post['authorMeta'].name}`
                        : `${url}${post['authorMeta'].name}`,
                      state: { from: location },
                    }}
                  >
                    <img
                      width="75"
                      src={
                        post['authorMeta'].avatar
                          ? `${post['authorMeta'].avatar}`
                          : noimg
                      }
                      alt={post.name}
                    />
                    <p>{post['authorMeta'].nickName}</p>
                  </Link>
                </div>

                <p>
                  <span>Comments: {post.commentCount}</span>
                  <span>Likes: {post.diggCount}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
