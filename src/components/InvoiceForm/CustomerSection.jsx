import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';

export default function CustomerSection() {
  const { invoice, updateCustomer } = useInvoice();

  const handleChange = (e) => {
    updateCustomer({ [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">To (Customer)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Customer Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" value={invoice.customer.name} onChange={handleChange} required className="input-field" placeholder="John Doe" />
        </div>
        <div>
          <label className="label-text">Customer Company</label>
          <input type="text" name="company" value={invoice.customer.company} onChange={handleChange} className="input-field" placeholder="Client Inc." />
        </div>
        <div>
          <label className="label-text">Email Address</label>
          <input type="email" name="email" value={invoice.customer.email} onChange={handleChange} className="input-field" placeholder="john@clientinc.com" />
        </div>
        <div>
          <label className="label-text">Phone Number</label>
          <input type="text" name="phone" value={invoice.customer.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 999-9999" />
        </div>
        <div className="md:col-span-2">
          <label className="label-text">Billing Address</label>
          <textarea name="address" value={invoice.customer.address} onChange={handleChange} rows="2" className="input-field resize-none" placeholder="456 Client St&#10;City, State, Zip" />
        </div>
        <div className="md:col-span-2">
          <label className="label-text">GST/VAT Number (Optional)</label>
          <input type="text" name="taxNumber" value={invoice.customer.taxNumber} onChange={handleChange} className="input-field" placeholder="TAX-87654321" />
        </div>
      </div>
    </section>
  );
}
