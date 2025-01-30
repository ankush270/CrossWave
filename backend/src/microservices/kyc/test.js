import axios from "axios";

var data =
  '{\r\n   "order_id":1726470481,\r\n   "isd_code":"+1",\r\n   "billing_isd_code":"",\r\n   "order_date":"2022-03-30T00:34:12.311Z",\r\n   "channel_id":2252386,\r\n   "billing_customer_name":"Elena  ",\r\n   "billing_last_name":"",\r\n   "billing_address":"Plot No. 348, 134113, India",\r\n   "billing_address_2":"",\r\n   "billing_city":"Panchkula",\r\n   "billing_state":"Haryana",\r\n   "billing_country":"India",\r\n   "billing_pincode":"134113",\r\n   "billing_email":"test.test@shiprocket.com",\r\n   "billing_phone":9760858933,\r\n   "landmark":"",\r\n   "shipping_is_billing":1,\r\n   "shipping_customer_name":"Elena ",\r\n   "shipping_last_name":"",\r\n   "shipping_address":"Plot 1, Panchkula, Haryana 134113, India",\r\n   "shipping_address_2":"",\r\n   "shipping_city":"Dallas",\r\n   "order_type":1,\r\n   "shipping_country":"United States",\r\n   "shipping_pincode":"134090",\r\n   "shipping_state":"Texas",\r\n   "shipping_email":"test.test@shiprocket.com",\r\n   "product_category":"",\r\n   "shipping_phone":9760853722,\r\n   "billing_alternate_phone":"",\r\n   "order_items":[\r\n      {\r\n         "name":"Combo of 4 Way Spanner and Hydraulic trolly Jack",\r\n         "sku":"5-47606",\r\n         "category_name":"Default Category",\r\n         "tax":"",\r\n         "hsn":"",\r\n         "units":"1",\r\n         "selling_price":"100",\r\n         "discount":"",\r\n         "category_id":"",\r\n         "category_code":""\r\n      }\r\n   ],\r\n   "payment_method":"Prepaid",\r\n   "shipping_charges":0,\r\n   "giftwrap_charges":0,\r\n   "transaction_charges":0,\r\n   "total_discount":0,\r\n   "sub_total":100,\r\n   "weight":0.41,\r\n   "length":10,\r\n   "breadth":10,\r\n   "height":10,\r\n   "pickup_location_id":255,\r\n   "reseller_name":"",\r\n   "company_name":"",\r\n   "ewaybill_no":"",\r\n   "customer_gstin":"",\r\n   "is_order_revamp":1,\r\n   "is_document":0,\r\n   "delivery_challan":false,\r\n   "order_tag":"",\r\n   "purpose_of_shipment":0,\r\n   "currency":"USD",\r\n   "reasonOfExport":2,\r\n   "is_insurance_opt":false\r\n}';

var config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://apiv2.shiprocket.in/v1/external/international/orders/create/adhoc",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU3NTEyNTYsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzM4OTM0MzkzLCJqdGkiOiJBdlpzOXhpaFp3blNldzhsIiwiaWF0IjoxNzM4MDcwMzkzLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczODA3MDM5MywiY2lkIjo1NTQzMDc3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.fNfSJ9O6oei0IFhTP_YmeuJPaIUIa-FJ4B4sHM-yRGQ",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
