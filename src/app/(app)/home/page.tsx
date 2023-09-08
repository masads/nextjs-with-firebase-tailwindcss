'use client';

import { useAuth } from "@/lib/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


type genderType = "Male" | "Female";


export default function Home() {
  const { Logout, completeProfile, user,deleteAccount } = useAuth();
  const [age, setAge] = useState<number | null>(user?.age || 1);
  const [gender, setGender] = useState<genderType>(user?.gender || "Male")

  return (
    <div className="flex min-h-screen  flex-col gap-5 justify-center items-center text-zinc-950">
      <div className="flex flex-col gap-10 justify-center items-center rounded-3xl bg-white px-10 py-10 relative m-2" >
        <div className="flex flex-col gap-5 justify-center items-center text-zinc-950">
          <button
            className="btn-primary p-4 absolute top-4 left-4"
            onClick={Logout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

          </button>
          {user?.photoURL ? <Image
            src={user.photoURL}
            alt="profule"
            className="rounded-full"
            width={50}
            height={50}
            priority
          /> : null}
          <div className="  font-semibold text-1xl text-center">Hey {user?.displayName}</div>
          <div className="flex flex-col gap-2" >
            <div className="flex flex-col gap-2" >
              <label className="  font-semibold">Age</label>
              <input
                className="input"
                type="number"
                placeholder="Enter Age"
                value={age === null ? '' : age}
                onChange={(e) => {
                  const enteredAge = e.target.value === '' ? null : Number(e.target.value);

                  // Check if the entered age is within the valid range (1 to 150)
                  if (enteredAge === null || (enteredAge >= 1 && enteredAge <= 150)) {
                    setAge(enteredAge);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2" >
              <label className="  font-semibold">Gender</label>
              <select
                className="input"
                onChange={(e) => setGender(e.target.value as genderType)}
                value={gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center" >
            <button onClick={deleteAccount} className="btn-danger" >Delete Account</button>
            <button onClick={() => { completeProfile(gender, age) }} className="btn-primary" >Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}
