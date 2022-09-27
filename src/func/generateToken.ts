var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var generateToken = async function () {
    return rand() + rand() + rand(); // to make it longer
};

export default generateToken;