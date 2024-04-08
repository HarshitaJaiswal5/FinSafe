function generateRandomString() {
    const randomNumber = Math.floor(Math.random()*9000)+1000
    const randomString = randomNumber.toString()
    return randomString
}

function generateRandomString8() {
    const randomNumber = Math.floor(Math.random()*90000000)+1000
    const randomString = randomNumber.toString()
    return randomString
}

function generateRandomCharacters(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randomString = generateRandomString(8);



module.exports = {
    generateRandomString,
    generateRandomString8,
    generateRandomCharacters
}