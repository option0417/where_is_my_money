exports.Payment = function(payment_id, payment_type, payment_item, payment_cost, payment_description, payment_create_time, payment_update_time) {
  this.payment_id          = payment_id;
  this.payment_type        = payment_type;
  this.payment_item        = payment_item;
  this.payment_cost        = payment_cost;
  this.payment_description = payment_description;
  this.payment_create_time = payment_create_time;
  this.payment_update_time = payment_update_time;

  this.setPaymentID = function(payment_id) { this.payment_id = payment_id }
  this.setPaymentType = function(payment_type) { this.payment_type = payment_type }
  this.setPaymentItem = function(payment_item) { this.payment_item = payment_item }
  this.setPaymentCost = function(payment_cost) { this.payment_cost = payment_cost }
  this.setPaymentDescription = function(payment_description) { this.payment_description = payment_description }
  this.setPaymentCreateTime = function(payment_createTime) { this.payment_createTime = payment_createTime }
  this.setPaymentUpdateTime = function(payment_updateTime) { this.payment_updateTime = payment_updateTime }
}
