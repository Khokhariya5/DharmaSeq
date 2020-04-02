
exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.isNullOrUndefined = (obj) => {
    if(obj == undefined || obj == null) return true;
    else return false;
}

exports.checkObjectType = (obj, type) => {
    if(typeof obj === type) { return true; }
    else return false;
}

exports.isStrLenLessTo = (str, lessValue) => {
    if(typeof str == "string" && str.length < lessValue) return true;
    else return false;
}

exports.isStrLenGreterTo = (str, greterValue) => {
    if(typeof str == "string" && str.length > greterValue) return true;
    else return false;
}