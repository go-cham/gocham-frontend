import axios from 'axios';

export const uploadImage = async (file: File) => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

  const data = new FormData();
  data.append('file', file);
  data.append('cloud_name', CLOUD_NAME);
  data.append('upload_preset', PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data,
    );
    return res.data.url as string;
  } catch (e) {
    console.error(e);
  }
};
