import { useState, useEffect } from 'react';
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import * as dataShelfAPI from '../services/data-api';
import noimg from '../img/noimg.png';
import GoBackBtn from '../components/GoBackBtn';

export default function UserDetailView() {
  const { user } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [userFeed, setUserFeed] = useState(null);

  console.log(user);

  useEffect(() => {
    dataShelfAPI
      .fetchUserDetails(user)
      .then(setUserInfo)
      .catch(error => {
        console.log(error);
        // setError(error.message);
      });
  }, [user]);

  useEffect(() => {
    dataShelfAPI
      .fetchUserFeed(user)
      .then(setUserFeed)
      .catch(error => {
        console.log(error);
        // setError(error.message);
      });
  }, [user]);

  console.log(userInfo);
  console.log(userFeed);

  const HandleGoBackClick = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <>
      <GoBackBtn onBackClick={HandleGoBackClick} />
      <div>
        <img
          width="75"
          src={
            userInfo['user'].avatarMedium
              ? `${userInfo['user'].avatarMedium}`
              : noimg
          }
          alt={userInfo['user'].nickname}
        />
      </div>
      <p>Nick name: {userInfo['user'].nickname}</p>
      <p>Followers: {userInfo['stats'].followerCount}</p>
      <p>Following: {userInfo['stats'].followingCount}</p>
      <p>Likes: {userInfo['stats'].heartCount}</p>
      <p>Videos: {userInfo['stats'].videoCount}</p>
      <ul>
        {userFeed.map(post => (
          <li key={post.id}>
            <div>
              <p>PlayCount: {post.stats.playCount}</p>
              <video width="240" controls poster={post.video.dynamicCover}>
                <source src={post.playAddr} type="video/mp4"></source>
              </video>
              <p>{post.desc}</p>
            </div>
            <div>
              <p>
                <span>Music author: {post.music.authorName}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
