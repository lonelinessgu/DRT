// ui/CustomTextArea.jsx
import { forwardRef, useEffect, useRef } from "react";

const CustomTextArea = forwardRef(
  (
    {
      label,
      value,
      onChange,
      placeholder = "",
      readOnly = false,
      scrollbarColor = "#9ca3af", // По умолчанию серый цвет для скролла
      maxRows = 18,
      autoResize = true,
      className = "",
      labelClassName = "",
    },
    ref
  ) => {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, getMaxHeight())}px`;
      }
    }, [value]);

    const getMaxHeight = () => {
      const rowHeight = 24; // приблизительная высота строки
      return rowHeight * maxRows;
    };

    const handleInput = (e) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, getMaxHeight())}px`;
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && <label className={`block text-sm font-medium mb-1 ${labelClassName}`}>{label}</label>}
        <textarea
          ref={ref ? ref : textareaRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          readOnly={readOnly}
          style={{
            maxHeight: `${getMaxHeight()}px`,
            overflowY: "auto",
            scrollbarColor: `${scrollbarColor} #18181b`,
            scrollbarWidth: "thin",
          }}
          className={`w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700 transition-shadow resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
            readOnly ? "bg-opacity-50" : ""
          } ${className}`}
        />
      </div>
    );
  }
);

export default CustomTextArea;