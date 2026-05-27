import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function ModernProTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-gray-50 text-gray-900 w-full h-full p-10 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 h-full flex flex-col relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

        {/* Header */}
        <div className={`flex justify-between items-start ${isFirstPage ? 'mb-12' : 'mb-6'} pt-2`}>
          <div>
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Logo" className="max-h-16 object-contain mb-4" />
            ) : isFirstPage && company.name ? (
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{company.name}</h1>
            ) : null}
            {isFirstPage && (
              <div className="mt-2 text-sm text-gray-500 space-y-1">
                {company.address && <p className="whitespace-pre-wrap flex"><span className="font-semibold text-gray-700 mr-2 shrink-0">Address:</span> <span>{company.address}</span></p>}
                {company.email && <p><span className="font-semibold text-gray-700 mr-2">Email:</span> {company.email}</p>}
                {company.phone && <p><span className="font-semibold text-gray-700 mr-2">Phone:</span> {company.phone}</p>}
                {company.taxNumber && <p><span className="font-semibold text-gray-700 mr-2">Tax ID:</span> {company.taxNumber}</p>}
              </div>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-extrabold text-indigo-600 tracking-tighter mb-2">INVOICE</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-semibold text-gray-900">Invoice No:</span> {details.invoiceNumber}</p>
              <p><span className="font-semibold text-gray-900">Date:</span> {details.invoiceDate}</p>
              <p><span className="font-semibold text-gray-900">Due Date:</span> {details.dueDate}</p>
            </div>
          </div>
        </div>

        {isFirstPage && (
          <div className="bg-indigo-50/50 rounded-xl p-6 mb-12 flex justify-between">
            <div className="w-[55%]">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Billed To</p>
              <div className="flex flex-wrap mt-2 -mx-2">
                <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-bold text-gray-900 flex items-center"><span className="text-sm font-semibold text-indigo-600 mr-2">Name:</span> {customer.name || 'Customer Name'}</h3>
                {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-medium text-gray-700"><span className="font-semibold text-indigo-600 mr-2">Company:</span> {customer.company}</p>}
                {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600 whitespace-pre-wrap flex"><span className="font-semibold text-indigo-600 mr-2 shrink-0">Address:</span> <span>{customer.address}</span></p>}
                {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-semibold text-indigo-600 mr-2">Email:</span> {customer.email}</p>}
                {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-semibold text-indigo-600 mr-2">Phone:</span> {customer.phone}</p>}
                {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-semibold text-indigo-600 mr-2">Tax ID:</span> {customer.taxNumber}</p>}
              </div>
            </div>
            <div className="w-1/3 text-right flex flex-col justify-end">
              <p className="text-sm text-gray-600 font-medium mb-1">Amount Due</p>
              <p className="text-3xl font-bold text-indigo-600">{details.currency} {calculations.grandTotal.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-center w-24">Qty</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-right w-32">Price</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemsChunk.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 px-4 text-sm text-gray-800">{item.description || '-'}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 text-right">{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {isLastPage && (
          <div className="mt-8 flex justify-between items-start gap-8">
            <div className="w-[50%]">
              {extra.notes && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.notes}</p>
                </div>
              )}
              {extra.terms && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Terms</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.terms}</p>
                </div>
              )}
              {(extra.signature || extra.signatoryName) && (
                <div className="mt-6">
                  {extra.signature ? (
                    <img src={extra.signature} alt="Signature" className="max-h-12 object-contain mb-1" />
                  ) : (
                    <div className="mb-2">
                      <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                    </div>
                  )}
                  <div className="w-40 border-t border-gray-300 pt-1">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Authorized Signature</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-[45%]">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                  </div>
                  {calculations.taxTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900 font-medium">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {summary.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-gray-900 font-medium">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {summary.shipping > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
