import {
  getDownloadURL,
  ref as firebaseRef,
  uploadString,
} from "firebase/storage";
import { firebaseStorage } from "./firebaseConfig";

export const uploadFirebase = async (dataIdx, file, dir) => {
  let storageRef;
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const now = year + month + day + hours + minutes + seconds;

  storageRef = firebaseRef(firebaseStorage, `${dir}/${dataIdx}_${now}`); // 나중엔 뒤에 파일이름 붙여야함.
  const snapshot = await uploadString(storageRef, file, "data_url");
  return getDownloadURL(snapshot.ref);
};
