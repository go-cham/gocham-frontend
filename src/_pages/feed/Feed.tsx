/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import react, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectMyPostType from "../../_components/feed/SelectMyPostType";
import UserProfile from "../../_components/feed/UserProfile";
import { userAtom } from "../../atom/userData";
import { useAtom } from "jotai";
import { RouteURL } from "../../App";

/**
 * 본인의 피드인지 확인하여 MyFeed 컴포넌트를 올릴지, Feed 컴포넌트를 올릴지 선택
 * @constructor
 */
const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMyFeed, setIsMyFeed] = useState(true);
  const [userData, setUserData] = useAtom(userAtom);

  // 내 게시글 | 참여한 게시글 스위칭
  const [postType, setPostType] = useState("내 게시글");

  useEffect(() => {
    if (userData.userType !== "activatedUser") {
      navigate(RouteURL.login);
    }
    //   본인 피드인지 확인
    // /user뒤의 파라미터가 있는지 확인. 없으면 본인 피드로 navigate
    // 게시글 조회 + 게시글 수
  }, []);

  return (
    <>
      {/*프로필 부분*/}
      <UserProfile isMyFeed={isMyFeed} userData={userData} />

      {/*내 게시글 & 참여한 게시글 선택 부분*/}
      <SelectMyPostType postType={postType} setPostType={setPostType} />

      {/*피드 부분*/}
      {/*  여긴 홈 페이지 만드는걸로 적용 */}
    </>
  );
};

export default Feed;
