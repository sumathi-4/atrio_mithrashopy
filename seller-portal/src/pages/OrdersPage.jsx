import React, { useState, useEffect } from 'react'
import { getVendorOrders, updateOrderStatus } from '../services/api'
import { HiOutlineSearch, HiOutlineClock, HiOutlineUser, HiOutlineCurrencyRupee } from 'react-icons/hi'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const badgeColors = {
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  Processing: 'bg-blue-50 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-50 text-purple-800 border-purple-200',
  Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-800 border-rose-200'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)

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
    if (!window.confirm(`Are you sure you want to update the status to ${newStatus}?`)) return
    try {
      setUpdatingId(id)
      await updateOrderStatus(id, newStatus)
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = orders.filter(o => {
    const matchSearch =
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase())

    const matchTab = activeTab === 'All' || o.status === activeTab
    return matchSearch && matchTab
  })

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">Orders</h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Manage and track your customer orders and dispatch status.</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Filter and Search controls */}
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex gap-2 flex-wrap border-b border-slate-100 pb-3">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#051838] text-[#DFB743] shadow-md shadow-[#051838]/20'
                  : 'text-slate-500 hover:text-[#0B1A40] hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <HiOutlineSearch className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-semibold text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs font-bold">Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto mb-3 border border-blue-100">🛒</div>
          <h3 className="text-lg font-black text-[#0B1A40] mb-1">No orders found</h3>
          <p className="text-xs font-semibold text-slate-400 max-w-sm mx-auto">Once customers purchase your products, they will appear here with detail cards.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(o => (
            <div key={o.id} className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between hover:shadow-2xl transition-all">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Order ID</span>
                    <h3 className="font-black text-[#0B1A40] text-sm">#{o.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${badgeColors[o.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {o.status}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-slate-500 text-xs gap-2">
                    <HiOutlineUser className="w-4 h-4 text-[#DFB743]" />
                    <span className="font-bold text-[#0B1A40]">{o.customerName || 'Anonymous Customer'}</span>
                    <span className="text-slate-300">|</span>
                    <span className="font-medium text-slate-500">{o.customerPhone || 'No Phone'}</span>
                  </div>
                  <div className="flex items-center text-slate-500 text-xs gap-2">
                    <HiOutlineClock className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-400">Ordered: {o.date ? new Date(o.date).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Unknown'}</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-slate-50/70 rounded-2xl p-4 mb-4 border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Order Items</span>
                  <div className="space-y-1.5">
                    {(o.items || []).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#0B1A40] truncate max-w-[200px]">{item.name}</span>
                        <span className="font-semibold text-slate-500">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-black">Your Share</span>
                  <div className="flex items-center font-black text-[#0B1A40] text-lg">
                    <HiOutlineCurrencyRupee className="w-5 h-5 text-[#DFB743]" />
                    {o.vendorAmount?.toLocaleString('en-IN') || o.totalAmount?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-400">Status:</label>
                  <select
                    value={o.status}
                    disabled={updatingId === o.id || o.status === 'Delivered' || o.status === 'Cancelled'}
                    onChange={e => handleStatusChange(o.id, e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-black text-[#0B1A40] bg-white focus:outline-none focus:border-[#DFB743] cursor-pointer"
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
          ))}
        </div>
      )}
    </div>
  )
}
