import Spinner from "./Spinner";

export default function SpinnerWrapper({ className }) {
  return (
    <section className=" absolute w-full h-screen bg-chat-bg flex items-center justify-center">
      <Spinner />
    </section>
  );
}
