import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getVendorProducts, deleteVendorProduct } from '../services/api'
import { HiOutlinePlus, HiOutlineSearch } from 'react-icons/hi'

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
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteVendorProduct(id)
      setProducts(p => p.filter(x => x.id !== id))
    } catch (err) {
      alert('Failed to delete product.')
    }
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const statusColor = s => s === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : s === 'Rejected' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">My Products</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{products.length} products total</p>
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/40 cursor-pointer"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <HiOutlineSearch className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search products..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-semibold text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          className="px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-black text-[#0B1A40] focus:outline-none focus:border-[#DFB743] cursor-pointer"
        >
          {['All', 'Pending', 'Active', 'Rejected'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs font-bold">Loading products...</div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#DFB743] flex items-center justify-center text-3xl mx-auto mb-3 border border-amber-100">📦</div>
          <h3 className="text-lg font-black text-[#0B1A40] mb-1">No products yet</h3>
          <p className="text-xs font-semibold text-slate-400 mb-5">Add your first product to start selling on MithraShoppy</p>
          <Link
            to="/products/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:scale-[1.02] transition-all"
          >
            Add First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/60">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {['#', 'Image', 'Product Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-4 text-left font-black text-slate-400 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((p, i) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-400">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td className="px-5 py-4">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-xs" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px]">IMG</div>
                        )}
                      </td>
                      <td className="px-5 py-4 font-black text-[#0B1A40]">{p.name}</td>
                      <td className="px-5 py-4 font-semibold text-slate-500">{p.category}</td>
                      <td className="px-5 py-4 font-black text-[#0B1A40]">₹{p.price?.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-4 font-bold text-slate-700">{p.stock}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black ${statusColor(p.status)}`} title={p.status === 'Pending' ? 'Awaiting admin approval' : ''}>
                          {p.status}
                        </span>
                        {p.rejectReason && <p className="text-[11px] font-bold text-rose-500 mt-1">{p.rejectReason}</p>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Link to={`/products/edit/${p.id}`} className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1A40] text-xs font-black transition-colors">Edit</Link>
                          <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-black transition-colors cursor-pointer">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs font-bold text-slate-400">Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}</p>
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${n === page ? 'bg-[#051838] text-[#DFB743] shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
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
