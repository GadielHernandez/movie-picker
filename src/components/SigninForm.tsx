import { useState, type MouseEvent, useEffect } from 'react'
import Input from './core/Input'
import Button from './core/Button'
import { cleanGuestSelections } from '../lib/client/movieSelection'

export default function SigninForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [enableButton, setEnableButton] = useState(false)

    const handleClick = async (e: MouseEvent) => {
        e.preventDefault()
        const credentials = `${email}:${password}`
        const encode = btoa(credentials)

        try {
            setLoading(true)
            const response: any = await signInUser(encode)
            if (response.error) {
                setError('Correo o contraseña incorrectos')
                return
            }
            setError(null)
            cleanGuestSelections()
            window.location.href = '/'
        } catch (err) {
            setError('¡Ups! Algo salió mal. Intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    const isEmailValid = (email: string) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

    useEffect(() => {
        const valid = isEmailValid(email) && password.length > 6

        setEnableButton(valid)
    }, [email, password])

    const signInUser = (credentials: string) =>
        new Promise((resolve, reject) => {
            fetch(`/api/auth/signin?credentials=${credentials}`, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    return (
        <form>
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
            />
            <div className="flex flex-col gap-6">
                <div>
                    <p
                        className={`${
                            !error && 'hidden'
                        } bg-red-700/5 text-red-200 px-3 py-3 rounded-lg`}
                    >
                        {error}
                    </p>
                </div>
                <Button
                    enabled={enableButton}
                    onClick={handleClick}
                    loading={loading}
                >
                    Iniciar sesión
                </Button>
            </div>
        </form>
    )
}
