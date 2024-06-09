export default function Spinner({ className }) {
  return (
    <div
      className={
        " w-10 h-10 rounded-full border-2 border-mbg-active !border-x-transparent animate-spin " +
        className
      }
    />
  );
}
