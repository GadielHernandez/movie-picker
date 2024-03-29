import Modal from './core/Modal'
import { useState } from 'react'

interface AvatarProps {
    initialAvatar?: string
    onSaveImage: (image: string) => void
    enable?: boolean
}
export default function Avatar({
    initialAvatar,
    onSaveImage,
    enable = false,
}: AvatarProps) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [image, setImage] = useState(initialAvatar || 'avatar-7.png')

    const avatarList = [
        'avatar-1.png',
        'avatar-2.png',
        'avatar-3.png',
        'avatar-4.png',
        'avatar-5.png',
        'avatar-6.png',
        'avatar-7.png',
        'avatar-8.png',
        'avatar-9.png',
        'avatar-10.png',
        'avatar-11.png',
        'avatar-12.png',
        'avatar-13.png',
        'avatar-14.png',
    ]

    const handleSaveImage = async () => {
        setModalOpen(false)
        await saveAvatar(image)
        onSaveImage(image)
    }

    const saveAvatar = (image: string) =>
        new Promise((resolve, reject) => {
            fetch(`/api/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image,
                }),
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })

    const openModal = () => {
        if (enable) setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setImage(initialAvatar || 'avatar-7.png')
    }

    return (
        <>
            <div
                className={`flex relative h-24 w-24 rounded-full overflow-hidden group ${
                    enable && 'cursor-pointer'
                }`}
                onClick={openModal}
            >
                <div
                    className="flex items-center justify-center w-full h-full bg-contain bg-center bg-no-repeat duration-500 group-hover:brightness-50"
                    style={{
                        backgroundImage: `url('/img/avatar/${image}')`,
                    }}
                ></div>
                <div
                    className={`absolute hidden m-auto text-white font-extrabold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                        enable && 'group-hover:block'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                    </svg>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCancel={closeModal}
                onSave={handleSaveImage}
                title="Selecciona tu avatar"
            >
                <div>
                    <div className="flex items-center justify-center py-9">
                        <img
                            src={`/img/avatar/${image}`}
                            alt="Selected avatar"
                            className="h-32 w-32 rounded-full "
                        />
                    </div>

                    <div className="grid auto-rows-[100px] grid-cols-2 md:grid-cols-4 gap-8 border rounded-lg px-4 py-8">
                        {avatarList.map((avatar, index) => (
                            <div
                                className="flex items-center justify-center"
                                key={index}
                            >
                                <img
                                    src={`/img/avatar/${avatar}`}
                                    alt="Selected avatar"
                                    className={`h-24 w-24 rounded-full cursor-pointer ${
                                        avatar === image &&
                                        'ring-8 ring-amber-400'
                                    }`}
                                    onClick={() => setImage(avatar)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}
