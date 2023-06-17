import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import {
  deleteBearerToken,
  getBearerToken,
} from '@/dataManager/localStorageManager';

/**
 * 소셜로그인 후, 해당 사용자가 약관을 동의한 유저인지 확인하는 함수
 *
 */
const getUserInfo = async () => {
  // 만약 로컬스토리지에 없으면 "null"리턴
  if (getBearerToken()) {
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.user.get.USER_TYPE,
      });
      return res?.data;
    } catch (e) {
      // console.log("만료된 jwt.");
      deleteBearerToken();
      return 'null';
    }
  } else {
    // console.log("토큰이 없음");
    return 'null';
  }
};

export default getUserInfo;
