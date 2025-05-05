'use client';
// src/app/page.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();
    const defaultLocale = 'ko';

    useEffect(() => {
        router.replace(`/${defaultLocale}`);
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {/* <p>Redirecting...</p> */}
        </div>
    );
}