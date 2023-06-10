import { tv } from "tailwind-variants";

export default async function ForYouPage() {
  const skeleton = tv({
    base: "relative overflow-hidden before:content-[''] before:block before:h-full before:w-full before:bg-gradient-to-r before:from-slate-100 before:to-slate-300 before:absolute before:top-0 before:left-0 before:animate-pulse",
    variants: {
      type: {
        bar: "h-6 w-full bg-slate-300/50",
      },
    },
  });

  return (
    <>
      <div className="p-4 text-white bg-cyan-600 rounded-lg mb-4">
        <div className="text-center pb-3">
          <p className="text-lg">あなたに次におすすめのsake</p>
        </div>
        <p className={skeleton({ type: "bar" })}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
      </div>
      <div className="p-4 text-white bg-cyan-600 rounded-lg">
        <div className="text-center pb-3">
          <p className="text-lg">あなたのsake嗜好</p>
        </div>
        <p className={skeleton({ type: "bar" })}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
        <p className={`${skeleton({ type: "bar" })} mt-3`}></p>
      </div>
    </>
  );
}
