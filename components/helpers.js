function uuid(){
    return Date.now() + "_" + Math.floor(100000 + Math.random()*899999);
}

module.exports = {
    uuid
}