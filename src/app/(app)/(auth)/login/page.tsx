'use client';

import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="flex flex-col gap-5 justify-center items-center text-zinc-950">
      <div className="  font-bold text-3xl text-center">Login</div>
      <div className="flex flex-col gap-2" >
        <div className="flex flex-col gap-2" >
          <label className="  font-semibold">Email</label>
          <input name="email" className="input" type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2" >
          <label className="  font-semibold">Password</label>
          <input  name="password" className="input" type="password" placeholder='••••••••••' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <button onClick={()=>{login(email,password)}} className="btn-primary" >Login</button>
      <SignInWithGoogle />
      <div className="" >
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-blue-700 hover:text-blue-500" >Signup</Link>
      </div>
    </div>
  )
}
