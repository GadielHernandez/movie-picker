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
    tiktok?: string
    twitter?: string
    letterbox?: string
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

    const handleNewProfileImage = (image: string) => {
        const newProfile = {
            ...profile,
            image,
        }
        setProfile(newProfile)
    }

    return (
        <div>
            <div className="flex gap-6 items-center">
                <div>
                    <h1 className="text-3xl tracking-tight font-bold truncate mb-3">
                        {profile.name}
                    </h1>
                    <h2 className="text-sm mt-1 tracking-tight font-medium max-w-96">
                        {profile.description}
                    </h2>
                </div>
            </div>
            <ul className="flex flex-wrap gap-2 my-6">
                {profile.instagram && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 50 50"
                                fill="currentColor"
                            >
                                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                            </svg>
                            <span>Instagram</span>
                        </a>
                    </li>
                )}
                {profile.tiktok && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <svg
                                fill="currentColor"
                                className="h-4 w-4"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"></path>
                                </g>
                            </svg>
                            <span>Tiktok</span>
                        </a>
                    </li>
                )}
                {profile.twitter && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M 2.8671875 3 L 9.7363281 12.818359 L 2.734375 21 L 5.3808594 21 L 10.919922 14.509766 L 15.460938 21 L 21.371094 21 L 14.173828 10.697266 L 20.744141 3 L 18.138672 3 L 12.996094 9.0097656 L 8.7988281 3 L 2.8671875 3 z"></path>
                            </svg>
                            <span>Twitter</span>
                        </a>
                    </li>
                )}
                {profile.letterbox && (
                    <li className="">
                        <a className="flex items-center gap-1 px-2 py-1 text-xs font-bold leading-5 cursor-pointer">
                            <img
                                src="/img/letterbox.svg"
                                alt="Letterbox logo"
                                className="h-4 w-4"
                            />
                            <span>Letterbox</span>
                        </a>
                    </li>
                )}
            </ul>

            <div className="flex">
                <EditProfile
                    initialProfile={profile}
                    onNewProfileData={handleNewProfileData}
                />
            </div>
        </div>
    )
}
