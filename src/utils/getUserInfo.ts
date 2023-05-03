import ApiConfig, { HttpMethod } from "../dataManager/apiConfig";
import { EndPoint } from "../dataManager/apiMapper";

/**
 * 소셜로그인 후, 해당 사용자가 약관을 동의한 유저인지 확인하는 함수
 *
 */
const getUserInfo = async () => {
  console.log("확인작업 들어갑니다");
  try {
    const res = await ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER_TYPE,
    });
    console.log("isUserRegistered ");
    console.log(res);
    return res?.data;
  } catch (e) {
    return "error";
  }
};

export default getUserInfo;
