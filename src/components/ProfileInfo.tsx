import { useState } from 'react'
import Avatar from './Avatar.tsx'
import EditProfile from './EditProfile.tsx'
import {
    type IProfile,
    type UpdateProfileData,
} from '../models/profile/profile.interfaces.ts'
import SocialPill from './SocialPill.tsx'
import ShareButton from './ShareButton.tsx'

interface ProfileInfoProps {
    initialProfile: IProfile
    currentUserId?: string
}

export default function ProfileInfo({
    initialProfile,
    currentUserId,
}: ProfileInfoProps) {
    const [profile, setProfile] = useState(initialProfile)

    const handleNewProfileData = (newData: UpdateProfileData) => {
        const newProfile = {
            ...newData,
            id: profile.id,
            image: profile.image,
        }
        setProfile(newProfile)
    }

    const handleNewProfileImage = (image: string) => {
        const newProfile = {
            ...profile,
            image,
        }
        setProfile(newProfile)
    }

    return (
        <div className="flex gap-4 py-20 md:py-16">
            <div className="flex flex-col md:flex-row gap-6">
                <Avatar
                    initialAvatar={profile?.image}
                    onSaveImage={handleNewProfileImage}
                    enable={profile.id === currentUserId}
                />
                <div>
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl tracking-tight font-bold truncate">
                            {profile.name}
                        </h1>
                        {profile.verified && (
                            <span className="text-amber-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        )}
                        {profile.id === currentUserId && (
                            <>
                                <ShareButton id={profile.id} type="user" />
                                <div className="flex">
                                    <EditProfile
                                        initialProfile={profile}
                                        onNewProfileData={handleNewProfileData}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <h2 className="text-sm mt-3 tracking-tight font-medium max-w-96 text-white/70">
                        {profile.description}
                    </h2>
                    <ul className="flex gap-4 mt-2">
                        {profile.instagram && (
                            <SocialPill
                                icon="instagram"
                                url={profile.instagram}
                                label="Instagram"
                            />
                        )}
                        {profile.tiktok && (
                            <SocialPill
                                icon="tiktok"
                                url={profile.tiktok}
                                label="TikTok"
                            />
                        )}
                        {profile.twitter && (
                            <SocialPill
                                icon="twitter"
                                url={profile.twitter}
                                label="Twitter"
                            />
                        )}
                        {profile.letterboxd && (
                            <SocialPill
                                icon="letterboxd"
                                url={profile.letterboxd}
                                label="Letterboxd"
                            />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
