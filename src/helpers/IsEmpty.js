export  function isEmpty (obj) {
    console.log(obj, "obj");
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}