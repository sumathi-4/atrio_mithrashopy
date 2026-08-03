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
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">Account Settings</h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Manage authentication credentials, status badges and account deletion.</p>
      </div>

      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-bold border ${
          toast.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Account Info Section */}
      <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 shadow-xs">
            <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-base font-black text-[#0B1A40]">Account Credentials</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] font-black uppercase tracking-wider text-slate-400">
          <div>
            <span>Login Email</span>
            <p className="font-bold text-[#0B1A40] lowercase text-xs mt-1.5">{vendor.email || 'N/A'}</p>
          </div>
          <div>
            <span>Account Status</span>
            <div className="mt-1.5">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-black">
                {vendor.status || 'Active'}
              </span>
            </div>
          </div>
          <div>
            <span>Joined Date</span>
            <p className="font-bold text-[#0B1A40] text-xs mt-1.5">
              {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'June 2026'}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shadow-xs">
            <HiOutlineKey className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-base font-black text-[#0B1A40]">Change Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('currentPassword', { required: 'Current password is required' })}
              className="w-full max-w-md px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
            />
            {errors.currentPassword && <p className="text-rose-600 text-xs font-bold mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">New Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              className="w-full max-w-md px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
            />
            {errors.newPassword && <p className="text-rose-600 text-xs font-bold mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', { required: 'Please confirm your new password' })}
              className="w-full max-w-md px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
            />
            {errors.confirmPassword && <p className="text-rose-600 text-xs font-bold mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl font-black text-xs text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {loading ? 'Updating...' : 'Update Password'}
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
