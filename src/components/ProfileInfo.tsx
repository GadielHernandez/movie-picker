import { useState } from 'react'
import Avatar from './Avatar.tsx'
import EditProfile from './EditProfile.tsx'
import {
    type IProfile,
    type UpdateProfileData,
} from '../models/profile/profile.interfaces.ts'
import SocialPill from './SocialPill.tsx'

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
                />
                <div>
                    <div className="flex gap-3 items-end">
                        <h1 className="text-xl tracking-tight font-bold truncate">
                            {profile.name}
                        </h1>
                        {profile.id === currentUserId && (
                            <div className="flex">
                                <EditProfile
                                    initialProfile={profile}
                                    onNewProfileData={handleNewProfileData}
                                />
                            </div>
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
