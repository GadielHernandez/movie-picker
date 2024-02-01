import { useState, type MouseEvent, useEffect } from 'react'
import Input from './core/Input'
import Button from './core/Button'

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [enableButton, setEnableButton] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleClick = async (e: MouseEvent) => {
        e.preventDefault()
        const credentials = `${email}:${password}`
        const encode = btoa(credentials)

        try {
            setLoading(true)
            const response: any = await registerUser(name, encode)
            if (response.error) {
                if (response.error.message === 'User already registered')
                    setError('Este correo ya esta registrado')
                else setError('Revisa los datos')
                return
            }
            setError(null)
        } catch (err) {
            setError('¡Ups! Algo salió mal. Intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    const isEmailValid = (email: string) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

    const lengthPassword = (password: string) => password.length > 6
    const passwordHasNumber = (password: string) => /\d/.test(password)
    const passwordHasUpperCase = (password: string) =>
        /(?=.*[A-Z])/.test(password)

    const samePassword = (password: string, password2: string) =>
        password === password2

    useEffect(() => {
        const valid =
            isEmailValid(email) &&
            lengthPassword(password) &&
            passwordHasNumber(password) &&
            passwordHasUpperCase(password) &&
            samePassword(password, password2)

        setEnableButton(valid)
    }, [email, password, password2])

    const registerUser = (name: string, credentials: string) =>
        new Promise((resolve, reject) => {
            fetch(
                `/api/auth/register?name=${name}&credentials=${credentials}`,
                {
                    method: 'POST',
                }
            )
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    return (
        <form>
            <Input
                label="Nombre de usuario"
                placeholder="Nombre"
                type="text"
                id="name"
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <Input
                label="Correo"
                placeholder="email@example.com"
                type="email"
                id="email"
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                validators={[
                    {
                        validation: isEmailValid,
                        message: 'El correo no es válido',
                    },
                ]}
            />
            <Input
                label="Contraseña"
                placeholder="Contraseña"
                type="password"
                id="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                validators={[
                    {
                        validation: lengthPassword,
                        message:
                            'La contraseña debe tener al menos 6 caracteres',
                    },
                    {
                        validation: passwordHasNumber,
                        message: 'La contraseña debe tener al menos un número',
                    },
                    {
                        validation: passwordHasUpperCase,
                        message:
                            'La contraseña debe tener al menos una mayúscula',
                    },
                ]}
            />
            <Input
                label="Repetir contraseña"
                placeholder="Contraseña"
                type="password"
                id="password2"
                onChange={(e) => {
                    setPassword2(e.target.value)
                }}
            />
            <div className="flex justify-between">
                <div>
                    <p
                        className={`${
                            !error && 'hidden'
                        } bg-red-700/45 text-red-200 px-12 py-3 rounded-lg`}
                    >
                        {error}
                    </p>
                </div>
                <Button
                    enabled={enableButton}
                    onClick={handleClick}
                    loading={loading}
                >
                    Registrarse
                </Button>
            </div>
        </form>
    )
}
