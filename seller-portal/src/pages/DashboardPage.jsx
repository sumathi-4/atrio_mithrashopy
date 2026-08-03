import React, { useEffect, useState, useRef } from 'react'
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

const statusColors = {
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  Processing: 'bg-blue-50 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-50 text-purple-800 border-purple-200',
  Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
}

const SkeletonCard = () => (
  <div className="bg-white rounded-[24px] p-5 shadow-md border border-slate-100">
    <div className="skeleton h-4 w-24 mb-3 rounded-lg" />
    <div className="skeleton h-8 w-32 mb-2 rounded-lg" />
    <div className="skeleton h-3 w-16 rounded-lg" />
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
    const duration = 1000
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

const KPICard = ({ title, value, icon: Icon, bgColor, textColor, prefix, suffix, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/95 backdrop-blur-md rounded-[24px] p-5 shadow-xl shadow-slate-200/60 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{title}</p>
      </div>
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-5 h-5" style={{ color: textColor }} />
      </div>
    </div>
    <p className="text-2xl font-black text-[#0B1A40] tracking-tight">
      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
    </p>
  </motion.div>
)

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
        setError('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const kpis = data
    ? [
        {
          title: "Today's Orders",
          value: data.todayOrders || 0,
          icon: HiOutlineShoppingBag,
          bgColor: '#eff6ff',
          textColor: '#2563eb',
          delay: 0,
        },
        {
          title: "Today's Revenue",
          value: data.todayRevenue || 0,
          icon: HiOutlineCurrencyRupee,
          bgColor: '#fffbeb',
          textColor: '#d97706',
          prefix: '₹',
          delay: 0.05,
        },
        {
          title: 'Pending Orders',
          value: data.pendingOrders || 0,
          icon: HiOutlineClock,
          bgColor: '#fef3c7',
          textColor: '#d97706',
          delay: 0.1,
        },
        {
          title: 'Delivered Orders',
          value: data.deliveredOrders || 0,
          icon: HiOutlineCheckCircle,
          bgColor: '#ecfdf5',
          textColor: '#059669',
          delay: 0.15,
        },
        {
          title: 'Cancelled Orders',
          value: data.cancelledOrders || 0,
          icon: HiOutlineXCircle,
          bgColor: '#fff1f2',
          textColor: '#e11d48',
          delay: 0.2,
        },
        {
          title: 'Total Revenue',
          value: data.totalRevenue || 0,
          icon: HiOutlineTrendingUp,
          bgColor: '#f0f9ff',
          textColor: '#0284c7',
          prefix: '₹',
          delay: 0.25,
        },
      ]
    : []

  return (
    <div className="space-y-8 font-sans antialiased">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">
            Overview
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/40 cursor-pointer"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* KPI Metric Cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-semibold">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => (
            <KPICard key={i} {...kpi} />
          ))}
        </div>
      )}

      {/* Charts & Best Selling Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-[28px] p-6 shadow-2xl shadow-slate-200/60 border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">
                Sales Overview (Last 14 Days)
              </h3>
              <p className="text-slate-400 text-xs font-medium">Daily revenue and order performance</p>
            </div>
          </div>
          {loading ? (
            <div className="skeleton h-56 rounded-2xl" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data?.salesChart || []}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DFB743" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#DFB743" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1A40" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0B1A40" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                  tickFormatter={(v) => {
                    const d = new Date(v)
                    return `${d.getDate()}/${d.getMonth() + 1}`
                  }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                  tickFormatter={(v) => `₹${v}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 16, fontSize: 12, border: '1px solid #f1f5f9', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString('en-IN')}` : value,
                    name === 'revenue' ? 'Revenue' : 'Orders',
                  ]}
                  labelFormatter={(v) => new Date(v).toLocaleDateString('en-IN')}
                />
                <Legend
                  formatter={(v) => (v === 'revenue' ? 'Revenue' : 'Orders')}
                  iconType="circle"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#DFB743"
                  strokeWidth={3}
                  fill="url(#revenueGrad)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#0B1A40"
                  strokeWidth={3}
                  fill="url(#ordersGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Best Selling Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/95 backdrop-blur-md rounded-[28px] p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col"
        >
          <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight mb-4">
            Best Selling Product
          </h3>
          {loading ? (
            <div>
              <div className="skeleton h-36 w-full rounded-2xl mb-3" />
              <div className="skeleton h-4 w-3/4 mb-2 rounded-lg" />
              <div className="skeleton h-3 w-1/2 rounded-lg" />
            </div>
          ) : data?.bestProduct ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-100">
                  {data.bestProduct.mainImage ? (
                    <img
                      src={data.bestProduct.mainImage}
                      alt={data.bestProduct.name}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center text-4xl">
                      📦
                    </div>
                  )}
                  <span className="absolute top-3 right-3 text-[11px] font-black px-3 py-1 rounded-full bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-[#051838] shadow-md border border-[#DFB743]/40 flex items-center gap-1">
                    <HiOutlineSparkles className="w-3.5 h-3.5" /> Best Seller
                  </span>
                </div>
                <p className="font-black text-[#0B1A40] text-sm mb-1 truncate">
                  {data.bestProduct.name}
                </p>
                <p className="text-xs font-semibold text-slate-400">{data.bestProduct.category}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">Units Sold</span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-50 text-[#D4AF37] border border-amber-200">
                  {data.bestProduct.unitsSold || 0} units
                </span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#DFB743] flex items-center justify-center text-2xl mb-3 border border-amber-200">
                📦
              </div>
              <p className="text-xs font-bold text-slate-400">No sales yet.</p>
              <Link
                to="/products/add"
                className="mt-3 text-xs font-black text-[#DFB743] hover:underline flex items-center gap-1"
              >
                + Add your first product
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Orders & Low Stock Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-[28px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">
              Recent Orders
            </h3>
            <Link
              to="/orders"
              className="text-xs font-black text-[#DFB743] hover:underline"
            >
              View All →
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
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-3.5 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3.5 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3.5 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3.5 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentOrders.slice(0, 6).map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600">
                        #{order._id?.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#0B1A40]">
                        {order.user?.name || order.customerName || 'Customer'}
                      </td>
                      <td className="px-6 py-4 font-black text-[#0B1A40]">
                        ₹{order.totalAmount?.toLocaleString('en-IN') || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${statusColors[order.status] || 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-3 border border-blue-100">
                🛒
              </div>
              <p className="text-xs font-bold text-slate-400">No orders yet.</p>
            </div>
          )}
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/95 backdrop-blur-md rounded-[28px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-black text-[#0B1A40] text-base sm:text-lg tracking-tight">
              Low Stock Alerts
            </h3>
            {data?.lowStockProducts?.length > 0 && (
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                {data.lowStockProducts.length}
              </span>
            )}
          </div>
          <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-14 rounded-2xl" />
              ))
            ) : data?.lowStockProducts?.length > 0 ? (
              data.lowStockProducts.map((product, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border bg-amber-50/60 border-amber-200/80"
                >
                  <HiOutlineExclamation className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#0B1A40] truncate">{product.name}</p>
                    <p className="text-[11px] font-bold text-amber-700">Only {product.stock} left</p>
                  </div>
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="text-xs font-black text-[#DFB743] hover:underline flex-shrink-0"
                  >
                    Update
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-2 border border-emerald-100">
                  ✅
                </div>
                <p className="text-xs font-bold text-slate-400">All products well stocked!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
