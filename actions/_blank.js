module.exports.ping = async function (req, res, caller = null) {

    res.results.push("pong");
    return res;
}