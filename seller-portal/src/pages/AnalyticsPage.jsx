import React, { useState, useEffect } from 'react'
import { getVendorAnalytics } from '../services/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineCube, HiOutlineChartPie } from 'react-icons/hi'

const COLORS = ['#0B1A40', '#DFB743', '#10b981', '#ef4444', '#6366f1']

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    try {
      setLoading(true)
      setError(null)
      const res = await getVendorAnalytics()
      setAnalytics(res.data)
    } catch (err) {
      setError('Failed to fetch analytics.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-400 text-xs font-bold font-sans">Loading analytics reports...</div>
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl max-w-4xl mx-auto mt-6 text-xs font-bold font-sans">
        ⚠️ {error}
      </div>
    )
  }

  const kpis = analytics?.kpis || {}
  const bestProduct = analytics?.bestProduct || null
  const dailyChart = analytics?.dailyChart || []
  const lowStock = analytics?.lowStockProducts || []

  // Compute average order value
  const avgOrderValue = kpis.totalRevenue && kpis.todayOrders + kpis.deliveredOrders + kpis.pendingOrders > 0
    ? kpis.totalRevenue / (kpis.todayOrders + kpis.deliveredOrders + kpis.pendingOrders)
    : 0

  // Calculate order distribution mock / estimate
  const orderDistributionData = [
    { name: 'Pending & Processing', value: kpis.pendingOrders || 0 },
    { name: 'Delivered', value: kpis.deliveredOrders || 0 },
    { name: 'Cancelled', value: kpis.cancelledOrders || 0 },
  ].filter(d => d.value > 0)

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">Advanced Analytics</h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Real-time overview of sales performance, inventory alerts and logistics metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/95 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 text-xl font-bold shadow-xs">
            <HiOutlineCurrencyRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Revenue</span>
            <h3 className="text-xl font-black text-[#0B1A40]">₹{kpis.totalRevenue?.toLocaleString('en-IN') || 0}</h3>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50 text-[#DFB743] text-xl font-bold shadow-xs">
            <HiOutlineShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Orders</span>
            <h3 className="text-xl font-black text-[#0B1A40]">
              {kpis.todayOrders + kpis.deliveredOrders + kpis.pendingOrders || 0}
            </h3>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 text-xl font-bold shadow-xs">
            <HiOutlineCube className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Best Product Units</span>
            <h3 className="text-xl font-black text-[#0B1A40]">{bestProduct ? `${bestProduct.sales} Sold` : 'N/A'}</h3>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-50 text-purple-600 text-xl font-bold shadow-xs">
            <HiOutlineChartPie className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Avg. Order Value</span>
            <h3 className="text-xl font-black text-[#0B1A40]">₹{Math.round(avgOrderValue).toLocaleString('en-IN')}</h3>
          </div>
        </div>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 lg:col-span-2 space-y-4">
          <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">14-Day Revenue & Orders Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyChart}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DFB743" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#DFB743" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                <Tooltip contentStyle={{ borderRadius: 16, fontSize: 12, border: '1px solid #f1f5f9', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#DFB743" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#0B1A40" fill="none" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-4 flex flex-col justify-between">
          <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">Order Status Distribution</h3>
          {orderDistributionData.length > 0 ? (
            <>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {orderDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 16, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <span className="text-[10px] uppercase font-black text-slate-400">Total Statuses</span>
                  <p className="text-2xl font-black text-[#0B1A40]">{orderDistributionData.reduce((a, b) => a + b.value, 0)}</p>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {orderDistributionData.map((d, idx) => (
                  <div key={d.name} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="font-bold text-[#0B1A40]">{d.name}</span>
                    </div>
                    <span className="font-black text-[#0B1A40]">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs py-10 font-bold">
              No status distribution metrics available yet.
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Inventory Alerts */}
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-4">
        <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">Low Stock Inventory Alerts</h3>
        {lowStock.length === 0 ? (
          <p className="text-xs font-bold text-slate-400 py-3">All inventory stock levels are well above their thresholds.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-black">
                  <th className="py-3">Product</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Current Stock</th>
                  <th className="py-3">Threshold</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStock.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 font-black text-[#0B1A40]">{p.name}</td>
                    <td className="py-4 font-semibold text-slate-500">{p.category}</td>
                    <td className="py-4 font-black text-rose-600">{p.stock} units</td>
                    <td className="py-4 font-bold text-slate-400">{p.lowStockThreshold || 5}</td>
                    <td className="py-4">
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-black text-[10px]">Restock Required</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
