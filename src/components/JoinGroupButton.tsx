import Button from './core/Button'
import ModalAuthButton from './ModalAuthButton'

interface JoinGroupButtonProps {
    userId?: string
    groupId: string
}

export default function JoinGroupButton({
    userId,
    groupId,
}: JoinGroupButtonProps) {
    const handleClickJoin = async () => {
        await joinGroup()
    }

    const joinGroup = async () => {
        await fetch('/api/group', {
            method: 'PUT',
            body: JSON.stringify({ userId, groupId }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        window.location.reload()
    }

    return userId ? (
        <Button onClick={handleClickJoin}>Unirse</Button>
    ) : (
        <ModalAuthButton redirect={`/group?id=${groupId}&add=true`}>
            <Button>Unirse</Button>
        </ModalAuthButton>
    )
}
