import { useState } from 'react'
import EditProfile from './EditProfile.tsx'

interface ProfileInfoProps {
    initialProfile: IProfile
}

export interface IProfile {
    name: string
    image: string
    description: string
    instagram?: string
    youtube?: string
    twitter?: string
    tiktok?: string
}

export default function ProfileInfo({ initialProfile }: ProfileInfoProps) {
    const [profile, setProfile] = useState(initialProfile)

    const handleNewProfileData = (newData: Omit<IProfile, 'image'>) => {
        const newProfile = {
            ...newData,
            image: profile.image,
        }
        setProfile(newProfile)
    }

    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <img
                src={`/img/avatar/${profile.image}`}
                alt={`${profile.name} Avatar`}
                className="h-36 w-36 rounded-full"
            />
            <div>
                <h1 className="text-3xl tracking-tight font-bold truncate">
                    {profile.name}
                </h1>
                <h2 className="text-base tracking-tight font-medium truncate">
                    {profile.description}
                </h2>
            </div>
            <EditProfile
                initialProfile={profile}
                onNewProfileData={handleNewProfileData}
            />
            <ul className="flex flex-wrap gap-2 mt-6">
                {profile.instagram && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <img
                                src="/img/instagram.svg"
                                alt="instagram"
                                className="h-4"
                            />
                            <span>Instagram</span>
                        </a>
                    </li>
                )}
                {profile.youtube && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <img
                                src="/img/youtube.svg"
                                alt="youtube"
                                className="h-4"
                            />
                            <span>Youtube</span>
                        </a>
                    </li>
                )}
                {profile.twitter && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <img
                                src="/img/x.svg"
                                alt="twitter"
                                className="h-4"
                            />
                            <span>Twitter</span>
                        </a>
                    </li>
                )}
                {profile.tiktok && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <img
                                src="/img/tiktok.svg"
                                alt="tiktok"
                                className="h-4"
                            />
                            <span>Tiktok</span>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}
