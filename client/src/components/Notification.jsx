import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotifications } from "../features/notification/notificationSlice";
import NotificationItem from "./NotificationItem";

export default function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  // console.log(notifications);

  return (
    <div className="absolute -right-16 sm:right-0 w-60 sm:w-80 p-1 flex flex-col gap-4 max-h-[250px] min-h-[200px] overflow-x-auto z-20 bg-white border-2 rounded-sm">
      {notifications.length > 0 ? (
        notifications?.map((notificatioin, idx) => (
          <NotificationItem
            key={idx}
            id={notificatioin._id}
            markasReaden={notificatioin?.markasReaden}
            name={notificatioin?.senderId.fullName}
            type={notificatioin?.type}
            message={notificatioin?.message}
            date={notificatioin?.time}
            replyTo={notificatioin?.replyTo}
          />
        ))
      ) : (
        <p className=" self-center text-slate-400">No Notifications</p>
      )}
    </div>
  );
}
