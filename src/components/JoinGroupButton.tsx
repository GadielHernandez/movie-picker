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
        window.location.reload()
    }

    const joinGroup = () =>
        fetch('/api/group', {
            method: 'PUT',
            body: JSON.stringify({ userId, groupId }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

    return userId ? (
        <Button onClick={handleClickJoin}>Unirse</Button>
    ) : (
        <ModalAuthButton redirect={`/group?id=${groupId}&add=true`}>
            <Button>Unirse</Button>
        </ModalAuthButton>
    )
}
