import Link from "next/link";
import { PageHead } from "@/components/WebHeader";
import { BsInfoCircle } from "react-icons/bs";

export default function Page404() {
    return (
        <>
            <PageHead title="Error al intentar iniciar sesión" description="Error al intentar iniciar sesión" />
            <main>
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="font-bold text-center select-none">
                        <span className="text-5xl">401</span>
                        <br />

                        <Link href="/login">
                            Error al intentar iniciar sesión click para reintentar
                        </Link>
                    </div>
                    <div className="text-md font-light flex flex-col items-center justify-center py-10">
                        <BsInfoCircle /> Si está intentando acceder desde X (Twitter) asegúrese
                        que su cuenta tenga un correo
                        confirmado.
                    </div>
                </div>
            </main>
        </>
    );
}
