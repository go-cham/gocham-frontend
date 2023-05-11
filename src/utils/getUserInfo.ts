import ApiConfig, { HttpMethod } from "../dataManager/apiConfig";
import { EndPoint } from "../dataManager/apiMapper";
import { getBearerToken } from "../dataManager/localStorageManager";

/**
 * 소셜로그인 후, 해당 사용자가 약관을 동의한 유저인지 확인하는 함수
 *
 */
const getUserInfo = async () => {
  // console.log("확인작업 들어갑니다");
  // 만약 로컬스토리지에 없으면 "null"리턴
  if (getBearerToken()) {
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.user.get.USER_TYPE,
      });
      // console.log("isUserRegistered ");
      // console.log(res?.data);
      // console.log("성공");
      return res?.data;
    } catch (e) {
      console.log(e);
      return "null";
    }
  } else {
    console.log("토큰이 없음");
    return "null";
  }
};

export default getUserInfo;
