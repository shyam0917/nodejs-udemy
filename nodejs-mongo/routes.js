const testHandler = (req, res) => {
    if (req.url === "/") {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('Hello To Node Js');
        return res.end();
    }

}
var test ="hello";

exports.handler = testHandler;
exports.gues = "Friend2";

// module.exports.handler = testHandler;
// module.exports.gues = "Friend1";

// module.exports = {
//     testHandler,
//     gues: "Friend"
// };