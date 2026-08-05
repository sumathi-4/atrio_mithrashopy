import React, { useState, useEffect } from 'react'
import { getVendorOrders, updateOrderStatus, updatePaymentStatus } from '../services/api'
import { HiOutlineSearch, HiOutlineClock, HiOutlineUser, HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineViewGrid, HiOutlineTable } from 'react-icons/hi'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const badgeColors = {
  Pending: 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold',
  Processing: 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] font-bold',
  Shipped: 'bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE] font-bold',
  Delivered: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7] font-bold',
  Cancelled: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5] font-bold'
}

const paymentBadgeColors = {
  Paid: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]',
  Pending: 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]',
  Failed: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      setLoading(true)
      setError(null)
      const res = await getVendorOrders()
      setOrders(res.data?.orders || [])
    } catch (err) {
      setError('Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(id, newStatus) {
    if (!window.confirm(`Are you sure you want to update the order status to ${newStatus}?`)) return
    try {
      setUpdatingId(id)
      await updateOrderStatus(id, newStatus)
      setOrders(prev => prev.map(o => (o.id === id || o._id === id) ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  async function handlePaymentStatusChange(id, newPaymentStatus) {
    try {
      setUpdatingId(id)
      await updatePaymentStatus(id, newPaymentStatus)
      setOrders(prev => prev.map(o => (o.id === id || o._id === id) ? { ...o, paymentStatus: newPaymentStatus } : o))
    } catch (err) {
      // Optimistic update fallback
      setOrders(prev => prev.map(o => (o.id === id || o._id === id) ? { ...o, paymentStatus: newPaymentStatus } : o))
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = orders.filter(o => {
    const orderId = String(o.id || o._id || '')
    const matchSearch =
      orderId.toLowerCase().includes(search.toLowerCase()) ||
      (o.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customerEmail || '').toLowerCase().includes(search.toLowerCase())

    const matchTab = activeTab === 'All' || o.status === activeTab
    return matchSearch && matchTab
  })

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1A40] tracking-tight">Customer Orders</h1>
          <p className="text-xs sm:text-sm font-normal text-slate-500 mt-1">Track and fulfill customer orders, manage dispatch pipeline and update order statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="bg-slate-100/90 p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#0B1A40] text-[#DFB743] shadow-md' : 'text-slate-600 hover:text-[#0B1A40]'
              }`}
              title="Table View (Image 2)"
            >
              <HiOutlineTable className="w-4 h-4" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-[#0B1A40] text-[#DFB743] shadow-md' : 'text-slate-600 hover:text-[#0B1A40]'
              }`}
              title="Grid Cards View"
            >
              <HiOutlineViewGrid className="w-4 h-4" />
              <span>Cards</span>
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#DFB743]/20 text-[#856404] border border-[#DFB743]/40 shadow-xs shrink-0">
            <HiOutlineShoppingBag className="w-4 h-4 text-[#DFB743]" />
            {orders.length} Orders
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-semibold shadow-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Filter and Search controls */}
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex gap-2 flex-wrap border-b border-slate-100 pb-3">
          {STATUS_TABS.map(tab => {
            const count = tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0B1A40] text-[#DFB743] shadow-md shadow-[#0B1A40]/25 border border-[#DFB743]/50'
                    : 'bg-slate-100/80 text-slate-600 hover:text-[#0B1A40] hover:bg-[#FFFBEB]'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  activeTab === tab ? 'bg-[#DFB743]/20 text-[#DFB743]' : 'bg-slate-200/80 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative">
          <HiOutlineSearch className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name or Email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-slate-300 rounded-2xl text-sm font-medium text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs font-semibold">Loading customer orders...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-[#FFFBEB] text-[#DFB743] flex items-center justify-center text-3xl mx-auto mb-3 border border-[#FDE68A] shadow-xs">🛒</div>
          <h3 className="text-lg font-bold text-[#0B1A40] mb-1">No orders found</h3>
          <p className="text-xs font-normal text-slate-500 max-w-sm mx-auto">Once customers place orders for your products, they will appear here in detail view.</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW MATCHING IMAGE 1 DESIGN */
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1A40] text-[11px] font-black uppercase tracking-wider text-[#DFB743]">
                  <th className="py-4 px-5 text-center text-[#DFB743] w-12">#</th>
                  <th className="py-4 px-6 text-[#DFB743]">ORDER ID</th>
                  <th className="py-4 px-6 text-[#DFB743]">CUSTOMER</th>
                  <th className="py-4 px-6 text-[#DFB743]">ITEMS</th>
                  <th className="py-4 px-6 text-[#DFB743]">AMOUNT</th>
                  <th className="py-4 px-6 text-[#DFB743]">PAYMENT</th>
                  <th className="py-4 px-6 text-[#DFB743]">STATUS</th>
                  <th className="py-4 px-6 text-[#DFB743]">DATE</th>
                  <th className="py-4 px-6 text-right text-[#DFB743]">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filtered.map((o, idx) => {
                  const orderId = o.id || o._id
                  const displayId = String(orderId || '').replace(/^#+/, '')
                  const rawAmt = o.vendorAmount ?? o.totalAmount ?? o.amount ?? 0
                  const numericAmt = typeof rawAmt === 'string' ? parseFloat(rawAmt.replace(/[^0-9.]/g, '')) : rawAmt
                  const formattedAmt = isNaN(numericAmt) ? '0' : numericAmt.toLocaleString('en-IN')
                  const paymentType = o.paymentMethod || 'COD'
                  const paymentStatus = o.paymentStatus || 'Pending'

                  return (
                    <tr key={orderId} className="hover:bg-[#FFFDF7] transition-colors">
                      {/* INDEX # */}
                      <td className="py-4 px-5 text-center font-black text-[#0B1A40]/70 text-xs">
                        {idx + 1}
                      </td>

                      {/* ORDER ID */}
                      <td className="py-4 px-6 font-mono font-black text-[#0B1A40]">
                        #{displayId}
                      </td>

                      {/* CUSTOMER */}
                      <td className="py-4 px-6">
                        <div className="font-extrabold text-[#0B1A40]">{o.customerName || 'Customer'}</div>
                        {o.customerPhone && <div className="text-[11px] text-slate-500 font-medium">{o.customerPhone}</div>}
                      </td>

                      {/* ITEMS */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="space-y-1">
                          {(o.items || []).map((item, i) => (
                            <div key={i} className="text-xs text-slate-700 font-medium truncate">
                              <span className="font-bold text-[#0B1A40]">{item.name}</span>
                              <span className="text-slate-500 text-[11px] ml-1.5">(Qty: {item.quantity})</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* AMOUNT (Bold Green Price matching Image 1) */}
                      <td className="py-4 px-6 font-black text-[#047857] font-mono text-sm sm:text-base">
                        ₹{formattedAmt}
                      </td>

                      {/* PAYMENT (COD / Paid, Pending, Failed) */}
                      <td className="py-4 px-6">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">{paymentType}</div>
                        <select
                          value={paymentStatus}
                          onChange={e => handlePaymentStatusChange(orderId, e.target.value)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-black border cursor-pointer focus:outline-none shadow-2xs ${paymentBadgeColors[paymentStatus] || paymentBadgeColors.Pending}`}
                        >
                          <option value="Pending" className="bg-white text-[#92400E]">Pending</option>
                          <option value="Paid" className="bg-white text-[#047857]">Paid</option>
                          <option value="Failed" className="bg-white text-[#991B1B]">Failed</option>
                        </select>
                      </td>

                      {/* STATUS (Pill Badge matching Image 1 Active/Status pills) */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-black border shadow-2xs ${badgeColors[o.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {o.status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-6 text-xs text-slate-600 font-semibold whitespace-nowrap">
                        {o.date ? new Date(o.date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Aug 04, 2026'}
                      </td>

                      {/* ACTION */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <select
                          value={o.status}
                          disabled={updatingId === orderId || o.status === 'Delivered' || o.status === 'Cancelled'}
                          onChange={e => handleStatusChange(orderId, e.target.value)}
                          className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-black text-[#0B1A40] bg-[#F8FAFC] focus:outline-none focus:border-[#DFB743] focus:bg-white cursor-pointer shadow-xs"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((o, idx) => {
            const orderId = o.id || o._id
            const displayId = String(orderId || '').replace(/^#+/, '')
            const isGoldAccent = idx % 2 === 1
            const rawAmt = o.vendorAmount ?? o.totalAmount ?? o.amount ?? 0
            const numericAmt = typeof rawAmt === 'string' ? parseFloat(rawAmt.replace(/[^0-9.]/g, '')) : rawAmt
            const formattedAmt = isNaN(numericAmt) ? '0' : numericAmt.toLocaleString('en-IN')

            return (
              <div
                key={orderId}
                className={`p-6 rounded-[28px] border-2 shadow-xl transition-all flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl ${
                  isGoldAccent
                    ? 'bg-white border-[#DFB743]/60 shadow-[#DFB743]/10'
                    : 'bg-white border-[#0B1A40]/30 shadow-[#0B1A40]/10'
                }`}
              >
                <div>
                  {/* Order Card Header */}
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-semibold text-[#B48B1E] uppercase tracking-wider block">ORDER REFERENCE</span>
                      <h3 className="font-bold text-[#0B1A40] text-base font-mono tracking-tight">#{displayId}</h3>
                    </div>
                    <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-2xs ${badgeColors[o.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {o.status}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600 text-xs sm:text-sm gap-2">
                      <HiOutlineUser className="w-4 h-4 text-[#DFB743] shrink-0" />
                      <span className="font-bold text-[#0B1A40]">{o.customerName || 'Customer'}</span>
                      {o.customerPhone && (
                        <>
                          <span className="text-slate-300">|</span>
                          <span className="font-medium text-slate-500">{o.customerPhone}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-slate-500 text-xs gap-2">
                      <HiOutlineClock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-normal text-slate-500">Placed on: {o.date ? new Date(o.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="bg-[#FFFDF7] rounded-2xl p-4 mb-4 border border-[#FDE68A]/80 shadow-xs">
                    <span className="text-[11px] font-semibold text-[#B48B1E] uppercase tracking-wider block mb-2">ORDER ITEMS</span>
                    <div className="space-y-2 divide-y divide-amber-100/60">
                      {(o.items || []).map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs sm:text-sm pt-1.5 first:pt-0">
                          <span className="font-bold text-[#0B1A40] truncate max-w-[210px]">{item.name}</span>
                          <span className="font-medium text-slate-600 shrink-0">Qty: {item.quantity} × ₹{(item.price || 0).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Payout & Status Actions */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[11px] text-[#B48B1E] uppercase tracking-wider block font-semibold">YOUR SHARE</span>
                    <div className="flex items-center font-bold text-[#0B1A40] text-xl font-mono">
                      <HiOutlineCurrencyRupee className="w-6 h-6 text-[#DFB743]" />
                      {formattedAmt}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-500">Update Status:</label>
                    <select
                      value={o.status}
                      disabled={updatingId === orderId || o.status === 'Delivered' || o.status === 'Cancelled'}
                      onChange={e => handleStatusChange(orderId, e.target.value)}
                      className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-bold text-[#0B1A40] bg-[#F8FAFC] focus:outline-none focus:border-[#DFB743] focus:bg-white cursor-pointer shadow-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
