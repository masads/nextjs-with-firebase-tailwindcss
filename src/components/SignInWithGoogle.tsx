import { useAuth } from "@/lib/AuthContext";
import Image from "next/image";

const SignInWithGoogle = () => {
    const {googleSignIn}=useAuth();
    
    return (
        <>
            <div className="text-zinc-950 font-bold" >Or</div>
            <button onClick={googleSignIn} className="flex flex-row justify-center items-center gap-2 bg-white border-zinc-950 border-2 text-zinc-950 px-10 py-4 md:px-8 md:py-4 rounded-3xl  font-semiboldtransition duration-300">
                <Image src="/google-logo-9808.png"
                    alt="chrome logo"
                    width={25}
                    height={25}
                    priority />
                Sign In with Google
            </button></>
    );
};

export default SignInWithGoogle;