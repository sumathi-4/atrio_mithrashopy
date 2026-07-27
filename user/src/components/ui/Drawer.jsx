import React, { useEffect, useRef } from 'react';

/**
 * MithraShoppy Shared Drawer Component
 * Slides in from left or right
 */
const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = '360px',
  showCloseButton = true,
  closeOnBackdrop = true,
  className = '',
}) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the drawer panel on open
    if (drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        drawerRef.current.focus();
      }
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = Array.from(
          drawerRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
          )
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`ms-drawer-backdrop ${isOpen ? 'ms-drawer-backdrop--visible' : ''}`}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={drawerRef}
        tabIndex="-1"
        className={`ms-drawer ms-drawer--${position} ${isOpen ? 'ms-drawer--open' : ''} ${className}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ms-drawer-title' : undefined}
      >
        {(title || showCloseButton) && (
          <div className="ms-drawer__header">
            {title && <h2 id="ms-drawer-title" className="ms-drawer__title">{title}</h2>}
            {showCloseButton && (
              <button className="ms-drawer__close" onClick={onClose} aria-label="Close drawer">
                ✕
              </button>
            )}
          </div>
        )}
        <div className="ms-drawer__body">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
