import PropTypes from 'prop-types';
import noimg from '../../img/noimg.png';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import s from './PostsList.module.css';

export default function PostsList({ postsArr, path }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      {postsArr?.length > 0 && (
        <ul className={s.list}>
          {postsArr.map(post => (
            <li key={post.id} className={s.listItem}>
              <div
                className={s.listItemInnerThumb}
                style={{ marginRight: '20px' }}
              >
                <video width="100%" controls poster={post.covers.default}>
                  <source src={post.videoUrl} type="video/mp4"></source>
                </video>
              </div>
              <div
                className={s.listItemInnerThumb}
                style={{ fontSize: '20px' }}
              >
                <div>
                  <Link
                    className={s.userInfoLink}
                    to={{
                      pathname: path
                        ? `${path}${post['authorMeta'].name}`
                        : `${url}${post['authorMeta'].name}`,
                      state: { from: location },
                    }}
                  >
                    <img
                      className={s.avatarImg}
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
                <p>{post.text}</p>
                <p>
                  <b>Comments:</b> {post.commentCount}
                </p>
                <p>
                  <b>Likes:</b> {post.diggCount}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

PostsList.propTypes = {
  postsArr: PropTypes.array,
  path: PropTypes.string,
};
