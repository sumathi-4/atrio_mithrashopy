import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineBell,
} from 'react-icons/hi'
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../services/api'
import { setNotifications, markRead, markAllRead } from '../store/notificationsSlice'

export default function NotificationsPage() {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications.list)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  async function fetchNotifications() {
    try {
      setLoading(true)
      setError(null)
      const res = await getNotifications()
      dispatch(setNotifications(res.data?.notifications || res.data || []))
    } catch (err) {
      setError('Failed to fetch notifications.')
    } finally {
      setLoading(false)
    }
  }

  async function handleMarkRead(id, isRead) {
    if (isRead) return
    try {
      await markNotificationRead(id)
      dispatch(markRead(id))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsRead()
      dispatch(markAllRead())
    } catch (err) {
      alert('Failed to mark all as read.')
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'vendor_approved':
      case 'product_approved':
        return <HiOutlineCheckCircle className="w-5 h-5 text-[#047857]" />
      case 'vendor_rejected':
      case 'product_rejected':
        return <HiOutlineXCircle className="w-5 h-5 text-[#BE123C]" />
      case 'new_order':
        return <HiOutlineShoppingCart className="w-5 h-5 text-[#1D4ED8]" />
      case 'low_stock':
        return <HiOutlineExclamation className="w-5 h-5 text-[#B45309]" />
      default:
        return <HiOutlineInformationCircle className="w-5 h-5 text-[#0B1A40]" />
    }
  }

  const getIconContainerBg = (type) => {
    switch (type) {
      case 'vendor_approved':
      case 'product_approved':
        return 'bg-[#ECFDF5] border-[#A7F3D0]'
      case 'vendor_rejected':
      case 'product_rejected':
        return 'bg-[#FFE4E6] border-[#FECDD3]'
      case 'new_order':
        return 'bg-[#EFF6FF] border-[#BFDBFE]'
      case 'low_stock':
        return 'bg-[#FFFBEB] border-[#FDE68A]'
      default:
        return 'bg-slate-100 border-slate-200'
    }
  }

  return (
    <div className="space-y-6 font-sans antialiased max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1A40] tracking-tight">System Notifications</h1>
          <p className="text-xs sm:text-sm font-normal text-slate-500 mt-1">Stay informed on product approvals, new customer orders and inventory status alerts.</p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2.5 border border-[#DFB743]/50 rounded-2xl text-xs font-semibold text-[#0B1A40] bg-[#FFFDF5] hover:bg-[#DFB743] hover:text-[#051838] transition-all shadow-xs cursor-pointer shrink-0"
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-medium shadow-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs font-medium">Loading notifications feed...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-[#FFFBEB] text-[#DFB743] flex items-center justify-center text-3xl mx-auto mb-3 border border-[#FDE68A] shadow-xs">
            <HiOutlineBell className="w-8 h-8 text-[#DFB743]" />
          </div>
          <h3 className="text-lg font-extrabold text-[#0B1A40] mb-1">All caught up!</h3>
          <p className="text-xs font-normal text-slate-500">No unread or pending notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n._id}
              onClick={() => handleMarkRead(n._id, n.isRead)}
              className={`p-5 rounded-[22px] border-2 transition-all cursor-pointer flex gap-4 items-start shadow-sm hover:shadow-md ${
                !n.isRead
                  ? 'bg-[#FFFDF7] border-[#DFB743] shadow-md hover:bg-[#FFFBF0]'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50/80'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl shrink-0 border flex items-center justify-center ${getIconContainerBg(n.type)} shadow-xs`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B1A40] tracking-tight">{n.title}</h4>
                    {!n.isRead && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DFB743] shrink-0 shadow-xs" title="Unread" />
                    )}
                  </div>
                  <span className="text-xs font-normal text-slate-400 shrink-0">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }) : 'Just now'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {n.message}
                </p>
                {n.metadata?.rejectReason && (
                  <p className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl mt-2">
                    Reason: {n.metadata.rejectReason}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
