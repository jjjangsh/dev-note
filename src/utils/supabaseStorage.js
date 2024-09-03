import supabase from '../supabaseClient';

/**
 * 이미지를 supabase storage에 업로드 후, publicUrl을 반환
 * @param {file} uploadImg - URL을 얻을 이미지 file, input[type="file"]로 받아온 값
 * @param {string} bucket - 사진이 저장될 bucket, 지정되지 않는 경우 images bucket에 저장
 * @param {string} folder - 사진이 저장될 폴더, 지정되지 않는 경우 public 폴더에 저장
 * @returns {string} uploadImg의 URL
 */
export const getImageURL = async (uploadImg, bucket, folder) => {
  let imageUrl = null;
  const imgName = `${Date.now()}-${crypto.randomUUID()}`;
  const imgPath = `${folder || 'public'}/${imgName}`;

  if (!uploadImg) return imageUrl;

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(`${bucket || 'images'}`)
      .upload(imgPath, uploadImg);

    if (uploadError) {
      console.error('🚀 ~ getImageURL ~ uploadError:', uploadError);
      return imageUrl;
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from(`${bucket || 'images'}`)
      .getPublicUrl(uploadData.path);

    if (urlError) {
      console.error('🚀 ~ getImageURL ~ urlError:', urlError);
      return imageUrl;
    }

    imageUrl = urlData.publicUrl;
  } catch (error) {
    console.log('🚀 ~ getImageURL ~ error:', error);
  }

  return imageUrl;
};
