import React, { useState, useRef, useEffect } from 'react';
import { FaFileInvoice, FaTimes } from 'react-icons/fa';

const Invoice = ({ order, lineItems }) => {
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef(null);

  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  const handleOutsideClick = (event) => {
    if (invoiceRef.current && !invoiceRef.current.contains(event.target)) {
      setShowInvoice(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      setShowInvoice(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const printInvoice = () => {
    const invoiceContent = invoiceRef.current.innerHTML;
    const printWindow = window.open('', '_blank', 'height=500,width=800');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 1rem;
            }
            .invoice {
              max-width: 800px;
              margin: 0 auto;
              background-color: #fff;
              padding: 2rem;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 2rem;
            }
            .invoice-details {
              margin-bottom: 2rem;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 2rem;
            }
            .invoice-table td {
              padding: 0.5rem 0;
              text-align: right;
            }
            .invoice-table .label {
              text-align: left;
              padding-right: 1rem;
            }
            .totals {
              width: 100%;
              border-top: 1px solid #ddd;
              margin-top: 1rem;
              padding-top: 1rem;
            }
            .totals td {
              padding: 0.5rem 0;
              text-align: right;
            }
            .totals .label {
              text-align: left;
              padding-right: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            ${invoiceContent}
          </div>
          <script>
            window.addEventListener('load', function() {
              window.print();
              window.addEventListener('afterprint', function() {
                window.close();
              });
            });
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const calculateTotal = () => {
    const subtotal = lineItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + item.quantity * (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
    const vat = subtotal * 0.1;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + vat + tax;
    return { subtotal, vat, tax, grandTotal };
  };

  const { vat, tax, grandTotal } = calculateTotal();

  return (
    <>
      <button
        className="bg-black-400 hover:bg-orange-300 text-black  py-1 px-1 rounded"
        onClick={toggleInvoice}
      >
        <FaFileInvoice className="inline-block mr-1" /> 
        Show Invoice
      </button>

      {showInvoice && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
          tabIndex={0}
        >
          <div
            ref={invoiceRef}
            className="bg-white shadow-md p-8 max-w-lg mx-auto relative"
          >
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={toggleInvoice}
            >
              <FaTimes />
            </button>
            <div className="invoice-header">
              <div>
                <h1 className="text-3xl font-bold">Invoice</h1>
                <p className="text-gray-600">123 Main Street, City, Country</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-gray-600">Date: {order.date}</p>
              </div>
            </div>
            <div className="invoice-details">
              <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
              <p className="text-gray-600">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.email}</p>
              <p className="text-gray-600">{order.customer.address}</p>
            </div>
            {lineItems.map((item) => {
              const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
              return (
                <div key={item.id} className="invoice-table">
                  <div className="flex justify-between">
                    <div className="label"><strong>Product Name:</strong></div>
                    <div>{item.name}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="label"><strong>Quantity:</strong></div>
                    <div>{item.quantity} pc</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="label"><strong>Price:</strong></div>
                    <div>৳{isNaN(itemPrice) ? '0.00' : itemPrice.toFixed(2)}</div>
                  </div>
                  <hr />
                </div>
              );
            })}
            <div className="totals">
              <div className="flex justify-between">
                <div className="label">VAT (10%)</div>
                <div>৳{vat.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div className="label">Tax (10%)</div>
                <div>৳{tax.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div className="label">Grand Total</div>
                <div>৳{grandTotal.toFixed(2)}</div>
              </div>
            </div>

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={printInvoice}>
              Print
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
