import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';

export default function SummarySection() {
  const { invoice, updateSummary, calculations } = useInvoice();

  const handleChange = (e) => {
    updateSummary({ [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col md:flex-row gap-8 justify-between">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Adjustments</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Discount Amount</label>
            <input 
              type="number" 
              name="discount" 
              min="0"
              step="0.01"
              value={invoice.summary.discount} 
              onChange={handleChange} 
              className="input-field" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="label-text">Shipping Charge</label>
            <input 
              type="number" 
              name="shipping" 
              min="0"
              step="0.01"
              value={invoice.summary.shipping} 
              onChange={handleChange} 
              className="input-field" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium">{calculations.subtotal.toFixed(2)}</span>
        </div>
        
        {Number(invoice.summary.discount) > 0 && (
          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>-{Number(invoice.summary.discount).toFixed(2)}</span>
          </div>
        )}
        
        {calculations.taxTotal > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Total Tax</span>
            <span className="font-medium">{calculations.taxTotal.toFixed(2)}</span>
          </div>
        )}
        
        {Number(invoice.summary.shipping) > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span className="font-medium">{Number(invoice.summary.shipping).toFixed(2)}</span>
          </div>
        )}
        
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center mt-1">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Grand Total</span>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {invoice.details.currency} {calculations.grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
}
