export const Pos = {"po_num":{"type":"integer","required":true},"po_date":{"type":"date-time"},"vendor_id":{"type":"integer"},"vendor_title":{"type":"text","maxLength":50},"vendor_address":{"type":"text","maxLength":255},"vendor_po_sendvia":{"type":"text","maxLength":10},"vendor_po_template":{"type":"text","maxLength":75},"vendor_emailaddress":{"type":"text","maxLength":75},"vendor_email_subject":{"type":"text","maxLength":75},"vendor_faxnumber":{"type":"text","maxLength":20},"vendor_po_shipto":{"type":"text","maxLength":255},"vendor_po_shipvia":{"type":"text","maxLength":255},"vendor_po_terms":{"type":"text","maxLength":255},"vendor_po_duedate":{"type":"text","maxLength":255},"vendor_po_fob":{"type":"text","maxLength":255},"vendor_po_notes":{"type":"text","maxLength":255},"vendor_po_signedby":{"type":"text","maxLength":255},"po_shippingcost":{"type":"number"},"po_status":{"type":"enum","enumvals":["P","S","R",""]},"lastmodified":{"type":"date-time"},"lastmodby":{"type":"integer"},"customer_orderid":{"type":"integer"},"po_vendor_invoice_num":{"type":"text","maxLength":30},"po_vendor_invoice_date":{"type":"date-time"},"vendor_contacts":{"type":"text"}}