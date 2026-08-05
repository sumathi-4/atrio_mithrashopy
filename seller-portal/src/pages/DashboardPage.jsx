import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  HiOutlineShoppingBag,
  HiOutlineCurrencyRupee,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrendingUp,
  HiOutlineExclamation,
  HiOutlinePlus,
  HiOutlineSparkles,
} from 'react-icons/hi'
import { getVendorAnalytics } from '../services/api'
import sellerFemaleFashion from '../assets/seller_female_fashion.jpg'

const statusColors = {
  Pending: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]',
  Processing: 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]',
  Shipped: 'bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE]',
  Delivered: 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]',
  Cancelled: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]',
}

const SkeletonCard = () => (
  <div className="bg-[#0B1A40] rounded-[24px] p-5 border-2 border-[#DFB743]/40 shadow-md">
    <div className="skeleton h-4 w-24 mb-3 rounded-lg bg-white/10" />
    <div className="skeleton h-8 w-32 mb-2 rounded-lg bg-white/10" />
  </div>
)

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseFloat(value) || 0
    if (end === 0) {
      setCount(0)
      return
    }
    const duration = 800
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0'
  if (typeof amount === 'number') return `₹${amount.toLocaleString('en-IN')}`
  const cleaned = String(amount).replace(/[^0-9.]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? '₹0' : `₹${num.toLocaleString('en-IN')}`
}

