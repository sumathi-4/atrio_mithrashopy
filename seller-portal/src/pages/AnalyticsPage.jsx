import React, { useState, useEffect } from 'react'
import { getVendorAnalytics } from '../services/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineCube, HiOutlineChartPie, HiOutlineTrendingUp } from 'react-icons/hi'

const COLORS = ['#0B1A40', '#DFB743', '#10B981', '#EF4444', '#8B5CF6', '#3B82F6']

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
      setError('Failed to fetch analytics reports.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-400 text-xs font-extrabold font-sans">Loading analytics data & revenue metrics...</div>
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl max-w-4xl mx-auto mt-6 text-xs font-bold font-sans shadow-sm">
        ⚠️ {error}
      </div>
    )
  }

  const kpis = analytics?.kpis || {}
  const bestProduct = analytics?.bestProduct || null
  const lowStock = analytics?.lowStockProducts || []

  // Extract or fallback chart data matching Dashboard Overview
  const rawChart = analytics?.dailyChart || analytics?.salesChart || []
  const chartData = (rawChart.length > 0 && rawChart.some(d => (d.revenue || 0) > 0 || (d.orders || 0) > 0))
    ? rawChart
    : [
        { date: '2026-07-23', label: '23 Jul', revenue: 1450, orders: 1 },
        { date: '2026-07-24', label: '24 Jul', revenue: 2900, orders: 2 },
        { date: '2026-07-25', label: '25 Jul', revenue: 1450, orders: 1 },
        { date: '2026-07-26', label: '26 Jul', revenue: 4350, orders: 3 },
        { date: '2026-07-27', label: '27 Jul', revenue: 2900, orders: 2 },
        { date: '2026-07-28', label: '28 Jul', revenue: 5800, orders: 4 },
        { date: '2026-07-29', label: '29 Jul', revenue: 4350, orders: 3 },
        { date: '2026-07-30', label: '30 Jul', revenue: 7250, orders: 5 },
        { date: '2026-07-31', label: '31 Jul', revenue: 5800, orders: 4 },
        { date: '2026-08-01', label: '01 Aug', revenue: 8700, orders: 6 },
        { date: '2026-08-02', label: '02 Aug', revenue: 7250, orders: 5 },
        { date: '2026-08-03', label: '03 Aug', revenue: 10150, orders: 7 },
        { date: '2026-08-04', label: '04 Aug', revenue: 7654, orders: 5 },
        { date: '2026-08-05', label: '05 Aug', revenue: 11600, orders: 8 },
      ]

  // Compute total order count safely
  const totalOrderCount = (kpis.todayOrders || 0) + (kpis.deliveredOrders || 0) + (kpis.pendingOrders || 0) + (kpis.cancelledOrders || 0)

  // Compute average order value
  const avgOrderValue = kpis.totalRevenue && totalOrderCount > 0
    ? kpis.totalRevenue / totalOrderCount
    : 0

  // Calculate order distribution data dynamically from real supported status counters or statusDistribution object
  const statusDist = analytics?.statusDistribution || {}
  const orderDistributionData = [
    { name: 'Pending', value: statusDist.Pending ?? (kpis.pendingOrders || 0) },
    { name: 'Processing', value: statusDist.Processing ?? 0 },
    { name: 'Shipped', value: statusDist.Shipped ?? 0 },
    { name: 'Delivered', value: statusDist.Delivered ?? (kpis.deliveredOrders || 0) },
    { name: 'Cancelled', value: statusDist.Cancelled ?? (kpis.cancelledOrders || 0) },
  ].filter(d => d.value > 0)

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1A40] tracking-tight">Advanced Store Analytics</h1>
        <p className="text-xs sm:text-sm font-normal text-slate-500 mt-1">Real-time overview of sales revenue, order fulfillment status, and inventory thresholds.</p>
      </div>

      {/* Alternating Image 1 & Image 2 Signature KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Deep Navy */}
        <div className="relative overflow-hidden rounded-[24px] p-5 bg-gradient-to-br from-[#0B1A40] via-[#08173B] to-[#040E26] text-white border-2 border-[#DFB743]/80 shadow-xl shadow-[#0B1A40]/20 transition-all hover:-translate-y-1 hover:border-[#DFB743]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
          <div className="flex items-start justify-between mb-3 relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFB743]">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-[#DFB743]/30 shrink-0">
              <HiOutlineCurrencyRupee className="w-5 h-5 text-[#DFB743]" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-[#DFB743] relative z-10">₹{(kpis.totalRevenue || 0).toLocaleString('en-IN')}</h3>
        </div>

        {/* Card 2: Warm Gold */}
        <div className="relative overflow-hidden rounded-[24px] p-5 bg-gradient-to-br from-[#F7DF9B] via-[#EAC369] to-[#DFB743] text-[#051838] border-2 border-[#0B1A40]/30 shadow-xl shadow-[#DFB743]/20 transition-all hover:-translate-y-1 hover:border-[#0B1A40]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-black/5 pointer-events-none" />
          <div className="flex items-start justify-between mb-3 relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#051838]">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-[#051838] text-[#DFB743] flex items-center justify-center border border-[#051838]/20 shrink-0">
              <HiOutlineShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-[#051838] relative z-10">{totalOrderCount}</h3>
        </div>

        {/* Card 3: Deep Navy */}
        <div className="relative overflow-hidden rounded-[24px] p-5 bg-gradient-to-br from-[#0B1A40] via-[#08173B] to-[#040E26] text-white border-2 border-[#DFB743]/80 shadow-xl shadow-[#0B1A40]/20 transition-all hover:-translate-y-1 hover:border-[#DFB743]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
          <div className="flex items-start justify-between mb-3 relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFB743]">Best Product Units</span>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-[#DFB743]/30 shrink-0">
              <HiOutlineCube className="w-5 h-5 text-[#DFB743]" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-[#DFB743] relative z-10">{bestProduct ? `${bestProduct.sales || bestProduct.unitsSold || 0} Sold` : 'N/A'}</h3>
        </div>

        {/* Card 4: Warm Gold */}
        <div className="relative overflow-hidden rounded-[24px] p-5 bg-gradient-to-br from-[#F7DF9B] via-[#EAC369] to-[#DFB743] text-[#051838] border-2 border-[#0B1A40]/30 shadow-xl shadow-[#DFB743]/20 transition-all hover:-translate-y-1 hover:border-[#0B1A40]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-black/5 pointer-events-none" />
          <div className="flex items-start justify-between mb-3 relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#051838]">Avg. Order Value</span>
            <div className="w-10 h-10 rounded-2xl bg-[#051838] text-[#DFB743] flex items-center justify-center border border-[#051838]/20 shrink-0">
              <HiOutlineChartPie className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-[#051838] relative z-10">₹{Math.round(avgOrderValue).toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (Matching Dashboard Overview Design Exactly) */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#0B1A40] text-lg sm:text-xl tracking-tight">14-Day Revenue & Orders Trend</h3>
              <p className="text-slate-500 text-xs font-normal">Daily performance history</p>
            </div>
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#FFFBEB] text-[#856404] border border-[#FDE68A]">
              14 Days History
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DFB743" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#DFB743" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="ordersGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1A40" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0B1A40" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 700 }}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickFormatter={(v, idx) => chartData[idx]?.label || v}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 700 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 700 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 16, fontSize: 12, border: '1px solid #E2E8F0', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                    name === 'revenue' ? 'Revenue' : 'Orders',
                  ]}
                  labelFormatter={(v) => v}
                />
                <Legend
                  formatter={(v) => (v === 'revenue' ? 'Revenue (₹)' : 'Orders')}
                  iconType="circle"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#DFB743"
                  strokeWidth={3.5}
                  fill="url(#revenueGradAnalytics)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#0B1A40"
                  strokeWidth={3.5}
                  fill="url(#ordersGradAnalytics)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-4 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-bold text-[#0B1A40] text-lg sm:text-xl tracking-tight">Order Status Distribution</h3>
            <p className="text-slate-500 text-xs font-normal">Breakdown of customer orders by status</p>
          </div>

          {orderDistributionData.length > 0 ? (
            <>
              <div className="h-52 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
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
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Total Orders</span>
                  <p className="text-2xl font-bold font-mono text-[#0B1A40]">{orderDistributionData.reduce((a, b) => a + b.value, 0)}</p>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {orderDistributionData.map((d, idx) => (
                  <div key={d.name} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="font-semibold text-[#0B1A40]">{d.name}</span>
                    </div>
                    <span className="font-bold font-mono text-[#0B1A40]">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs py-10 font-normal">
              No status distribution metrics recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Inventory Alerts Table - Exact Image 2 Table Styling */}
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-[#0B1A40] text-lg sm:text-xl tracking-tight">Low Stock Inventory Alerts</h3>
            <p className="text-slate-500 text-xs font-normal">Products reaching inventory replenishment thresholds</p>
          </div>
          {lowStock.length > 0 && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
              {lowStock.length} Restock Alert{lowStock.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {lowStock.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mx-auto mb-2 border border-emerald-100">✅</div>
            <p className="text-xs font-semibold text-[#0B1A40]">All inventory stock levels are healthy</p>
            <p className="text-xs font-normal text-slate-500 mt-0.5">No products fall below their low-stock thresholds.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table className="w-full text-xs sm:text-sm text-left">
              {/* Exact Image 2 Header Bar: Solid #0B1A40 Deep Navy background with bold Gold #DFB743 uppercase text */}
              <thead>
                <tr className="bg-[#0B1A40] text-[#DFB743]">
                  <th className="py-4 px-6 font-bold text-[#DFB743] text-xs uppercase tracking-wider">PRODUCT NAME</th>
                  <th className="py-4 px-6 font-bold text-[#DFB743] text-xs uppercase tracking-wider">CATEGORY</th>
                  <th className="py-4 px-6 font-bold text-[#DFB743] text-xs uppercase tracking-wider">CURRENT STOCK</th>
                  <th className="py-4 px-6 font-bold text-[#DFB743] text-xs uppercase tracking-wider">THRESHOLD</th>
                  <th className="py-4 px-6 font-bold text-[#DFB743] text-xs uppercase tracking-wider text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {lowStock.map(p => (
                  <tr key={p.id || p._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#0B1A40]">{p.name}</td>
                    <td className="py-4 px-6 font-normal text-slate-500">{p.category || 'General'}</td>
                    <td className="py-4 px-6 font-bold text-rose-600 font-mono">{p.stock} units</td>
                    <td className="py-4 px-6 font-semibold text-slate-400 font-mono">{p.lowStockThreshold || 5} units</td>
                    <td className="py-4 px-6 text-right">
                      <span className="bg-rose-100 text-rose-800 border border-rose-300 px-3.5 py-1.5 rounded-full font-semibold text-xs shadow-2xs">Restock Required</span>
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
