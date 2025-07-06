"use client";

import React, { Suspense } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from './Provider';
import { Spinner } from '@/components/ui/spinner'

function ConvexClientProvider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        }>

            <ConvexProvider client={convex}>
                <Provider>
                    {children}
                </Provider>
            </ConvexProvider>
        </Suspense>
    )
}

export default ConvexClientProvider