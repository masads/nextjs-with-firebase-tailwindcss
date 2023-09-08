'use client';

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useState } from "react";

type genderType = "Male" | "Female";

export default function Welcome() {
  const { completeProfile } = useAuth();
  const [age, setAge] = useState<number | null>(1);
  const [gender, setGender] = useState<genderType>("Male")

  return (
    <div className="flex min-h-screen  flex-col gap-5 justify-center items-center text-zinc-950">
      <div className="flex flex-col gap-10 justify-center items-center rounded-3xl bg-white px-20 py-10 m-2" >
        <div className="flex flex-col gap-5 justify-center items-center text-zinc-950">
          <div className="  font-bold text-3xl text-center">👋🇼‌🇪‌🇱‌🇨‌🇴‌🇲‌🇪‌🙋</div>
          <div className="  font-semibold text-lg text-center">Please complete the profile</div>
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
          <button onClick={() => { completeProfile(gender,age) }} className="btn-primary" >Submit</button>
        </div>
      </div>
    </div>
  )
}
