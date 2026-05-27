import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function BusinessEliteTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-900 w-full h-full p-10 font-sans">
      <div className="h-full flex flex-col border-x-4 border-slate-800">
        
        {/* Header Block */}
        <div className={`bg-slate-800 text-white p-10 ${isFirstPage ? 'mb-10' : 'mb-6'}`}>
          <div className="flex justify-between items-start">
            <div className="w-1/2">
              <h1 className="text-3xl font-serif tracking-wide uppercase mb-2">{company.name || 'Company Name'}</h1>
              {isFirstPage && (
                <div className="text-sm text-slate-300 space-y-1 mt-3">
                  {company.address && <p className="whitespace-pre-wrap flex"><span className="font-bold text-slate-400 mr-2 shrink-0">Address:</span> <span>{company.address}</span></p>}
                  {company.email && <p><span className="font-bold text-slate-400 mr-2">Email:</span> {company.email}</p>}
                  {company.phone && <p><span className="font-bold text-slate-400 mr-2">Phone:</span> {company.phone}</p>}
                  {company.taxNumber && <p><span className="font-bold text-slate-400 mr-2">Tax ID:</span> {company.taxNumber}</p>}
                </div>
              )}
            </div>
            <div className="w-1/2 text-right flex flex-col items-end">
              {company.logo && isFirstPage && (
                <img src={company.logo} alt="Logo" className="max-h-16 object-contain mb-4 bg-white p-1 rounded" />
              )}
              <h2 className="text-2xl font-light tracking-[0.2em] text-slate-400">INVOICE</h2>
            </div>
          </div>
        </div>

        <div className="px-10 flex-1 flex flex-col">
          {/* Details Block */}
          {isFirstPage && (
            <div className="flex justify-between gap-10 mb-12 border-b-2 border-slate-200 pb-8">
              <div className="w-[55%]">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Invoice To</p>
                <div className="flex flex-wrap mt-2 -mx-2">
                  <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-serif font-bold text-slate-900 flex items-center"><span className="text-sm font-bold text-slate-500 font-sans mr-2 uppercase tracking-widest">Name:</span> {customer.name || 'Client Name'}</h3>
                  {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-medium text-slate-700"><span className="font-bold text-slate-500 mr-2 uppercase tracking-widest text-xs">Company:</span> {customer.company}</p>}
                  {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-slate-600 whitespace-pre-wrap flex"><span className="font-bold text-slate-500 mr-2 uppercase tracking-widest text-xs shrink-0 mt-1">Address:</span> <span>{customer.address}</span></p>}
                  {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-slate-600"><span className="font-bold text-slate-500 mr-2 uppercase tracking-widest text-xs">Email:</span> {customer.email}</p>}
                  {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-slate-600"><span className="font-bold text-slate-500 mr-2 uppercase tracking-widest text-xs">Phone:</span> {customer.phone}</p>}
                  {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-slate-600"><span className="font-bold text-slate-500 mr-2 uppercase tracking-widest text-xs">Tax ID:</span> {customer.taxNumber}</p>}
                </div>
              </div>
              <div className="w-[45%] flex flex-wrap -mx-2 text-sm">
                <div className="w-1/2 px-2 mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Invoice Number</p>
                  <p className="font-medium text-slate-900">{details.invoiceNumber}</p>
                </div>
                <div className="w-1/2 px-2 mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Date</p>
                  <p className="font-medium text-slate-900">{details.invoiceDate}</p>
                </div>
                <div className="w-1/2 px-2 mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Due Date</p>
                  <p className="font-medium text-slate-900">{details.dueDate}</p>
                </div>
                <div className="w-1/2 px-2 mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Due</p>
                  <p className="text-lg font-bold text-slate-900">{details.currency} {calculations.grandTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-800">
                  <th className="py-3 text-xs font-bold text-slate-800 uppercase tracking-wider">Item Description</th>
                  <th className="py-3 text-xs font-bold text-slate-800 uppercase tracking-wider text-center w-24">Qty</th>
                  <th className="py-3 text-xs font-bold text-slate-800 uppercase tracking-wider text-right w-32">Rate</th>
                  <th className="py-3 text-xs font-bold text-slate-800 uppercase tracking-wider text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {itemsChunk.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="py-4 text-sm text-slate-800">{item.description || '-'}</td>
                    <td className="py-4 text-sm text-slate-600 text-center">{item.quantity}</td>
                    <td className="py-4 text-sm text-slate-600 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                    <td className="py-4 text-sm font-medium text-slate-900 text-right">{Number(item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {isLastPage && (
            <div className="mt-8 pt-8 flex justify-between items-start gap-12">
              <div className="w-[50%]">
                {extra.notes && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Notes</p>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{extra.notes}</p>
                  </div>
                )}
                {extra.terms && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Terms</p>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{extra.terms}</p>
                  </div>
                )}
                {(extra.signature || extra.signatoryName) && (
                  <div className="mt-8">
                    {extra.signature ? (
                      <img src={extra.signature} alt="Signature" className="max-h-16 object-contain mb-2" />
                    ) : (
                      <div className="mb-2">
                        <p className="text-2xl text-slate-800 font-serif italic">{extra.signatoryName}</p>
                      </div>
                    )}
                    <div className="w-48 border-t border-slate-400 pt-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Authorized Signature</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-[45%] border-t-2 border-slate-800 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="text-slate-900 font-medium">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                  </div>
                  {calculations.taxTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax:</span>
                      <span className="text-slate-900 font-medium">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {summary.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Discount:</span>
                      <span className="text-slate-900 font-medium">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {summary.shipping > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Shipping:</span>
                      <span className="text-slate-900 font-medium">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-200">
                    <span className="text-lg font-serif font-bold text-slate-900">Grand Total:</span>
                    <span className="text-2xl font-bold text-slate-900">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
