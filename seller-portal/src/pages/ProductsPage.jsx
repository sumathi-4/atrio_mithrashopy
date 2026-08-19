import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getVendorProducts, deleteVendorProduct } from '../services/api'
import { HiOutlinePlus, HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiOutlineCube, HiOutlineTag } from 'react-icons/hi'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await getVendorProducts()
      setProducts(res.data?.products || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await deleteVendorProduct(id)
      setProducts(p => p.filter(x => (x.id || x._id) !== id))
    } catch (err) {
      alert('Failed to delete product.')
    }
  }

  const filtered = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (p.category || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const statusColor = s => {
    if (s === 'Active') return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    if (s === 'Rejected') return 'bg-rose-50 text-rose-800 border-rose-200'
    return 'bg-amber-50 text-amber-800 border-amber-200'
  }

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1A40] tracking-tight">My Products Inventory</h1>
          <p className="text-xs sm:text-sm font-normal text-slate-500 mt-1">Manage product listings, pricing, inventory stock and approval statuses.</p>
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/40 cursor-pointer shrink-0"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-3 flex-wrap items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <HiOutlineSearch className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by product name or category..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-medium text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 hidden sm:block">Status Filter:</label>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] cursor-pointer shadow-xs"
          >
            {['All', 'Pending', 'Active', 'Rejected'].map(s => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs font-medium">Loading product catalog...</div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#DFB743] flex items-center justify-center text-3xl mx-auto mb-3 border border-amber-200/80 shadow-xs">📦</div>
          <h3 className="text-lg font-extrabold text-[#0B1A40] mb-1">No products found</h3>
          <p className="text-xs font-normal text-slate-500 mb-5 max-w-xs mx-auto">Add your first product listing to display your products on the MithraShopy store</p>
          <Link
            to="/products/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-semibold text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:scale-[1.02] transition-all cursor-pointer"
          >
            + Add First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/60">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                {/* Image 2 Exact Header: Solid #0B1A40 Deep Navy background with bold Gold #DFB743 uppercase text */}
                <thead>
                  <tr className="bg-[#0B1A40] text-[#DFB743]">
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">IMAGE</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">PRODUCT NAME</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">CATEGORY</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">PRICE</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">STOCK</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-4 font-bold text-[#DFB743] text-xs uppercase tracking-wider text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginated.map((p, i) => {
                    const prodId = p.id || p._id
                    return (
                      <tr key={prodId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-400">{(page - 1) * PER_PAGE + i + 1}</td>
                        <td className="px-6 py-4">
                          {p.image || p.mainImage ? (
                            <img src={p.image || p.mainImage} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200/80 shadow-xs" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                              📦
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0B1A40] max-w-xs truncate">{p.name}</td>
                        <td className="px-6 py-4 font-normal text-slate-500">{p.category || 'General'}</td>
                        <td className="px-6 py-4 font-bold text-[#047857] font-mono">₹{(p.price || 0).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.stock <= 5 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border shadow-2xs ${statusColor(p.status)}`} title={p.status === 'Pending' ? 'Awaiting admin approval' : ''}>
                            {p.status || 'Pending'}
                          </span>
                          {p.rejectReason && <p className="text-xs font-medium text-rose-500 mt-1 max-w-xs">{p.rejectReason}</p>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link
                              to={`/products/edit/${prodId}`}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0B1A40] hover:text-white text-[#0B1A40] text-xs font-semibold transition-all flex items-center gap-1 shadow-xs"
                            >
                              <HiOutlinePencil className="w-3.5 h-3.5" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(prodId)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <HiOutlineTrash className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 bg-white/95 backdrop-blur-md p-4 rounded-[20px] border border-slate-100 shadow-md">
              <p className="text-xs font-bold text-slate-400">Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} products</p>
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      n === page
                        ? 'bg-[#051838] text-[#DFB743] shadow-md shadow-[#051838]/20'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
