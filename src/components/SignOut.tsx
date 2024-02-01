import Button from './core/Button'

export default function SignOut() {
    return (
        <Button outline href={'/api/auth/signout'}>
            Cerrar sesión
        </Button>
    )
}
