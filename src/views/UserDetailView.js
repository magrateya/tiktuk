import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import * as dataShelfAPI from '../services/data-api';
import noimg from '../img/noimg.png';
import GoBackBtn from '../components/GoBackBtn';
import s from '../components/PostsList/PostsList.module.css';

export default function UserDetailView() {
  const { userName } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [userFeed, setUserFeed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    dataShelfAPI
      .fetchUserDetails(userName)
      .then(setUserInfo)
      .catch(error => {
        setError(error.message);
      });
  }, [userName]);

  useEffect(() => {
    dataShelfAPI
      .fetchUserFeed()
      .then(setUserFeed)
      .catch(error => {
        setError(error.message);
      });
  }, [userName]);

  console.log('userInfo', userInfo);
  console.log('userFeed', userFeed);

  const HandleGoBackClick = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <>
      <GoBackBtn onBackClick={HandleGoBackClick} />

      {userInfo && (
        <div
          style={{ display: 'flex', margin: '30px' }}
          className={s.userThumb}
        >
          <div className={s.userAvatarImgThumb}>
            <img
              width="100%"
              src={
                userInfo['user'].avatarMedium
                  ? `${userInfo['user'].avatarMedium}`
                  : noimg
              }
              alt={userInfo['user'].nickname}
            />
          </div>
          <div
            style={{ marginLeft: '20px', fontSize: '20px' }}
            className={s.userAvatarImgThumb}
          >
            <p>
              <b>Nick name:</b> {userInfo['user'].nickname}
            </p>
            <p>
              <b>Followers:</b> {userInfo['stats'].followerCount}
            </p>
            <p>
              <b>Following:</b> {userInfo['stats'].followingCount}
            </p>
            <p>
              <b>Likes:</b> {userInfo['stats'].heartCount}
            </p>
            <p>
              <b>Videos:</b> {userInfo['stats'].videoCount}
            </p>
          </div>
        </div>
      )}
      <h2 style={{ textAlign: 'center' }}>Posts list</h2>
      {userFeed ? (
        <ul className={s.list}>
          {userFeed.map(post => (
            <li key={post.id} className={s.listItem}>
              <div style={{ position: 'relative', marginRight: '15px' }}>
                <p
                  style={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    margin: '0',
                  }}
                >
                  PlayCount: {post.stats.playCount}
                </p>
                <video
                  width="240"
                  controls
                  poster={post.music.coverMedium && noimg}
                >
                  <source src="{post.playAddr}" type="video/mp4"></source>
                </video>
              </div>
              <div>
                <p>{post.desc}</p>
                <p>
                  <b>Author:</b> {post.author.nickName}
                </p>
                <p>
                  <b>Author signature:</b> {post.author.signature}
                </p>

                <p>
                  <b>Music author:</b> {post.music.authorName}
                </p>
                <p>
                  <b>Music title:</b> {post.music.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>{error}</h1>
      )}
    </>
  );
}
