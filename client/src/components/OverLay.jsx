import { useRef } from "react";

export default function OverLay({ children, handleOverLayClick, className }) {
  const overLayRef = useRef(null);
  return (
    <div
      ref={overLayRef}
      className={` bg-black/40 fixed w-full h-screen top-0 left-0 z-50 flex items-center justify-center ${className}`}
      onClick={(event) => {
        if (event.target === overLayRef.current) {
          handleOverLayClick();
        }
      }}
    >
      {children}
    </div>
  );
}
