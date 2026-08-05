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
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">My Vendor Profile</h1>
        <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">Manage business registration details, store branding, address entries and bank payout info.</p>
      </div>

      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-bold border shadow-sm ${
          toast.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {toast.msg}
        </div>
      )}
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-[28px] border border-slate-200/80 shadow-xl shadow-slate-200/50 flex gap-2 flex-wrap">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#0B1A40] text-[#DFB743] shadow-md shadow-[#0B1A40]/30 border border-[#DFB743]/50'
                  : 'bg-slate-100/80 text-[#0B1A40] hover:bg-[#FFFBEB] hover:text-[#0B1A40] border border-slate-200/60'
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
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-[#0B1A40] border-b border-slate-100 pb-3">Business Information</h2>
              
              <div className="flex items-center gap-4 flex-wrap">
                {logoBase64 ? (
                  <img src={logoBase64} alt="Logo" className="w-16 h-16 rounded-2xl object-cover border-2 border-[#DFB743]/50 shadow-xs" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#FFFBEB] flex items-center justify-center text-[#DFB743] text-xs font-black border-2 border-[#FDE68A] shadow-xs">
                    LOGO
                  </div>
                )}
                <label className="flex items-center gap-2 px-5 py-3 border border-slate-300 rounded-2xl text-xs font-black text-[#0B1A40] bg-[#F8FAFC] cursor-pointer hover:bg-[#FFFBEB] transition-colors shadow-xs">
                  <HiOutlineUpload className="w-4 h-4 text-[#DFB743]" />
                  Change Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">BUSINESS NAME</label>
                  <input
                    type="text"
                    {...register('businessName')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">OWNER FULL NAME</label>
                  <input
                    type="text"
                    {...register('ownerName')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">EMAIL ADDRESS (READ-ONLY)</label>
                  <input
                    type="email"
                    value={vendor.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-[#F1F5F9] border border-slate-300 text-[#0B1A40] font-semibold rounded-2xl text-sm opacity-100 cursor-not-allowed shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">CONTACT PHONE</label>
                  <input
                    type="text"
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">BUSINESS CATEGORY</label>
                  <select
                    {...register('businessCategory')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] cursor-pointer shadow-xs"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">GSTIN (OPTIONAL)</label>
                  <input
                    type="text"
                    {...register('gstin')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">BUSINESS DESCRIPTION</label>
                <textarea
                  rows={4}
                  {...register('businessDescription')}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] resize-none shadow-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#0B1A40] border-b border-slate-100 pb-3">Registered Address</h2>

              <div>
                <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">STREET ADDRESS</label>
                <input
                  type="text"
                  placeholder="e.g. 102 First Floor, Tech Park Road"
                  {...register('address.street')}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">CITY</label>
                  <input
                    type="text"
                    {...register('address.city')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">STATE</label>
                  <input
                    type="text"
                    {...register('address.state')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">PINCODE</label>
                  <input
                    type="text"
                    {...register('address.pincode')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#0B1A40] border-b border-slate-100 pb-3">Bank Payout Account</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">ACCOUNT HOLDER NAME</label>
                  <input
                    type="text"
                    {...register('bankDetails.accountHolder')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    {...register('bankDetails.accountNumber')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">IFSC CODE</label>
                  <input
                    type="text"
                    {...register('bankDetails.ifsc')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] uppercase shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#B48B1E] uppercase tracking-wider mb-1.5">BANK NAME</label>
                  <input
                    type="text"
                    {...register('bankDetails.bankName')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-[#0B1A40] focus:outline-none focus:border-[#DFB743] shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-[#0B1A40] border-b border-slate-100 pb-3">Kyc Documents</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border-2 border-slate-200 bg-[#FFFDF7] rounded-2xl space-y-3">
                  <span className="block text-xs font-black text-[#B48B1E] uppercase tracking-wider">PAN CARD DOCUMENT</span>
                  {panBase64 ? (
                    <div className="relative">
                      <img src={panBase64} alt="PAN Document" className="w-full h-36 object-cover rounded-xl border border-slate-300" />
                    </div>
                  ) : (
                    <div className="w-full h-36 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black border border-slate-200">
                      No PAN document uploaded
                    </div>
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-[#0B1A40] cursor-pointer hover:bg-[#FFFBEB] transition-colors shadow-xs">
                    <HiOutlineUpload className="w-4 h-4 text-[#DFB743]" />
                    Upload PAN Image
                    <input type="file" accept="image/*" onChange={(e) => handleDocumentUpload(e, 'pan')} className="hidden" />
                  </label>
                </div>

                <div className="p-5 border-2 border-slate-200 bg-[#FFFDF7] rounded-2xl space-y-3">
                  <span className="block text-xs font-black text-[#B48B1E] uppercase tracking-wider">CANCELLED CHEQUE / BANK PASSBOOK</span>
                  {chequeBase64 ? (
                    <div className="relative">
                      <img src={chequeBase64} alt="Cancelled Cheque" className="w-full h-36 object-cover rounded-xl border border-slate-300" />
                    </div>
                  ) : (
                    <div className="w-full h-36 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black border border-slate-200">
                      No Cheque/Passbook uploaded
                    </div>
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-[#0B1A40] cursor-pointer hover:bg-[#FFFBEB] transition-colors shadow-xs">
                    <HiOutlineUpload className="w-4 h-4 text-[#DFB743]" />
                    Upload Cheque Image
                    <input type="file" accept="image/*" onChange={(e) => handleDocumentUpload(e, 'cheque')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-lg shadow-[#DFB743]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#DFB743]/50 cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving Changes...' : 'Save Profile Details'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
