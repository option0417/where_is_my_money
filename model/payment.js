exports.Payment = function(payment_id, payment_type, item_name, item_price, amount, payment_cost, create_time, update_time) {
  this.payment_id          = payment_id;
  this.payment_type	       = payment_type;
  this.item_name           = item_name;
  this.item_price          = item_price;
  this.amount              = amount;
  this.payment_cost        = payment_cost;
  this.create_time         = create_time;
  this.update_time         = update_time;
}
