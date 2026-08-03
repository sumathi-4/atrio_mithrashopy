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
        return <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600" />
      case 'vendor_rejected':
        return <HiOutlineXCircle className="w-5 h-5 text-rose-600" />
      case 'product_approved':
        return <HiOutlineCube className="w-5 h-5 text-emerald-600" />
      case 'product_rejected':
        return <HiOutlineCube className="w-5 h-5 text-rose-600" />
      case 'new_order':
        return <HiOutlineShoppingCart className="w-5 h-5 text-blue-600" />
      case 'low_stock':
        return <HiOutlineExclamation className="w-5 h-5 text-[#DFB743]" />
      default:
        return <HiOutlineInformationCircle className="w-5 h-5 text-slate-600" />
    }
  }

  const getBg = (type) => {
    switch (type) {
      case 'vendor_approved':
      case 'product_approved':
        return 'bg-emerald-50'
      case 'vendor_rejected':
      case 'product_rejected':
        return 'bg-rose-50'
      case 'new_order':
        return 'bg-blue-50'
      case 'low_stock':
        return 'bg-amber-50'
      default:
        return 'bg-slate-50'
    }
  }

  return (
    <div className="space-y-6 font-sans antialiased max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1A40] tracking-tight">Notifications</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Stay updated with approvals, order placements and system alerts.</p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-black text-[#0B1A40] bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs font-bold">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#DFB743] flex items-center justify-center text-3xl mx-auto mb-3 border border-amber-100">
            <HiOutlineBell className="w-8 h-8 text-[#DFB743]" />
          </div>
          <h3 className="text-lg font-black text-[#0B1A40] mb-1">All caught up!</h3>
          <p className="text-xs font-semibold text-slate-400">No new notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n._id}
              onClick={() => handleMarkRead(n._id, n.isRead)}
              className={`p-5 rounded-[24px] border transition-all cursor-pointer flex gap-4 items-start ${
                n.isRead
                  ? 'bg-white/90 border-slate-100 hover:bg-slate-50/70 shadow-sm'
                  : 'bg-amber-50/30 border-amber-200/70 shadow-md hover:bg-amber-50/50'
              }`}
            >
              <div className={`p-3 rounded-2xl shrink-0 ${getBg(n.type)} shadow-xs`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className={`text-sm font-black ${!n.isRead ? 'text-[#0B1A40]' : 'text-slate-700'}`}>{n.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }) : ''}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">{n.message}</p>
                {n.metadata?.rejectReason && (
                  <div className="mt-2 text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-bold">
                    Rejection Reason: {n.metadata.rejectReason}
                  </div>
                )}
              </div>
              {!n.isRead && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#DFB743] mt-2 shrink-0 shadow-xs" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
