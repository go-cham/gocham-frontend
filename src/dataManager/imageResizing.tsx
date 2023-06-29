export async function resizeImage(base64: string): Promise<string> {
  const resizeMB = 2; // n 메가바이트 이상시 리사이징
  const byteString = base64.split(',')[1];
  const sizeInBytes = byteString.length * 0.77;
  // base64 인코딩은 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 이 인코딩 방식은 바이너리 데이터의 크기가 커짐에 따라 인코딩된 문자열의 크기도 커집니다.
  // 따라서 base64 문자열의 길이는 원본 이미지의 크기와 다릅니다. base64 문자열의 길이는 원본 이미지의 크기보다 약 33% 정도 더 큽니다.

  const sizeInMB = sizeInBytes / (1024 * 1024);

  if (sizeInMB > resizeMB) {
    const img = document.createElement('img');
    img.src = base64;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to create canvas context');
    }
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    let quality = 0.8;
    let newBase64 = canvas.toDataURL('image/jpeg', quality);
    let resizedByteString = newBase64.split(',')[1];
    let resizedSizeInBytes = resizedByteString.length * 0.77;
    let resizedSizeInMB = resizedSizeInBytes / (1024 * 1024);

    while (resizedSizeInMB > 1) {
      quality = quality - 0.1;
      newBase64 = canvas.toDataURL('image/jpeg', quality);
      resizedByteString = newBase64.split(',')[1];
      resizedSizeInBytes = resizedByteString.length * 0.77;
      resizedSizeInMB = resizedSizeInBytes / (1024 * 1024);
    }

    return newBase64;
  } else {
    return base64;
  }
}
