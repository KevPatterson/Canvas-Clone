"use client"
import React, { useEffect, Suspense, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'
import { useUser } from '@stackframe/stack'
import { UserDetailContext } from '../context/UserDatailContext'
import { Spinner } from '@/components/ui/spinner'

function Provider({children}) {

    const user = useUser();
    const createNewUserMutation = useMutation(api.users.CreateNewUser);

    const [userDetail, setUserDetail] = useState(null);
    useEffect(() => {
        user && CreateUser();
    }, [user])

    const CreateUser=async()=>{
        const data = {
            name: user?.displayName,
            email: user?.primaryEmail,
            picture: user?.profileImageUrl
        }
        const result = await createNewUserMutation({
            ...data
        })
        console.log(result);
        setUserDetail(result);
    }
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        }>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                {children}
            </UserDetailContext.Provider>
        </Suspense>
    )
}

export default Provider