const profileImgConverter = (file) => {
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
  } else {
    return "";
  }
  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });

  return data;
};

export { profileImgConverter };
