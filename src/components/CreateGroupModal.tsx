import { useState } from 'react'
import Modal from './core/Modal'
import Button from './core/Button'
import Input from './core/Input'
import TextArea from './core/TextArea'

interface CreateGroupModalProps {
    creatorId: string
}

export default function CreateGroupModal({ creatorId }: CreateGroupModalProps) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const closeModal = () => {
        setModalOpen(false)
        setName('')
        setDescription('')
    }

    const handleSave = async () => {
        await saveGroup()
        closeModal()
        window.location.reload()
    }

    const saveGroup = () =>
        fetch('/api/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, userId: creatorId }),
        })
            .then((response) => response.json())
            .then((response) => response)
            .catch((err) => console.log(err))

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Crear grupo</Button>
            <Modal
                title="Crear grupo"
                isOpen={isModalOpen}
                onClose={closeModal}
                onCancel={closeModal}
                onSave={handleSave}
            >
                <form>
                    <Input
                        label="Nombre"
                        placeholder="Nombre del grupo"
                        type="text"
                        id="name"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextArea
                        label="Descripción"
                        placeholder="Descripción del grupo"
                        id="description"
                        maxLength={200}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </form>
            </Modal>
        </>
    )
}
