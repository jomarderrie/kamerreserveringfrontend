import { getImageFromDb } from "./../functions/kamers";
export const getImagesFromDbAndFiles = async (
  kamerNaam,
  fileAttachments,
  wantFiles = false
  ) => {
  let images = [];
  let files = [];
  const merged = []
  for (const fileAttachment of fileAttachments) {
    await getImageFromDb(kamerNaam, fileAttachment.name).then((k) => {
      let fileName = k.config.url.split("/").slice(6, k.length);
      if (wantFiles !== false) {
        const file = new File([k.data], fileName, { type: k.data.type });
        files.push(file);
      }
      images.push(URL.createObjectURL(k.data));
    });
  }
  merged[0] = images;
  if(wantFiles){
      merged[1] = files;
  }
  [...files].forEach((file) => console.log(file, "kek"));
  return merged;
};
