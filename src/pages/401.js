import { PageHead } from "@/components/WebHeader";

export default function Page404() {
    return (
        <>
            <PageHead title="401" description="Error al intentar iniciar sesión" />
            <main>
                <div className="flex items-center justify-center h-screen">
                    <div className="font-bold text-center select-none">
                        <span className="text-5xl">401</span>
                        <br />
                        <span className="text-base">Error al intentar iniciar sesión</span>
                    </div>
                </div>
            </main>
        </>
    );
}
