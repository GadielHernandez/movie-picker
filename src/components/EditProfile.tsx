import { useState } from 'react'
import Button from './core/Button'
import Modal from './core/Modal'
import Input from './core/Input'
import TextArea from './core/TextArea'
import type {
    IProfile,
    UpdateProfileData,
} from '../models/profile/profile.interfaces'

interface EditProfileProps {
    initialProfile: IProfile
    onNewProfileData: (profile: UpdateProfileData) => void
}

export default function EditProfile({
    initialProfile,
    onNewProfileData,
}: EditProfileProps) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState(initialProfile.name)
    const [description, setDescription] = useState(initialProfile.description)
    const [instagram, setInstagram] = useState(initialProfile.instagram || '')
    const [tiktok, setTiktok] = useState(initialProfile.tiktok || '')
    const [twitter, setTwitter] = useState(initialProfile.twitter || '')
    const [letterboxd, setLetterboxd] = useState(
        initialProfile.letterboxd || ''
    )

    const DESCRIPTION_MAX_LENGTH = 100

    const handleSave = async () => {
        const newProfile: UpdateProfileData = {
            name,
            description,
            instagram,
            tiktok,
            twitter,
            letterboxd,
        }

        await sendUpdateUser(newProfile)

        onNewProfileData(newProfile)
        setModalOpen(false)
    }

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setName(initialProfile.name)
        setDescription(initialProfile.description)
        setInstagram(initialProfile.instagram || '')
        setTiktok(initialProfile.tiktok || '')
        setTwitter(initialProfile.twitter || '')
        setLetterboxd(initialProfile.letterboxd || '')
        setModalOpen(false)
    }

    const sendUpdateUser = (data: UpdateProfileData) =>
        new Promise((resolve, reject) => {
            fetch(`/api/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })

    return (
        <>
            <Button onClick={openModal} small>
                Editar Perfil
            </Button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCancel={closeModal}
                onSave={handleSave}
                title="Editar perfil"
            >
                <Input
                    label="Nombre"
                    placeholder="Nombre"
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <TextArea
                    label="Descripción"
                    placeholder="Descripción"
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <div className="mb-5">
                    <Input
                        label="Redes sociales"
                        placeholder="Link de perfil de  Instagram"
                        type="text"
                        id="instagram"
                        icon="instagram.svg"
                        onChange={(e) => setInstagram(e.target.value)}
                        value={instagram}
                    />
                    <Input
                        placeholder="Link de perfil de Tiktok"
                        type="text"
                        id="tiktok"
                        icon="tiktok.svg"
                        onChange={(e) => setTiktok(e.target.value)}
                        value={tiktok}
                    />
                    <Input
                        placeholder="Link de perfil de Twitter"
                        type="text"
                        id="twitter"
                        icon="x.svg"
                        onChange={(e) => setTwitter(e.target.value)}
                        value={twitter}
                    />
                    <Input
                        placeholder="Link de perfil de Letterboxd"
                        type="text"
                        id="letterboxd"
                        icon="letterbox.svg"
                        onChange={(e) => setLetterboxd(e.target.value)}
                        value={letterboxd}
                    />
                </div>
            </Modal>
        </>
    )
}
