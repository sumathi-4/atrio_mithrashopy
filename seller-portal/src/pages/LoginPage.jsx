import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { setVendor, setToken } from '../store/authSlice'
import { vendorLogin } from '../services/api'
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineExclamationCircle,
  HiOutlineMail,
  HiOutlineArrowRight,
} from 'react-icons/hi'
import logoImg from '../assets/logo.png'
import loginLeftBanner from '../assets/login_left_banner.png'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertInfo, setAlertInfo] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    setAlertInfo(null)
    try {
      const res = await vendorLogin(data)
      const { token, vendor } = res.data
      dispatch(setToken(token))
      dispatch(setVendor(vendor))
      navigate('/dashboard')
    } catch (err) {
      const status = err?.response?.status
      const message = err?.response?.data?.message || 'Login failed. Please try again.'
      const vendorStatus = err?.response?.data?.status

      if (status === 403) {
        if (vendorStatus === 'Pending') {
          setAlertInfo({
            type: 'warning',
            message: 'Your application is under review. We will notify you once approved.',
          })
        } else if (vendorStatus === 'Rejected') {
          const reason = err?.response?.data?.rejectionReason || 'No reason provided.'
          setAlertInfo({
            type: 'error',
            message: `Your application was rejected. Reason: ${reason}`,
          })
        } else {
          setAlertInfo({ type: 'error', message })
        }
      } else {
        setAlertInfo({ type: 'error', message })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-[#FFFDF8] relative font-sans antialiased">
      {/* LEFT SIDE - Pristine Match to Image 1 */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-7/12 h-full relative overflow-hidden bg-[#061638] flex items-center justify-center"
      >
        {/* High-Resolution Image 1 Left Banner Artwork */}
        <img
          src={loginLeftBanner}
          alt="MithraShoppy Seller Portal Marketplace Illustration"
          className="w-full h-full object-cover object-left max-h-screen"
        />

        {/* Curved Separation Mask Divider on Right Edge */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-24 pointer-events-none z-20">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full fill-[#FFFDF8] text-[#FFFDF8]"
          >
            <path d="M100,0 C40,0 20,40 60,70 C80,85 100,95 100,100 Z" />
          </svg>
        </div>
      </motion.div>

      {/* RIGHT SIDE - Warm Soft Cream Background & Centered Login Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full lg:w-5/12 h-full flex items-center justify-center p-6 sm:p-10 relative z-10 bg-[#FFFDF8]"
      >
        {/* Soft Decorative Ambient Backdrop Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full text-[#DFB743]" viewBox="0 0 400 800" fill="none">
            <path d="M100,-50 C300,200 50,500 350,850" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M150,-50 C350,250 100,550 400,850" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Centered White Login Card */}
        <div className="w-full max-w-md bg-white rounded-[28px] p-8 sm:p-10 shadow-2xl shadow-slate-200/70 border border-slate-100/90 relative z-10">
          {/* Top Logo Header using Website Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoImg}
              alt="MithraShoppy Logo"
              className="w-12 h-12 object-contain mb-1.5 drop-shadow-xs"
            />
            <span className="text-[#0B1A40] font-black text-xl tracking-tight leading-none">
              Mithra<span className="text-[#DFB743]">Shoppy</span>
            </span>
            <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase mt-1">
              SELLER PORTAL
            </span>
          </div>

          <h2 className="text-2xl font-black text-center text-[#0B1A40] tracking-tight mb-1">
            Sign in to your account
          </h2>
          <p className="text-center text-xs font-semibold text-slate-500 mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-extrabold text-[#D4AF37] hover:underline">
              Register as Vendor
            </Link>
          </p>

          {/* Alert Notification */}
          {alertInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 p-4 rounded-xl mb-6 text-sm font-medium ${
                alertInfo.type === 'warning'
                  ? 'bg-amber-50 border border-amber-200 text-amber-800'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{alertInfo.message}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                  })}
                  className={`w-full px-4 py-3.5 pr-11 rounded-xl border text-sm font-medium transition-all outline-none ${
                    errors.email
                      ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                <HiOutlineMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                  <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-[#D4AF37] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full px-4 py-3.5 pr-11 rounded-xl border text-sm font-medium transition-all outline-none ${
                    errors.password
                      ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                  <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:shadow-[#DFB743]/35 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-[#DFB743]/40 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin text-[#051838]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <div className="w-6 h-6 rounded-full bg-[#051838]/10 flex items-center justify-center ml-1">
                    <HiOutlineArrowRight className="w-3.5 h-3.5 text-[#051838]" />
                  </div>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
