export default function RadioButton({
  children,
  bgColor,
  color,
  status,
  title,
  onChange,
  value,
}) {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-blue-800"} ${
        color ? color : "text-white"
      } font-bold italic tracking-wide rounded-md flex px-3 py-2 m-3 justify-around md:justify-between items-center`}
    >
      <div className="flex items-center justify-center">
        {children}
        <label htmlFor={value} className="ml-2 min-w-[150px] ">
          {title}
        </label>
      </div>
      <input
        type="radio"
        name="status"
        id={value}
        value={value}
        checked={status == value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
