const service = require('../service/service_payment.js')
const common = require('../common/common.js')

module.exports = {
  postPayment : function (req, res) {
    console.log('Do Post');
    common.showReq(req);

    service.postPayment(req);

    res.set(
      {
        'Access-Control-Allow-Origin' : req.get('Origin')
      }
    );
    res.sendStatus(200);
  },

  getPayment : function (req, res) {
    console.log('Do Get');
    common.showReq(req);
    service.getPayment(req, res);
  },

  editPayment : function (req, res) {
    console.log('Do edit');
    common.showReq(req);
    res.sendStatus(200);
  }
}
