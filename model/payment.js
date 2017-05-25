exports.Payment = function(payment_id, payment_type, item_name, item_price, amount, total_cost) {
  this.payment_id   = payment_id;
  this.payment_type	= payment_type;
  this.item_name    = item_name;
  this.item_price   = item_price;
  this.amount       = amount;
  this.total_cost   = total_cost;
}
