import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function AgencyTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-[#f9fafb] text-[#111827] w-full h-full p-12 font-sans relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-[-50px] right-20 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="h-full flex flex-col relative z-10">
        
        {/* Header */}
        <div className={`flex justify-between items-end ${isFirstPage ? 'mb-16' : 'mb-8'}`}>
          <div className="w-[60%]">
            <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
              INVOICE
            </h2>
            <p className="text-sm font-bold text-gray-500 tracking-widest uppercase">#{details.invoiceNumber}</p>
          </div>
          <div className="w-[40%] text-right flex flex-col items-end">
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Logo" className="max-h-16 object-contain mb-4" />
            ) : isFirstPage && company.name ? (
              <h1 className="text-3xl font-black text-gray-900 mb-2">{company.name}</h1>
            ) : null}
            {isFirstPage && (
              <div className="text-sm text-gray-500 space-y-1 mt-2 text-right flex flex-col items-end">
                {company.email && <p><span className="font-bold text-gray-400 mr-2">Email:</span> {company.email}</p>}
                {company.website && <p><span className="font-bold text-gray-400 mr-2">Website:</span> {company.website}</p>}
                {company.phone && <p><span className="font-bold text-gray-400 mr-2">Phone:</span> {company.phone}</p>}
                {company.address && <p className="whitespace-pre-wrap flex justify-end"><span className="font-bold text-gray-400 mr-2 shrink-0">Address:</span> <span className="text-right">{company.address}</span></p>}
                {company.taxNumber && <p><span className="font-bold text-gray-400 mr-2">Tax ID:</span> {company.taxNumber}</p>}
              </div>
            )}
          </div>
        </div>

        {isFirstPage && (
          <div className="flex gap-8 mb-16">
            <div className="w-[58%]">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Invoice To</p>
              <div className="flex flex-wrap mt-2 -mx-2">
                <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-black text-gray-900 flex items-center"><span className="text-sm font-bold text-pink-500 mr-2 uppercase tracking-widest">Name:</span> {customer.name || 'Client Name'}</h3>
                {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-bold text-gray-600"><span className="text-xs font-bold text-pink-500 mr-2 uppercase tracking-widest">Company:</span> {customer.company}</p>}
                {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-500 whitespace-pre-wrap flex"><span className="text-xs font-bold text-pink-500 mr-2 uppercase tracking-widest shrink-0 mt-1">Address:</span> <span>{customer.address}</span></p>}
                {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-500"><span className="text-xs font-bold text-pink-500 mr-2 uppercase tracking-widest">Email:</span> {customer.email}</p>}
                {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-500"><span className="text-xs font-bold text-pink-500 mr-2 uppercase tracking-widest">Phone:</span> {customer.phone}</p>}
                {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-500"><span className="text-xs font-bold text-pink-500 mr-2 uppercase tracking-widest">Tax ID:</span> {customer.taxNumber}</p>}
              </div>
            </div>
            <div className="w-[42%] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Date</span>
                  <span className="font-bold text-gray-900">{details.invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Due</span>
                  <span className="font-bold text-pink-600">{details.dueDate}</span>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black text-gray-900">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-4 text-xs font-black text-gray-900 uppercase tracking-widest border-b-2 border-gray-900">Project / Description</th>
                <th className="py-4 text-xs font-black text-gray-900 uppercase tracking-widest text-center w-24 border-b-2 border-gray-900">Hrs/Qty</th>
                <th className="py-4 text-xs font-black text-gray-900 uppercase tracking-widest text-right w-32 border-b-2 border-gray-900">Rate</th>
                <th className="py-4 text-xs font-black text-gray-900 uppercase tracking-widest text-right w-32 border-b-2 border-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemsChunk.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-5 text-sm font-bold text-gray-800">{item.description || '-'}</td>
                  <td className="py-5 text-sm text-gray-600 text-center font-medium">{item.quantity}</td>
                  <td className="py-5 text-sm text-gray-600 text-right font-medium">{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="py-5 text-sm font-black text-gray-900 text-right">{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {isLastPage && (
          <div className="mt-12 flex justify-between items-start gap-12">
            <div className="w-[50%]">
              {extra.notes && (
                <div className="mb-6">
                  <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Notes</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.notes}</p>
                </div>
              )}
              {extra.terms && (
                <div className="mb-6">
                  <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Terms</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.terms}</p>
                </div>
              )}
              {(extra.signature || extra.signatoryName) && (
                <div className="mt-8 text-right flex flex-col items-end">
                  {extra.signature ? (
                    <img src={extra.signature} alt="Signature" className="max-h-16 object-contain mb-2" />
                  ) : (
                    <div className="mb-2">
                      <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="w-[40%] bg-gray-900 text-white p-8 rounded-3xl">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="font-bold">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                </div>
                {calculations.taxTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Tax</span>
                    <span className="font-bold">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                  </div>
                )}
                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Discount</span>
                    <span className="font-bold text-pink-400">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                  </div>
                )}
                {summary.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Shipping</span>
                    <span className="font-bold">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-700">
                  <span className="text-lg font-black tracking-widest">TOTAL</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
