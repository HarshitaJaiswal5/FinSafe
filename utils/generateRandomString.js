function generateRandomString() {
    const randomNumber = Math.floor(Math.random()*9000)+1000
    const randomString = randomNumber.toString()
    return randomString
}


module.exports = {
    generateRandomString
}