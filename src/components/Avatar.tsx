import Modal from './core/Modal'
import { useState } from 'react'

interface AvatarProps {
    initialAvatar: string
    onSaveImage: (image: string) => void
}
export default function Avatar({ initialAvatar, onSaveImage }: AvatarProps) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [image, setImage] = useState(initialAvatar)

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

    const handleSaveImage = () => {
        setModalOpen(false)
        onSaveImage(image)
    }

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setModalOpen(false)
        setImage(initialAvatar)
    }

    return (
        <>
            <div
                className="flex relative h-28 w-28 rounded-full overflow-hidden group cursor-pointer"
                onClick={openModal}
            >
                <div
                    className="flex items-center justify-center w-full h-full bg-contain bg-center bg-no-repeat duration-500 group-hover:brightness-50"
                    style={{
                        backgroundImage: `url('/img/avatar/${image}')`,
                    }}
                ></div>
                <div className="absolute hidden m-auto text-white font-extrabold group-hover:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                            className="h-44 w-44 rounded-full "
                        />
                    </div>

                    <div className="grid auto-rows-[100px] grid-cols-2 md:grid-cols-4 gap-8 border rounded-lg px-4 py-8">
                        {avatarList.map((avatar) => (
                            <div className="flex items-center justify-center">
                                <img
                                    key={avatar}
                                    src={`/img/avatar/${avatar}`}
                                    alt="Selected avatar"
                                    className={`h-28 w-28 rounded-full cursor-pointer ${
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
