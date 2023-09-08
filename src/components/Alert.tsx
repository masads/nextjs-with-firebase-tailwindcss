"use client"
import { erroModeType, useAuth } from "@/lib/AuthContext";


type Alert = {

};



export default function Alert({ }: Alert) {
    const { error, errorMessage, errorMode } = useAuth();
    return (
        <div className="w-full flex justify-center top-10 items-center z-40 fixed">
            <div className="flex justify-center absolute">
                {error ? (
                    <div
                        className={`${errorMode === erroModeType.danger
                            ? "bg-red-100 border-red-600 text-red-600"
                            : errorMode === erroModeType.warning
                                ? "bg-yellow-100 border-yellow-500 text-yellow-500"
                                : errorMode === erroModeType.success
                                    ? "bg-green-100 border-green-600 text-green-600"
                                    : "bg-red-100 border-red-600 text-red-600"
                            } border-[1px] py-3 px-8 text-base font-semibold rounded-2xl
          transform transition-transform ease-in-out duration-300
          ${error ? 'translate-y-0' : '-translate-y-full'}
        `} // Apply animation class here
                    >
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </div>

    )
}
