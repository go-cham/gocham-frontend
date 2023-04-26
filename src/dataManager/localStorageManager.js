// exports.saveLoginData = ({jwt, expiredAt, keeperName}, email) => {
//   window.localStorage.setItem('email', email ?? '')
//   window.localStorage.setItem(process.env.REACT_APP_JWT_PATH, jwt)
//   window.localStorage.setItem('expiredAt', expiredAt)
//   window.localStorage.setItem('keeperName', keeperName)
// }

// exports.clearLoginData = () => {
//   window.localStorage.removeItem(process.env.REACT_APP_JWT_PATH)
//   window.localStorage.removeItem('expiredAt')
//   window.localStorage.removeItem('keeperName')
// }

// exports.saveLoginData = ({jwt, adminId, gridgeAuthority}) => {
//   window.localStorage.setItem('jwt', jwt)
//   window.localStorage.setItem('adminId', adminId)
//   window.localStorage.setItem('gridgeAuthority', gridgeAuthority)
// }

exports.saveLoginEmail = (email) => {
  window.localStorage.setItem("email", email ?? "");
};

exports.getLocalStorageEmail = () => {
  return window.localStorage.getItem("email") ?? "";
};

exports.saveLoginData = (gridgeAdminInfo) => {
  window.localStorage.setItem(
    process.env.REACT_APP_GRIDGE_ADMIN_INFO,
    JSON.stringify(gridgeAdminInfo)
  );
};

exports.getAdminId = () => {
  const gridgeAdminInfo = JSON.parse(
    window.localStorage.getItem(process.env.REACT_APP_GRIDGE_ADMIN_INFO)
  );
  return gridgeAdminInfo?.adminId ?? "Error";
};

exports.getGridgeAuthority = () => {
  const gridgeAdminInfo = JSON.parse(
    window.localStorage.getItem(process.env.REACT_APP_GRIDGE_ADMIN_INFO)
  );
  return gridgeAdminInfo?.gridgeAuthority ?? "";
};

exports.getJwt = () => {
  const gridgeAdminInfo = JSON.parse(
    window.localStorage.getItem(process.env.REACT_APP_GRIDGE_ADMIN_INFO)
  );
  return gridgeAdminInfo?.jwt ?? "Error";
};