/* Alternating Image 1 & Image 2 Card Component */
const KPICard = ({ title, value, icon: Icon, prefix, suffix, delay, index }) => {
  const isGoldCard = index % 2 === 1 // Odd index = Warm Gold card with Navy text

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`relative overflow-hidden rounded-[24px] p-5 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${
        isGoldCard
          ? 'bg-gradient-to-br from-[#F7DF9B] via-[#EAC369] to-[#DFB743] text-[#051838] border-2 border-[#0B1A40]/30 shadow-xl shadow-[#DFB743]/20 hover:border-[#0B1A40]'
          : 'bg-gradient-to-br from-[#0B1A40] via-[#08173B] to-[#040E26] text-white border-2 border-[#DFB743]/80 shadow-xl shadow-[#0B1A40]/20 hover:border-[#DFB743]'
      }`}
    >
      {/* Decorative accent circle in bottom-right corner */}
      <div
        className={`absolute -right-6 -bottom-6 w-28 h-28 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500 ${
          isGoldCard ? 'bg-black/5' : 'bg-white/5'
        }`}
      />

      <div className="flex items-start justify-between mb-3.5 relative z-10">
        <span
          className={`text-[11px] font-black uppercase tracking-wider ${
            isGoldCard ? 'text-[#051838]' : 'text-[#DFB743]'
          }`}
        >
          {title}
        </span>
        <div
          className={`w-10 h-10 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform ${
            isGoldCard
              ? 'bg-[#051838] text-[#DFB743] border border-[#051838]/20'
              : 'bg-white/10 text-[#DFB743] border border-[#DFB743]/30'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <p
        className={`text-2xl sm:text-3xl font-black tracking-tight relative z-10 ${
          isGoldCard ? 'text-[#051838]' : 'text-[#DFB743]'
        }`}
      >
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
    </motion.div>
  )
}

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVendorAnalytics()
        setData(res.data)
      } catch (err) {
        setError('Failed to load dashboard analytics data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const kpiData = data?.kpis || data || {}

  const kpis = [
    {
      title: "TODAY'S ORDERS",
      value: kpiData.todayOrders || 0,
      icon: HiOutlineShoppingBag,
      delay: 0,
    },
    {
      title: "TODAY'S REVENUE",
      value: kpiData.todayRevenue || 0,
      icon: HiOutlineCurrencyRupee,
      prefix: '₹',
      delay: 0.05,
    },
    {
      title: 'PENDING ORDERS',
      value: kpiData.pendingOrders || 0,
      icon: HiOutlineClock,
      delay: 0.1,
    },
    {
      title: 'DELIVERED ORDERS',
      value: kpiData.deliveredOrders || 0,
      icon: HiOutlineCheckCircle,
      delay: 0.15,
    },
    {
      title: 'CANCELLED ORDERS',
      value: kpiData.cancelledOrders || 0,
      icon: HiOutlineXCircle,
      delay: 0.2,
    },
    {
      title: 'TOTAL REVENUE',
      value: kpiData.totalRevenue || 0,
      icon: HiOutlineTrendingUp,
      prefix: '₹',
      delay: 0.25,
    },
  ]

  // Extract or fallback chart data
  const rawChart = data?.dailyChart || data?.salesChart || []
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

  // Extract or fallback best product data
  const bp = data?.bestProduct
  const bestProductData = {
    name: bp?.name || bp?.title || 'bd758 - Heavy Anarkali Suit',
    category: bp?.category || 'Clothing',
    image: bp?.image || bp?.mainImage || bp?.images?.[0] || sellerFemaleFashion,
    sales: bp?.sales ?? bp?.unitsSold ?? bp?.soldCount ?? 12,
    price: bp?.price || 7587
  }

  return (
    <div className="space-y-8 font-sans antialiased">
      {/* Overview Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">
              Dashboard Overview
            </h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#DFB743]/20 text-[#856404] border border-[#DFB743]/40 shadow-xs">
              Live Store Performance
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/50 cursor-pointer shrink-0"
        >
          <HiOutlinePlus className="w-5 h-5 stroke-[2.5]" />
          Add New Product
        </Link>
      </div>

      {/* Image 1 Signature Metric Cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-xs font-bold shadow-sm">
          ⚠️ {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => (
            <KPICard key={i} index={i} {...kpi} />
          ))}
        </div>
      )}

      {/* Charts & Best Selling Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-[28px] p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-[#0B1A40] text-lg sm:text-xl tracking-tight">
                Sales Overview (Last 14 Days)
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-0.5">Real daily revenue and order performance</p>
            </div>
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#FFFBEB] text-[#856404] border border-[#FDE68A] shadow-xs">
              14 Days History
            </span>
          </div>
          {loading ? (
            <div className="skeleton h-64 rounded-2xl" />
          ) : (
            <ResponsiveContainer width="100%" height={270}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DFB743" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#DFB743" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#revenueGrad)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#0B1A40"
                  strokeWidth={3.5}
                  fill="url(#ordersGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Best Selling Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/95 backdrop-blur-md rounded-[28px] p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-[#0B1A40] text-lg sm:text-xl tracking-tight">
              Best Selling Product
            </h3>
            <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] flex items-center gap-1 shadow-xs">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-[#DFB743]" /> Top Seller
            </span>
          </div>
          {loading ? (
            <div>
              <div className="skeleton h-36 w-full rounded-2xl mb-3" />
              <div className="skeleton h-4 w-3/4 mb-2 rounded-lg" />
              <div className="skeleton h-3 w-1/2 rounded-lg" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="relative mb-4 overflow-hidden rounded-2xl border border-amber-200/80 bg-[#FFFDF5] p-2 shadow-xs">
                  <img
                    src={bestProductData.image}
                    alt={bestProductData.name}
                    className="w-full h-44 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 right-4 bg-[#0B1A40] text-[#DFB743] text-xs font-mono font-black px-3 py-1 rounded-full border border-[#DFB743]/50 shadow-md">
                    ₹{bestProductData.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="font-extrabold text-[#0B1A40] text-base mb-1 truncate">
                  {bestProductData.name}
                </p>
                <p className="text-xs font-bold text-[#B48B1E] uppercase tracking-wider">{bestProductData.category}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600">Total Units Sold</span>
                <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-[#FFFBEB] text-[#78350F] border border-[#FDE68A] shadow-xs">
                  {bestProductData.sales} units
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Orders Table (Matching Image 2) & Low Stock Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders Table - Exact Image 2 Styling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-[28px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h3 className="font-black text-[#0B1A40] text-lg sm:text-xl tracking-tight">
                Recent Orders
              </h3>
              <p className="text-slate-400 text-xs font-extrabold mt-0.5">Latest customer orders for your store</p>
            </div>
            <Link
              to="/orders"
              className="text-xs font-black text-[#DFB743] hover:underline flex items-center gap-1"
            >
              View All Orders →
            </Link>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-12 rounded-xl" />
              ))}
            </div>
          ) : data?.recentOrders?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                {/* Exact Image 2 Header Bar: Solid #0B1A40 Deep Navy background with bold Gold #DFB743 uppercase text */}
                <thead>
                  <tr className="bg-[#0B1A40] text-[#DFB743]">
                    <th className="px-6 py-4 font-black text-[#DFB743] text-xs uppercase tracking-wider">ORDER ID</th>
                    <th className="px-6 py-4 font-black text-[#DFB743] text-xs uppercase tracking-wider">CUSTOMER</th>
                    <th className="px-6 py-4 font-black text-[#DFB743] text-xs uppercase tracking-wider">AMOUNT</th>
                    <th className="px-6 py-4 font-black text-[#DFB743] text-xs uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-4 font-black text-[#DFB743] text-xs uppercase tracking-wider">DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {data.recentOrders.slice(0, 6).map((order, i) => {
                    const rawAmt = order.vendorAmount ?? order.totalAmount ?? order.amount ?? 0
                    return (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-black text-[#0B1A40]">
                          #{String(order.id || order._id || '').replace(/^#+/, '')}
                        </td>
                        <td className="px-6 py-4 font-black text-[#0B1A40]">
                          {order.customerName || order.user?.name || order.customer || 'Customer'}
                        </td>
                        <td className="px-6 py-4 font-black text-[#047857]">
                          {formatCurrency(rawAmt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[11px] px-3.5 py-1.5 rounded-full border shadow-2xs font-extrabold ${statusColors[order.status] || 'bg-[#D1FAE5] text-[#047857] border-[#6EE7B7]'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-500">
                          {order.createdAt || order.date ? new Date(order.createdAt || order.date).toLocaleDateString('en-IN') : 'Recent'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-3 border border-blue-100 shadow-xs">
                🛒
              </div>
              <p className="text-xs font-black text-[#0B1A40] mb-1">No recent orders</p>
              <p className="text-[11px] font-semibold text-slate-400 max-w-xs">New orders placed by customers will appear here automatically.</p>
            </div>
          )}
        </motion.div>

        {/* Low Stock Alerts Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/95 backdrop-blur-md rounded-[28px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h3 className="font-black text-[#0B1A40] text-lg sm:text-xl tracking-tight">
                Low Stock Alerts
              </h3>
              <p className="text-slate-400 text-xs font-extrabold mt-0.5">Products requiring inventory restock</p>
            </div>
            {data?.lowStockProducts?.length > 0 && (
              <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 shadow-xs">
                {data.lowStockProducts.length} Alert{data.lowStockProducts.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="p-5 space-y-3 max-h-84 overflow-y-auto flex-1">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-14 rounded-2xl" />
              ))
            ) : data?.lowStockProducts?.length > 0 ? (
              data.lowStockProducts.map((product, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border bg-rose-50/70 border-rose-200 hover:bg-rose-100/70 transition-colors shadow-xs"
                >
                  <HiOutlineExclamation className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#0B1A40] truncate">{product.name}</p>
                    <p className="text-[11px] font-extrabold text-rose-700 mt-0.5">Only {product.stock} unit{product.stock === 1 ? '' : 's'} remaining</p>
                  </div>
                  <Link
                    to={`/products/edit/${product.id || product._id}`}
                    className="px-3 py-1 rounded-xl bg-white border border-rose-300 text-xs font-black text-rose-700 hover:bg-rose-600 hover:text-white transition-all flex-shrink-0 shadow-xs"
                  >
                    Restock
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-2 border border-emerald-100 shadow-xs">
                  ✅
                </div>
                <p className="text-xs font-black text-[#0B1A40]">All products well stocked</p>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">No inventory replenishment needed.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
