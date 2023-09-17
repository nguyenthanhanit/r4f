"use client";

import {Image} from "@nextui-org/image";
import {signIn, signOut} from "next-auth/react";
import {User} from "@nextui-org/user";
import {Link} from "@nextui-org/link";
import {useSession} from "next-auth/react";

export const Account = () => {
    const {data: session} = useSession();

    if (session) {
        return <User
            name={session?.user?.name}
            description={(
                <Link onClick={() => signOut()} size="sm" isExternal className='cursor-pointer'>
                    Sign out
                </Link>
            )}
            avatarProps={{
                src: session?.user?.image ?? ''
            }}
        />
    }

    return (
        <Image
            width={193}
            alt="Strava login"
            src="/connect-strava.png"
            onClick={() => signIn('strava')}
            className={'cursor-pointer'}
        />
    );
}