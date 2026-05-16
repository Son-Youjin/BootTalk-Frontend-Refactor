"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NotificationBell from "./NotificationBell";
import NotificationList from "./NotificationList";
import { useNotificationStore } from "@/store/notificationStore";
import { useInitialNotifications } from "@/hooks/notification/useInitialNotifications";
import { useNotificationEffect } from "@/hooks/notification/useNotificationEffect";
import { usePatchNotifications } from "@/hooks/notification/usePatchNotifications";

interface NotificationDropdownProps {
  isInDrawer?: boolean;
}

const NotificationDropdown = ({
  isInDrawer = false,
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(isInDrawer);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, setHasOpened } = useNotificationStore();

  const patchNotifications = usePatchNotifications();

  useInitialNotifications();
  useNotificationEffect();

  const handleCloseDropdown = useCallback(() => {
    if (!isInDrawer) {
      setIsOpen(false);
    }

    if (notifications.length > 0) {
      patchNotifications.mutate();
    }
  }, [notifications, patchNotifications, isInDrawer]);

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    }
  }, [isOpen, setHasOpened]);

  useEffect(() => {
    if (isInDrawer) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleCloseDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleCloseDropdown, isInDrawer]);

  return (
    <>
      {isOpen && !isInDrawer && (
        <div
          className="fixed inset-0 z-[40] bg-black/20"
          onClick={handleCloseDropdown}
        />
      )}

      <div
        className={`relative z-[99] ${isInDrawer ? "w-full" : ""}`}
        ref={dropdownRef}
      >
        {!isInDrawer && (
          <div onClick={() => setIsOpen((prev) => !prev)}>
            <NotificationBell isActive={isOpen} />
          </div>
        )}

        {isOpen && (
          <div
            className={`${
              isInDrawer
                ? "mt-4 w-full"
                : "absolute right-0 top-[calc(100%+12px)] w-[19rem] sm:w-[22rem]"
            }
          overflow-hidden rounded-2xl border border-gray-100
          bg-white shadow-xl
        `}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-800">알림</h2>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              <NotificationList
                notifications={notifications}
                onClose={handleCloseDropdown}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
