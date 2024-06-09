import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function TextArea({
  placeholder,
  message,
  handleChange,
  disabled,
  size,
  ...props
}) {
  const [text, setText] = useState(message);
  const textbox = useRef(null);

  function adjustHeight() {
    if (textbox.current === null) return;
    textbox.current.style.height = "2.5rem";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleResetTextarea() {
    if (textbox.current === null) return;
    textbox.current.style.height = size || "2.5rem";
    textbox.current?.focus();
  }

  useEffect(() => {
    if (message === "") {
      setText(message);
      handleResetTextarea();
    }
  }, [message]);

  return (
    <textarea
      {...props}
      name="message"
      id=""
      ref={textbox}
      disabled={disabled}
      value={text}
      onChange={(e) => {
        adjustHeight();
        setText(e.target.value);
        handleChange(e.target.value);
      }}
      className="flex-1 text-md p-1 resize-none"
      placeholder={placeholder}
    />
  );
}
