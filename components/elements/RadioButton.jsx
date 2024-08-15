export default function RadioButton({ children, bgColor, color }) {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-blue-800"} ${
        color ? color : "text-white"
      } font-bold italic tracking-wide rounded-md flex px-3 py-2 m-3 min-w-[200px] justify-around md:justify-between items-center`}
    >
      <div className="flex items-center justify-center">
        {children}
        <label htmlFor="done" className="ml-2">
          In Progress
        </label>
      </div>
      <input type="radio" name="status" id="done" />
    </div>
  );
}
