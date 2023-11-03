'use client'

import { useUser } from "@/context/AuthContext"
import Link from "next/link"
export default function Home() {
  const { user, isAuth } = useUser()
  return (
    <>
      <div>
        {isAuth ? user.name : "Please login"}
      </div>
      {!isAuth && <button><Link href={`/login`}>Login</Link></button>}
    </>
  )
}
