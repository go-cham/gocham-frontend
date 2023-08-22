import {
  ref as firebaseRef,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { uniqueId } from 'lodash';
import { firebaseStorage } from './firebaseConfig';

export const uploadFirebase = async (
  userId: number,
  file: File,
  dir = 'posting',
) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const now = year + month + day + hours + minutes + seconds;

  const storageRef = firebaseRef(
    firebaseStorage,
    `${dir}/${userId}_${now}_${uniqueId()}`,
  );
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};
