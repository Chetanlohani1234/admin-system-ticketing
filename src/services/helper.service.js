const orderStatus = (data) => {

  return {
    "inprocess" : "In Process",
    "awb_generated" : "AWB Number Generated", 
    "delivered" : "Delivered", 
    "cancelled" : "Cancelled", 
    "order_rejected" : "Order Rejected", 
    "lost_transit" : "Lost in Transit", 
    "order_accepted" : "Order Accepted",
    "in_transit" : "In Transit", 
    "refund_closed" : "Refund Closed", 
    "refund_initiated" : "Refund Initiated",
    "return_received" : "Return Received", 
    "return_initiated" : "Return Initiated", 
    "oup_payment_gateway" : "OUP Payment Gateway",   
    "ready_dispatch" : "Ready for Dispatch"
  }

};


const HelperService = {
  orderStatus,
}

export default HelperService;