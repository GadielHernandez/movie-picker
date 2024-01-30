import React, { useState, type Dispatch, type SetStateAction } from 'react'
import Button from './core/Button'
import Modal from './core/Modal'
import Input from './core/Input'
import TextArea from './core/TextArea'
import type { IProfile } from './ProfileInfo'

interface EditProfileProps {
    initialProfile: IProfile
    onNewProfileData: (profile: Omit<IProfile, 'image'>) => void
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
    const [letterbox, setLetterbox] = useState(initialProfile.letterbox || '')

    const DESCRIPTION_MAX_LENGTH = 100

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const setters: Record<any, Dispatch<SetStateAction<any>>> = {
            name: setName,
            description: setDescription,
            instagram: setInstagram,
            tiktok: setTiktok,
            twitter: setTwitter,
            letterbox: setLetterbox,
        }

        const { id, value } = event.target
        const setter: Dispatch<SetStateAction<string>> = setters[id]
        setter(value)
    }

    const handleSave = () => {
        const newProfile = {
            name,
            description,
            instagram,
            tiktok,
            twitter,
            letterbox,
        }

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
        setLetterbox(initialProfile.letterbox || '')
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={openModal}>Editar Perfil</Button>
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
                    onChange={handleChange}
                    value={name}
                />
                <TextArea
                    label="Descripción"
                    placeholder="Descripción"
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    id="description"
                    onChange={handleChange}
                    value={description}
                />
                <div className="mb-5">
                    <Input
                        label="Redes sociales"
                        placeholder="Link de perfil de  Instagram"
                        type="text"
                        id="instagram"
                        icon="instagram.svg"
                        onChange={handleChange}
                        value={instagram}
                    />
                    <Input
                        placeholder="Link de perfil de Tiktok"
                        type="text"
                        id="tiktok"
                        icon="tiktok.svg"
                        onChange={handleChange}
                        value={tiktok}
                    />
                    <Input
                        placeholder="Link de perfil de Twitter"
                        type="text"
                        id="twitter"
                        icon="x.svg"
                        onChange={handleChange}
                        value={twitter}
                    />
                    <Input
                        placeholder="Link de perfil de Letterbox"
                        type="text"
                        id="letterbox"
                        icon="letterbox.svg"
                        onChange={handleChange}
                        value={letterbox}
                    />
                </div>
            </Modal>
        </>
    )
}
