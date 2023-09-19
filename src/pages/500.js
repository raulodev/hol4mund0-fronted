import { PageHead } from "@/components/WebHeader";

export default function Page500() {
  return (
    <>
      <PageHead title="500" description="error en el servidor" />
      <main>
        <div className="flex items-center justify-center h-screen">
          <div className="font-bold text-center select-none">
            <span className="text-5xl">500</span>
            <br />
            <span className="text-base">error en el servidor</span>
          </div>
        </div>
      </main>
    </>
  );
}
