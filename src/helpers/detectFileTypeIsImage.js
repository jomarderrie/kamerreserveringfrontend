export  function isFiletypeImage (fileType) {
    switch (fileType) {
        case "image/jpeg":
            return true;
        case "image/png":
            return  true;
        case "image/jpg":
            return true;
        default:
            return false;
    }

}