/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';

export type PostType = 'my' | 'participating';

const UserPage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  const [postType, setPostType] = useState<PostType>('my');
  const { posts: myPosts, ref: myPostsRef } = useGetPosts({
    authorId: userInfo.userId,
  });
  const { posts: participatingPosts, ref: participatingPostsRef } = useGetPosts(
    {
      participatingUserId: userInfo.userId,
    }
  );
  const posts = postType === 'my' ? myPosts : participatingPosts;
  const ref = postType === 'my' ? myPostsRef : participatingPostsRef;

  const postingCount = {
    written: myPosts?.length || 0,
    participated: participatingPosts?.length || 0,
  };

  const switchPostType = (postType: PostType) => {
    setPostType(postType);
  };

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  return (
    <UserWrap>
      <UserProfile />
      <SelectMyPostType
        postType={postType}
        switchPostType={switchPostType}
        postingCount={postingCount}
      />
      <PostListLayerWrap>
        <PostListLayerStyle>
          {posts &&
            posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? ref : undefined}
              >
                <PostCard
                  userInfo={userInfo}
                  postData={post}
                  routeUrl={postType}
                />
              </div>
            ))}
        </PostListLayerStyle>
      </PostListLayerWrap>
    </UserWrap>
  );
};

export default UserPage;

const PostListLayerWrap = styled.div`
  overflow-y: scroll;
  height: calc(100vh - 38rem);
`;

const UserWrap = styled.div`
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  overflow-y: hidden;
  position: relative;
  width: 100%;
`;

const PostListLayerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0 10rem;
  justify-content: center;
`;
