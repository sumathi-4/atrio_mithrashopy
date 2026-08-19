import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { changeVendorPassword } from '../services/api'
import { HiOutlineKey, HiOutlineShieldCheck, HiOutlineTrash } from 'react-icons/hi'

export default function SettingsPage() {
  const vendor = useSelector(state => state.auth.vendor) || {}
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm()

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }

    try {
      setLoading(true)
      await changeVendorPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      })
      showToast('Password changed successfully!')
      reset()
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to change password.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 font-sans antialiased max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">Account Settings</h1>
        <p className="text-xs sm:text-sm font-extrabold text-slate-400 mt-1">Manage authentication credentials, account status indicators and password security.</p>
      </div>

      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-bold border shadow-sm ${
          toast.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Account Credentials Card - Exact Image 4 Styling */}
      <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 shadow-xs">
            <HiOutlineShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-lg font-black text-[#0B1A40]">Account Credentials</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B48B1E] block mb-1">LOGIN EMAIL</span>
            <p className="font-bold text-[#0B1A40] lowercase text-sm sm:text-base">{vendor.email || 'seller@mithrashopy.com'}</p>
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B48B1E] block mb-1">ACCOUNT STATUS</span>
            <div className="mt-1">
              <span className="bg-[#D1FAE5] text-[#047857] border border-[#6EE7B7] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-2xs">
                {vendor.status || 'APPROVED'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B48B1E] block mb-1">JOINED DATE</span>
            <p className="font-bold text-[#0B1A40] text-sm sm:text-base uppercase tracking-wide">
              {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', day: 'numeric' }).toUpperCase() : '1 AUG 2026'}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Card - Exact Image 4 Styling */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shadow-xs">
            <HiOutlineKey className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-[#0B1A40]">Change Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('currentPassword', { required: 'Current password is required' })}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] transition-all shadow-xs"
            />
            {errors.currentPassword && <p className="text-xs font-bold text-rose-500 mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">
              NEW PASSWORD
            </label>
            <input
              type="password"
              placeholder="At least 6 characters"
              {...register('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] transition-all shadow-xs"
            />
            {errors.newPassword && <p className="text-xs font-bold text-rose-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', { required: 'Please confirm password' })}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] placeholder-slate-400 focus:outline-none focus:border-[#DFB743] transition-all shadow-xs"
            />
            {errors.confirmPassword && <p className="text-xs font-bold text-rose-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Gold CTA Button matching Image 4 */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/50 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </div>
      </form>

      {/* Danger Zone Section */}
      <div className="bg-rose-50/30 border border-rose-100 p-6 sm:p-8 rounded-[28px] space-y-4">
        <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
          <div className="p-2.5 bg-rose-100/60 rounded-2xl text-rose-600 shadow-xs">
            <HiOutlineTrash className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-base font-black text-rose-800">Danger Zone</h2>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h4 className="text-sm font-black text-[#0B1A40]">Delete Account Permanently</h4>
            <p className="text-slate-500 text-xs font-semibold mt-1">This will delete your business details, catalogs, product collections, and invoices.</p>
          </div>
          <button
            type="button"
            disabled
            className="px-4 py-2.5 bg-rose-100/70 text-rose-500 text-xs font-bold rounded-2xl cursor-not-allowed border border-rose-200"
          >
            Contact support to delete
          </button>
        </div>
      </div>
    </div>
  )
}
