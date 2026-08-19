import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { vendorRegister } from '../services/api'
import { categoryConfigService } from '../services/categoryConfigService'
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
  HiOutlineUpload,
  HiOutlineExclamationCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineSupport,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from 'react-icons/hi'
import logoImg from '../assets/logo.png'
import register3dTransparent from '../assets/register_3d_transparent.png'

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const RegisterPage = () => {
  const [categories, setCategories] = useState([
    'Clothing',
    'Electronics',
    'Home & Living',
    'Stationery',
    'Gifts',
    'Accessories',
    'Other',
  ])

  useEffect(() => {
    categoryConfigService.getCategories().then((catsList) => {
      if (catsList && catsList.length > 0) {
        const topLevels = catsList
          .filter((c) => (!c.parent || c.parent === '—') && c.status === 'Active')
          .map((c) => c.name)
        if (!topLevels.includes('Other')) {
          topLevels.push('Other')
        }
        setCategories(topLevels)
      }
    })
  }, [])

  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [step1Data, setStep1Data] = useState(null)

  // Logo preview
  const [logoPreview, setLogoPreview] = useState(null)
  const [panPreview, setPanPreview] = useState(null)
  const [chequePreview, setChequePreview] = useState(null)

  const form1 = useForm()
  const form2 = useForm()

  const handleStep1 = (data) => {
    if (data.password !== data.confirmPassword) {
      form1.setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    setStep1Data(data)
    setStep(2)
  }

  const handleStep2 = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const payload = {
        businessName: step1Data.businessName,
        ownerName: step1Data.ownerName,
        email: step1Data.email,
        phone: step1Data.phone,
        password: step1Data.password,
        businessCategory: data.businessCategory,
        businessDescription: data.businessDescription,
        gstin: data.gstin || '',
        panNumber: data.panNumber || '',
      }

      if (data.businessLogo && data.businessLogo[0]) {
        payload.businessLogo = await fileToBase64(data.businessLogo[0])
      }
      if (data.panDocument && data.panDocument[0]) {
        payload.panDocument = await fileToBase64(data.panDocument[0])
      }
      if (data.cancelledCheque && data.cancelledCheque[0]) {
        payload.cancelledCheque = await fileToBase64(data.cancelledCheque[0])
      }

      await vendorRegister(payload)
      setSuccess(true)
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const b64 = await fileToBase64(file)
      setLogoPreview(b64)
    }
  }

  const handlePanChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const b64 = await fileToBase64(file)
      setPanPreview(b64)
    }
  }

  const handleChequeChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const b64 = await fileToBase64(file)
      setChequePreview(b64)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF8] via-[#FFFBF2] to-[#FAF8F5] p-6 font-sans antialiased">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 max-w-lg w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <HiOutlineCheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-[#0B1A40] mb-3 tracking-tight">
            Application Submitted!
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
            Thank you for registering with MithraShopy! Our team will review your application within
            <strong className="text-[#0B1A40] font-extrabold"> 24-48 hours</strong>. You'll receive an email
            notification once your account is approved.
          </p>
          <div className="p-5 rounded-2xl mb-8 text-left bg-amber-50/70 border border-amber-200/80">
            <h4 className="font-extrabold text-sm mb-2.5 text-[#0B1A40]">
              What happens next?
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              <li className="flex items-center gap-2">✅ Application received and under review</li>
              <li className="flex items-center gap-2">📧 Check your email for updates</li>
              <li className="flex items-center gap-2">⏱ Review takes 24-48 business hours</li>
              <li className="flex items-center gap-2">🚀 Start listing products once approved</li>
            </ul>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full py-4 rounded-xl font-black text-sm text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl transition-all cursor-pointer border border-[#DFB743]/40"
          >
            Back to Login
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF2] to-[#FAF8F5] py-8 px-4 sm:px-8 lg:px-12 relative overflow-hidden font-sans antialiased">
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DFB743]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Decorative Wavy Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <svg className="w-full h-full text-[#DFB743]" viewBox="0 0 1000 800" fill="none">
          <path d="M-100,200 C300,50 600,400 1100,100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M-100,300 C400,150 700,500 1100,200" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          {/* Logo Header */}
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logoImg} alt="MithraShopy Logo" className="w-10 h-10 object-contain drop-shadow-xs" />
            <div className="flex flex-col text-left">
              <span className="text-[#0B1A40] font-black text-xl tracking-tight leading-none">
                Mithra<span className="text-[#DFB743]">Shopy</span>
              </span>
              <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase mt-0.5">
                SELLER PORTAL
              </span>
            </div>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1A40] tracking-tight">
            Vendor Registration
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D4AF37] font-extrabold hover:underline">
              Sign in
            </Link>
          </p>

          {/* Stepper Progress Indicator (Matching Image 1 & 2) */}
          <div className="pt-4 flex items-center justify-center gap-3 sm:gap-6">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-sm ${
                  step >= 1
                    ? 'bg-gradient-to-br from-[#DFB743] to-[#D4AF37] text-[#051838] ring-4 ring-[#DFB743]/20'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > 1 ? <HiOutlineCheck className="w-5 h-5 text-[#051838]" /> : '1'}
              </div>
              <span
                className={`text-xs sm:text-sm font-extrabold ${
                  step >= 1 ? 'text-[#0B1A40]' : 'text-slate-400'
                }`}
              >
                Basic Info
              </span>
            </div>

            {/* Connecting Line */}
            <div className="w-12 sm:w-20 h-0.5 rounded-full bg-slate-200 relative overflow-hidden">
              <div
                className={`h-full bg-[#DFB743] transition-all duration-500 ${
                  step > 1 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-sm ${
                  step === 2
                    ? 'bg-gradient-to-br from-[#DFB743] to-[#D4AF37] text-[#051838] ring-4 ring-[#DFB743]/20'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </div>
              <span
                className={`text-xs sm:text-sm font-extrabold ${
                  step === 2 ? 'text-[#0B1A40]' : 'text-slate-400'
                }`}
              >
                Business Details
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main 2-Column Registration Container (Matching Image 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Glassmorphism Registration Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-[28px] p-7 sm:p-9 shadow-2xl shadow-slate-200/70 border border-slate-100"
          >
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <div className="mb-6 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B1A40] tracking-tight">
                    Basic Information
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    Tell us about yourself and your business
                  </p>
                </div>

                <form onSubmit={form1.handleSubmit(handleStep1)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Business Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your Business Name"
                          {...form1.register('businessName', { required: 'Business name is required' })}
                          className={`w-full px-4 py-3 pl-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                            form1.formState.errors.businessName
                              ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <HiOutlineOfficeBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {form1.formState.errors.businessName && (
                        <p className="text-red-500 text-[11px] mt-1 font-semibold">
                          {form1.formState.errors.businessName.message}
                        </p>
                      )}
                    </div>

                    {/* Owner Full Name */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Owner Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Full Name"
                          {...form1.register('ownerName', { required: 'Owner name is required' })}
                          className={`w-full px-4 py-3 pl-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                            form1.formState.errors.ownerName
                              ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {form1.formState.errors.ownerName && (
                        <p className="text-red-500 text-[11px] mt-1 font-semibold">
                          {form1.formState.errors.ownerName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="you@example.com"
                          {...form1.register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                          })}
                          className={`w-full px-4 py-3 pl-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                            form1.formState.errors.email
                              ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {form1.formState.errors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-semibold">
                          {form1.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 9876543210"
                          {...form1.register('phone', {
                            required: 'Phone is required',
                            pattern: { value: /^[0-9+\s-]{10,15}$/, message: 'Invalid phone number' },
                          })}
                          className={`w-full px-4 py-3 pl-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                            form1.formState.errors.phone
                              ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {form1.formState.errors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-semibold">
                          {form1.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 8 characters"
                        {...form1.register('password', {
                          required: 'Password is required',
                          minLength: { value: 8, message: 'Minimum 8 characters' },
                        })}
                        className={`w-full px-4 py-3 pl-10 pr-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                          form1.formState.errors.password
                            ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        {showPassword ? (
                          <HiOutlineEyeOff className="w-4 h-4" />
                        ) : (
                          <HiOutlineEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {form1.formState.errors.password && (
                      <p className="text-red-500 text-[11px] mt-1 font-semibold">
                        {form1.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        {...form1.register('confirmPassword', { required: 'Please confirm password' })}
                        className={`w-full px-4 py-3 pl-10 pr-10 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none ${
                          form1.formState.errors.confirmPassword
                            ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        {showConfirm ? (
                          <HiOutlineEyeOff className="w-4 h-4" />
                        ) : (
                          <HiOutlineEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {form1.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-[11px] mt-1 font-semibold">
                        {form1.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-black text-sm text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-[#DFB743]/40 flex items-center justify-center gap-2 mt-4"
                  >
                    Continue to Business Details <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <>
                <div className="mb-6 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B1A40] tracking-tight">
                    Business Details
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    Help us understand your business better
                  </p>
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl mb-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={form2.handleSubmit(handleStep2)} className="space-y-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Category *
                    </label>
                    <select
                      {...form2.register('businessCategory', { required: 'Category is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {form2.formState.errors.businessCategory && (
                      <p className="text-red-500 text-[11px] mt-1 font-semibold">
                        {form2.formState.errors.businessCategory.message}
                      </p>
                    )}
                  </div>

                  {/* Description Textarea */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Description *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your business..."
                      {...form2.register('businessDescription', { required: 'Description is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                    {form2.formState.errors.businessDescription && (
                      <p className="text-red-500 text-[11px] mt-1 font-semibold">
                        {form2.formState.errors.businessDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Business Logo Upload */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Logo
                    </label>
                    <div className="flex items-center gap-4">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                        />
                      )}
                      <label className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-[#DFB743] hover:bg-amber-50/30 transition-all text-xs font-bold text-slate-600">
                        <HiOutlineUpload className="w-4 h-4 text-[#DFB743]" />
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          {...form2.register('businessLogo')}
                          onChange={(e) => {
                            form2.setValue('businessLogo', e.target.files)
                            handleLogoChange(e)
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* GSTIN & PAN Inputs */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        {...form2.register('gstin')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        PAN Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="ABCDE1234F"
                        {...form2.register('panNumber')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Documents Upload Dropzones */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        PAN Document (Optional)
                      </label>
                      <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-[#DFB743] hover:bg-amber-50/30 transition-all text-center">
                        {panPreview ? (
                          <img src={panPreview} alt="PAN Document" className="h-14 object-contain rounded" />
                        ) : (
                          <>
                            <HiOutlineUpload className="w-5 h-5 text-[#DFB743] mb-1" />
                            <span className="text-xs font-bold text-slate-600">
                              Upload PAN Document
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">PDF or Image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          {...form2.register('panDocument')}
                          onChange={(e) => {
                            form2.setValue('panDocument', e.target.files)
                            handlePanChange(e)
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                        Cancelled Cheque (Optional)
                      </label>
                      <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-[#DFB743] hover:bg-amber-50/30 transition-all text-center">
                        {chequePreview ? (
                          <img
                            src={chequePreview}
                            alt="Cancelled Cheque"
                            className="h-14 object-contain rounded"
                          />
                        ) : (
                          <>
                            <HiOutlineUpload className="w-5 h-5 text-[#DFB743] mb-1" />
                            <span className="text-xs font-bold text-slate-600">
                              Upload Cancelled Cheque
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">PDF or Image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          {...form2.register('cancelledCheque')}
                          onChange={(e) => {
                            form2.setValue('cancelledCheque', e.target.files)
                            handleChequeChange(e)
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3.5 rounded-xl font-black text-xs sm:text-sm text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-[#DFB743]/40 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin text-[#051838]" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application →'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* Right Column: Transparent 3D Seller Graphic (Merged seamlessly with no frames for both Step 1 and Step 2) */}
          <motion.div
            key={`img-${step}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-lg flex items-center justify-center">
              <img
                src={register3dTransparent}
                alt="MithraShopy 3D Seller Marketplace Illustration"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Badges Bar (Matching Image 1 & Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:px-4 first:px-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center flex-shrink-0 border border-blue-100">
                <HiOutlineShieldCheck className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-extrabold text-[#0B1A40] tracking-tight">
                  Secure Platform
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">100% Data Protection</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-extrabold text-[#0B1A40] tracking-tight">
                  Quick Approval
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Start Selling Faster</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DFB743] flex items-center justify-center flex-shrink-0 border border-amber-100">
                <HiOutlineLightningBolt className="w-5 h-5 text-[#DFB743]" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-extrabold text-[#0B1A40] tracking-tight">
                  Low Commission
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Best Rates in Market</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
                <HiOutlineSupport className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-extrabold text-[#0B1A40] tracking-tight">
                  24/7 Support
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Always Here to Help</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage
