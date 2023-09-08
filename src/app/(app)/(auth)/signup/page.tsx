'use client';


import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");


  return (
    <div className="flex flex-col gap-5 justify-center items-center text-zinc-950">
      <div className="  font-bold text-3xl text-center">Signup</div>

      <div className="flex flex-col gap-2" >
        <div className="flex flex-col gap-2" >
        <label className="  font-semibold">Full Name</label>
          <input name="name" className="input" type="text" placeholder='Enter Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2" >
          <label className="  font-semibold">Email</label>
          <input  name="email" className="input" type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2" >
          <label className="  font-semibold">Password</label>
          <input className="input" type="password" placeholder='••••••••••' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <button onClick={()=>{register(fullName,email,password)}} className="btn-primary" >Signup</button>
      <SignInWithGoogle />
      <div className="" >
        Already have an account?{" "}
        <Link href="/login" className=" font-semibold text-blue-700 hover:text-blue-500" >Login</Link>
      </div>
    </div>
  )
}
