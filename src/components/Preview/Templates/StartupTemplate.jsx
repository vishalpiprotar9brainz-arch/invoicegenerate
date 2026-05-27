import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function StartupTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-emerald-50 text-gray-800 w-full h-full p-8 font-sans">
      <div className="bg-white rounded-3xl p-8 h-full flex flex-col shadow-sm border border-emerald-100">
        
        {/* Header */}
        <div className={`flex justify-between items-center ${isFirstPage ? 'mb-10' : 'mb-6'} pb-6 border-b border-emerald-100`}>
          <div className="flex items-center gap-4">
            {company.logo && isFirstPage ? (
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center p-2">
                <img src={company.logo} alt="Logo" className="max-h-full object-contain" />
              </div>
            ) : isFirstPage && company.name ? (
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{company.name}</h1>
            ) : null}
            {isFirstPage && (
              <div className="ml-4 border-l-2 border-emerald-200 pl-4 text-sm text-emerald-700 flex flex-col gap-1">
                {company.website && <p><span className="font-bold text-emerald-600 mr-1">Website:</span> {company.website}</p>}
                {company.email && <p><span className="font-bold text-emerald-600 mr-1">Email:</span> {company.email}</p>}
                {company.phone && <p><span className="font-bold text-emerald-600 mr-1">Phone:</span> {company.phone}</p>}
                {company.address && <p className="whitespace-pre-wrap flex"><span className="font-bold text-emerald-600 mr-1 shrink-0">Address:</span> <span>{company.address}</span></p>}
                {company.taxNumber && <p><span className="font-bold text-emerald-600 mr-1">Tax ID:</span> {company.taxNumber}</p>}
              </div>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Invoice</h2>
            <p className="text-emerald-600 font-bold">#{details.invoiceNumber}</p>
          </div>
        </div>

        {isFirstPage && (
          <div className="flex gap-8 mb-10">
            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Invoice To</p>
              <div className="bg-emerald-50/50 rounded-2xl p-5">
                <div className="flex flex-wrap mt-2 -mx-2">
                  <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-bold text-gray-900 flex items-center"><span className="text-sm font-bold text-emerald-600 mr-2 uppercase tracking-widest">Name:</span> {customer.name || 'Client Name'}</h3>
                  {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-medium text-gray-700"><span className="font-bold text-emerald-600 mr-2 uppercase tracking-widest text-xs">Company:</span> {customer.company}</p>}
                  {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600 whitespace-pre-wrap flex"><span className="font-bold text-emerald-600 mr-2 uppercase tracking-widest text-xs shrink-0 mt-1">Address:</span> <span>{customer.address}</span></p>}
                  {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-bold text-emerald-600 mr-2 uppercase tracking-widest text-xs">Email:</span> {customer.email}</p>}
                  {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-bold text-emerald-600 mr-2 uppercase tracking-widest text-xs">Phone:</span> {customer.phone}</p>}
                  {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-bold text-emerald-600 mr-2 uppercase tracking-widest text-xs">Tax ID:</span> {customer.taxNumber}</p>}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-end space-y-4">
              <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 px-4">
                <span className="text-sm text-gray-500">Issued</span>
                <span className="text-sm font-bold text-gray-900">{details.invoiceDate}</span>
              </div>
              <div className="flex justify-between items-center bg-emerald-50 rounded-xl p-3 px-4">
                <span className="text-sm text-emerald-700 font-medium">Due Date</span>
                <span className="text-sm font-bold text-emerald-700">{details.dueDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left border-separate" style={{ borderSpacing: '0 8px' }}>
            <thead>
              <tr>
                <th className="pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
                <th className="pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center w-24">Qty</th>
                <th className="pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right w-32">Price</th>
                <th className="pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody>
              {itemsChunk.map((item) => (
                <tr key={item.id} className="bg-gray-50/50 group">
                  <td className="py-4 px-4 text-sm font-medium text-gray-800 rounded-l-xl border-y border-l border-gray-100">{item.description || '-'}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 text-center border-y border-gray-100">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 text-right border-y border-gray-100">{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 text-right rounded-r-xl border-y border-r border-gray-100">{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {isLastPage && (
          <div className="mt-8 pt-6 flex justify-between items-start gap-8">
            <div className="w-[50%]">
              {extra.notes && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Notes</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.notes}</p>
                </div>
              )}
              {extra.terms && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Payment Terms</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.terms}</p>
                </div>
              )}
              {(extra.signature || extra.signatoryName) && (
                <div className="mt-6">
                  {extra.signature ? (
                    <img src={extra.signature} alt="Signature" className="max-h-12 object-contain mb-2" />
                  ) : (
                    <div className="mb-2">
                      <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-200 pt-1 w-40">Authorized Signatory</p>
                </div>
              )}
            </div>
            
            <div className="w-[45%]">
              <div className="bg-emerald-500 text-white rounded-2xl p-6 shadow-md">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-100 font-medium">Subtotal</span>
                    <span className="font-bold">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                  </div>
                  {calculations.taxTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-100 font-medium">Tax</span>
                      <span className="font-bold">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {summary.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-100 font-medium">Discount</span>
                      <span className="font-bold">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {summary.shipping > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-100 font-medium">Shipping</span>
                      <span className="font-bold">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-emerald-400">
                    <span className="text-base font-bold">Total Due</span>
                    <span className="text-2xl font-black">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
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
