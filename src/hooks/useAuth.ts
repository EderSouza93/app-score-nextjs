'use client';

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useAuth() {
    const router = useRouter()
    const [isAuthenticated, setIsAutenticated] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            router.push('/')
        } else {
            setIsAutenticated(true)
        }
    }, [router])

    return isAuthenticated
}