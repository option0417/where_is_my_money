const service = require('../service/service_payment.js')
const common = require('../common/common.js')

module.exports = {
  // Post
  postPayment : function (req, res) {
    console.log('Do Post');
    common.showReq(req);

    service.postPayment(req, res);
  },
  // Get
  getPayment : function (req, res) {
    console.log('Do Get');
    common.showReq(req);
    service.getPayment(req, res);
  },
  // Edit
  editPayment : function (req, res) {
    console.log('Do edit');
    common.showReq(req);
    service.editPayment(req, res);
  }
}
