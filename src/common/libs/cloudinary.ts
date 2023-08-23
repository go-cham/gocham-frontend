import axios from 'axios';

export const uploadImage = async (file: File) => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const data = new FormData();
  data.append('file', file);
  data.append('cloud_name', CLOUD_NAME);
  data.append('upload_preset', PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data,
    );
    const url = res.data.url as string;
    return url.replace('http', 'https');
  } catch (e) {
    console.error(e);
  }
};

export const resizeImage = (url: string, width: number) => {
  if (!url.includes('cloudinary')) {
    return url;
  }

  const splits = url.split('/');
  return (
    splits.slice(0, -2).join('/') + `/w_${width}/` + splits.slice(-2).join('/')
  );
};
