import { PageHead } from "@/components/WebHeader";

export default function Page404() {
  return (
    <>
      <PageHead title="404" description="la página no existe" />
      <main>
        <div className="flex items-center justify-center h-screen">
          <div className="font-bold text-center select-none">
            <span className="text-5xl">404</span>
            <br />
            <span className="text-base">la página no existe</span>
          </div>
        </div>
      </main>
    </>
  );
}
