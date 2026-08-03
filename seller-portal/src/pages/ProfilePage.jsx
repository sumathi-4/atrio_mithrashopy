import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { setVendor } from '../store/authSlice'
import { updateVendorProfile, getVendorProfile } from '../services/api'
import { categoryConfigService } from '../services/categoryConfigService'
import { HiOutlineUser, HiOutlineLocationMarker, HiOutlineCreditCard, HiOutlineDocumentText, HiOutlineUpload } from 'react-icons/hi'

const TABS = [
  { id: 'business', label: 'Business Info', icon: HiOutlineUser },
  { id: 'address', label: 'Address', icon: HiOutlineLocationMarker },
  { id: 'bank', label: 'Bank Details', icon: HiOutlineCreditCard },
  { id: 'documents', label: 'Documents', icon: HiOutlineDocumentText }
]

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export default function ProfilePage() {
  const [categories, setCategories] = useState(['Clothing', 'Electronics', 'Home & Living', 'Stationery', 'Gifts', 'Accessories', 'Other'])
  const dispatch = useDispatch()
  const vendor = useSelector(state => state.auth.vendor) || {}
  const [activeTab, setActiveTab] = useState('business')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const [logoBase64, setLogoBase64] = useState(vendor.logo || vendor.businessLogo || vendor.storeLogo || vendor.logoUrl || '')
  const [panBase64, setPanBase64] = useState(vendor.panDocument || '')
  const [chequeBase64, setChequeBase64] = useState(vendor.cancelledCheque || '')

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      businessName: vendor.businessName || '',
      ownerName: vendor.ownerName || '',
      phone: vendor.phone || '',
      gstin: vendor.gstin || '',
      pan: vendor.pan || '',
      businessCategory: vendor.businessCategory || 'Clothing',
      businessDescription: vendor.businessDescription || '',
      address: {
        street: vendor.address?.street || '',
        city: vendor.address?.city || '',
        state: vendor.address?.state || '',
        pincode: vendor.address?.pincode || '',
        country: vendor.address?.country || 'India'
      },
      bankDetails: {
        accountHolder: vendor.bankDetails?.accountHolder || '',
        accountNumber: vendor.bankDetails?.accountNumber || '',
        ifsc: vendor.bankDetails?.ifsc || vendor.bankDetails?.ifscCode || '',
        bankName: vendor.bankDetails?.bankName || ''
      }
    }
  })

  // Fetch latest vendor profile from backend on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getVendorProfile()
        if (res.data?.vendor) {
          dispatch(setVendor(res.data.vendor))
        }
      } catch (err) {
        console.error('Failed to load vendor profile:', err)
      }
    }
    loadProfile()
  }, [dispatch])

  // Sync state whenever vendor object in Redux updates
  useEffect(() => {
    if (vendor && Object.keys(vendor).length > 0) {
      const currentLogo = vendor.logo || vendor.businessLogo || vendor.storeLogo || vendor.logoUrl || ''
      setLogoBase64(currentLogo)
      setPanBase64(vendor.panDocument || '')
      setChequeBase64(vendor.cancelledCheque || '')
      reset({
        businessName: vendor.businessName || '',
        ownerName: vendor.ownerName || '',
        phone: vendor.phone || '',
        gstin: vendor.gstin || '',
        pan: vendor.pan || '',
        businessCategory: vendor.businessCategory || 'Clothing',
        businessDescription: vendor.businessDescription || '',
        address: {
          street: vendor.address?.street || '',
          city: vendor.address?.city || '',
          state: vendor.address?.state || '',
          pincode: vendor.address?.pincode || '',
          country: vendor.address?.country || 'India'
        },
        bankDetails: {
          accountHolder: vendor.bankDetails?.accountHolder || '',
          accountNumber: vendor.bankDetails?.accountNumber || '',
          ifsc: vendor.bankDetails?.ifsc || vendor.bankDetails?.ifscCode || '',
          bankName: vendor.bankDetails?.bankName || ''
        }
      })
    }
  }, [vendor, reset])

  useEffect(() => {
    categoryConfigService.getCategories().then(catsList => {
      if (catsList && catsList.length > 0) {
        const topLevels = catsList.filter(c => (!c.parent || c.parent === '—') && c.status === 'Active').map(c => c.name);
        if (!topLevels.includes('Other')) {
          topLevels.push('Other');
        }
        setCategories(topLevels);
      }
    });
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const base64 = await fileToBase64(file)
      setLogoBase64(base64)
    } catch {
      alert('Error uploading logo.')
    }
  }

  const handleDocumentUpload = async (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const base64 = await fileToBase64(file)
      if (type === 'pan') setPanBase64(base64)
      if (type === 'cheque') setChequeBase64(base64)
    } catch {
      alert('Error uploading document.')
    }
  }

  const onSubmit = async (data) => {
    try {
      setSaving(true)
      const payload = {
        ...data,
        logo: logoBase64,
        businessLogo: logoBase64,
        storeLogo: logoBase64,
        panDocument: panBase64,
        cancelledCheque: chequeBase64
      }

      const res = await updateVendorProfile(payload)
      const updatedVendor = res.data?.vendor || res.data
      if (updatedVendor) {
        dispatch(setVendor(updatedVendor))
      }
      showToast('Profile saved successfully!')
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to update profile.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 font-sans antialiased max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">My Vendor Profile</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Manage registration details, address entries and bank payouts.</p>
        </div>
      </div>

      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-bold border ${
          toast.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-1.5 flex-wrap">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#051838] text-[#DFB743] shadow-md shadow-[#051838]/20'
                  : 'text-slate-500 hover:text-[#0B1A40] hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/60">
          {/* TAB 1: BUSINESS */}
          {activeTab === 'business' && (
            <div className="space-y-5">
              <h2 className="text-base font-black text-[#0B1A40] border-b border-slate-100 pb-3">Business Information</h2>
              
              <div className="flex items-center gap-4 flex-wrap">
                {logoBase64 ? (
                  <img src={logoBase64} alt="Logo" className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-[#DFB743] text-xs font-black border border-amber-200 shadow-xs">
                    LOGO
                  </div>
                )}
                <label className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-black text-[#0B1A40] cursor-pointer hover:bg-slate-50 transition-colors shadow-xs">
                  <HiOutlineUpload className="w-4 h-4 text-[#DFB743]" />
                  Change Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
                  <input
                    type="text"
                    {...register('businessName')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Owner Full Name</label>
                  <input
                    type="text"
                    {...register('ownerName')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Email Address (Read-only)</label>
                  <input
                    type="email"
                    value={vendor.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 text-slate-400 font-bold rounded-2xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Contact Phone</label>
                  <input
                    type="text"
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Business Category</label>
                  <select
                    {...register('businessCategory')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">GSTIN (Optional)</label>
                  <input
                    type="text"
                    {...register('gstin')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Business Description</label>
                <textarea
                  rows={4}
                  {...register('businessDescription')}
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ADDRESS */}
          {activeTab === 'address' && (
            <div className="space-y-5">
              <h2 className="text-base font-black text-[#0B1A40] border-b border-slate-100 pb-3">Registered Address</h2>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 102 First Floor, Tech Park Road"
                  {...register('address.street')}
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">City</label>
                  <input
                    type="text"
                    {...register('address.city')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">State</label>
                  <input
                    type="text"
                    {...register('address.state')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Pincode</label>
                  <input
                    type="text"
                    {...register('address.pincode')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANK DETAILS */}
          {activeTab === 'bank' && (
            <div className="space-y-5">
              <h2 className="text-base font-black text-[#0B1A40] border-b border-slate-100 pb-3">Bank Payout Account</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    {...register('bankDetails.accountHolder')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Account Number</label>
                  <input
                    type="text"
                    {...register('bankDetails.accountNumber')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">IFSC Code</label>
                  <input
                    type="text"
                    {...register('bankDetails.ifsc')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Bank Name</label>
                  <input
                    type="text"
                    {...register('bankDetails.bankName')}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-base font-black text-[#0B1A40] border-b border-slate-100 pb-3">Business Verification Documents</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PAN Card */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">PAN Card Document</label>
                  {panBase64 ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 max-h-40 bg-slate-50 shadow-xs">
                      <img src={panBase64} alt="PAN card" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setPanBase64('')}
                        className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 text-xs hover:bg-rose-600 transition-colors shadow-xs cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-[#DFB743] cursor-pointer transition-colors text-slate-400">
                      <HiOutlineUpload className="w-8 h-8 mb-2 text-[#DFB743]" />
                      <span className="text-xs font-black text-[#0B1A40]">Upload PAN card</span>
                      <input type="file" accept="image/*" onChange={(e) => handleDocumentUpload(e, 'pan')} className="hidden" />
                    </label>
                  )}
                </div>

                {/* Cancelled Cheque */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">Cancelled Cheque</label>
                  {chequeBase64 ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 max-h-40 bg-slate-50 shadow-xs">
                      <img src={chequeBase64} alt="Cancelled Cheque" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setChequeBase64('')}
                        className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 text-xs hover:bg-rose-600 transition-colors shadow-xs cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-[#DFB743] cursor-pointer transition-colors text-slate-400">
                      <HiOutlineUpload className="w-8 h-8 mb-2 text-[#DFB743]" />
                      <span className="text-xs font-black text-[#0B1A40]">Upload Cheque</span>
                      <input type="file" accept="image/*" onChange={(e) => handleDocumentUpload(e, 'cheque')} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="flex justify-end pt-5 border-t border-slate-100 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
