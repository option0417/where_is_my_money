module.exports = {
  showReq : function (req) {
    console.log("Show header");
    console.log(req.headers);

    console.log("Show query");
    console.log(req.query);

    console.log("Show body");
    console.log(req.body);
  }
}
