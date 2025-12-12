import React, { useState, useRef } from 'react';
import { LineItem, ClientDetails, DocType } from '../types';

const predefinedItems = [
  { group: "Services", label: "Studio Recording (Hourly)", rate: 1500 },
  { group: "Services", label: "Music Production (Full Track)", rate: 25000 },
  { group: "Services", label: "Video Editing (Day Rate)", rate: 8000 },
  { group: "Services", label: "Color Grading (Project)", rate: 12000 },
  { group: "Equipment", label: "Sony FX3 Camera Kit (Day)", rate: 4500 },
  { group: "Equipment", label: "Sony A7S III Camera Kit (Day)", rate: 3500 },
  { group: "Equipment", label: "G-Master Lens 24-70mm GM II (Day)", rate: 1500 },
  { group: "Equipment", label: "G-Master Lens 70-200mm GM II (Day)", rate: 1800 },
  { group: "Equipment", label: "DJI RS3 Pro Gimbal (Day)", rate: 2000 },
  { group: "Equipment", label: "Aputure 300d II Light Kit (Day)", rate: 1200 },
  { group: "Equipment", label: "Wireless Mic Kit (Day)", rate: 1000 },
];

export const InvoiceGenerator: React.FC = () => {
  const [docType, setDocType] = useState<DocType>(DocType.QUOTATION);
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    email: '',
    projectName: '',
    projectType: 'Video',
    date: new Date().toISOString().split('T')[0],
    notes: 'Includes equipment rental insurance waiver.'
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: 'Music Video Production (Day Rate)', quantity: 2, rate: 15000 },
    { id: 2, description: 'Sony FX3 Camera Kit Rental', quantity: 2, rate: 4500 },
    { id: 3, description: 'DJI RS3 Pro Gimbal Rental', quantity: 2, rate: 2000 }
  ]);

  const [taxRate, setTaxRate] = useState<number>(18);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, rate: 0 }]);
  };

  const handleQuickAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = predefinedItems.find(i => i.label === e.target.value);
    if (selected) {
      setLineItems([...lineItems, { 
        id: Date.now(), 
        description: selected.label, 
        quantity: 1, 
        rate: selected.rate 
      }]);
    }
    // Reset selection
    e.target.value = "";
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: number, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const subtotal = calculateSubtotal();
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="invoice-tool" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Invoice & Quote Generator</h2>
            <p className="text-slate-400">Create professional documentation for services and equipment rentals.</p>
          </div>

          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors ${
                  docType === DocType.QUOTATION 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                onClick={() => setDocType(DocType.QUOTATION)}
              >
                Quotation Generator
              </button>
              <button
                className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors ${
                  docType === DocType.INVOICE 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                onClick={() => setDocType(DocType.INVOICE)}
              >
                Invoice Generator
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Client Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientDetails.name}
                    onChange={(e) => setClientDetails({...clientDetails, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={clientDetails.email}
                    onChange={(e) => setClientDetails({...clientDetails, email: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={clientDetails.projectName}
                    onChange={(e) => setClientDetails({...clientDetails, projectName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Summer Music Video"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Project Type</label>
                  <select
                    value={clientDetails.projectType}
                    onChange={(e) => setClientDetails({...clientDetails, projectType: e.target.value as any})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Music">Music Production</option>
                    <option value="Video">Video Production</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={clientDetails.date}
                    onChange={(e) => setClientDetails({...clientDetails, date: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Line Items</h3>
                </div>

                {/* Quick Add Dropdown */}
                <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <label className="block text-sm font-medium text-indigo-400 mb-2">⚡ Quick Add Equipment or Service</label>
                    <select 
                        onChange={handleQuickAdd}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                        defaultValue=""
                    >
                        <option value="" disabled>Select an item to add...</option>
                        <optgroup label="Services">
                            {predefinedItems.filter(i => i.group === "Services").map(i => (
                                <option key={i.label} value={i.label}>{i.label} - ₹{i.rate}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Equipment Rental">
                            {predefinedItems.filter(i => i.group === "Equipment").map(i => (
                                <option key={i.label} value={i.label}>{i.label} - ₹{i.rate}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                <div className="space-y-4">
                  {lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 items-end bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                      <div className="col-span-12 md:col-span-5">
                        <label className="block text-xs text-slate-500 mb-1 md:hidden">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs text-slate-500 mb-1 md:hidden">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs text-slate-500 mb-1 md:hidden">Rate (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="col-span-3 md:col-span-2 text-right pb-2 font-mono text-indigo-400">
                        ₹{(item.quantity * item.rate).toFixed(2)}
                      </div>
                      <div className="col-span-1 md:col-span-1 text-right">
                        <button 
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-500 hover:text-red-400 p-2"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addLineItem}
                  className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
                >
                  + Add Empty Line Item
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Generate Preview
                </button>
              </div>
            </div>
          </div>

          {/* PREVIEW SECTION */}
          {showPreview && (
            <div className="mt-12 animate-fade-in" id="invoice-preview" ref={previewRef}>
              <div className="bg-white text-slate-900 rounded-none md:rounded-lg p-8 md:p-12 shadow-2xl max-w-4xl mx-auto print:shadow-none print:w-full print:max-w-none">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-12 border-b-2 border-slate-100 pb-8">
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">HR CREW</h1>
                    <p className="text-sm font-semibold text-slate-500 tracking-widest uppercase">Productions</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-3xl font-light text-indigo-600 uppercase mb-2">{docType}</h2>
                    <p className="text-slate-500">#{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-slate-500">{clientDetails.date}</p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</h3>
                    <p className="font-bold text-slate-800">HR Crew Productions</p>
                    <p className="text-slate-600">House no. 1070/3, Street 2</p>
                    <p className="text-slate-600">East Rajiv Nagar, Gurgaon</p>
                    <p className="text-slate-600">Ph: 7048998256, 9717155406</p>
                  </div>
                  <div className="md:text-right">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To</h3>
                    <p className="font-bold text-slate-800">{clientDetails.name || 'Client Name'}</p>
                    <p className="text-slate-600">{clientDetails.projectName || 'Project Name'}</p>
                    <p className="text-slate-600">{clientDetails.email}</p>
                  </div>
                </div>

                {/* Table */}
                <div className="mb-12">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-800">
                        <th className="text-left py-3 text-sm font-bold uppercase tracking-wider">Description</th>
                        <th className="text-center py-3 text-sm font-bold uppercase tracking-wider">Qty</th>
                        <th className="text-right py-3 text-sm font-bold uppercase tracking-wider">Rate</th>
                        <th className="text-right py-3 text-sm font-bold uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {lineItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 text-slate-800">{item.description || 'Item Description'}</td>
                          <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                          <td className="py-4 text-right text-slate-600">₹{item.rate.toFixed(2)}</td>
                          <td className="py-4 text-right font-medium text-slate-900">₹{(item.quantity * item.rate).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tax ({taxRate}%)</span>
                      <span>₹{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-indigo-600 border-t-2 border-slate-100 pt-3">
                      <span>Total</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Notes */}
                {clientDetails.notes && (
                  <div className="mb-8 p-4 bg-slate-50 rounded text-sm text-slate-600">
                    <span className="font-bold block mb-1">Notes:</span>
                    {clientDetails.notes}
                  </div>
                )}

                <div className="text-center text-xs text-slate-400 mt-12 pt-8 border-t border-slate-100">
                  <p>HR Crew Productions &bull; Thank you for your business!</p>
                  <p className="mt-1">Payment is due within 14 days of invoice date.</p>
                </div>

                {/* Print Button (Hidden when printing) */}
                <div className="mt-8 text-center print:hidden">
                  <button
                    onClick={handlePrint}
                    className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    Print / Save PDF
                  </button>
                  <p className="mt-4 text-sm text-slate-500 cursor-pointer hover:text-indigo-500" onClick={() => setShowPreview(false)}>
                    Close Preview
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};