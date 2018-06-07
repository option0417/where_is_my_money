exports.Payment = function(payment_id, payment_type, payment_item, payment_cost, payment_description, create_time, update_time) {
  this.payment_id          = payment_id;
  this.payment_type        = payment_type;
  this.payment_item        = payment_item;
  this.payment_cost        = payment_cost;
  this.payment_description = payment_description;
  this.create_time         = create_time;
  this.update_time         = update_time;
}
