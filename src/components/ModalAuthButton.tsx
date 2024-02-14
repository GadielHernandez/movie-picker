import { useState } from 'react'
import Modal from './core/Modal'
import RegisterForm from './RegisterForm'
import SigninForm from './SigninForm'
import Button from './core/Button'

enum modes {
    SIGNIN = 'SIGNIN',
    REGISTER = 'REGISTER',
}

interface ModalAuthButtonProps {
    children?: React.ReactNode
    redirect?: string
}

export default function ModalAuthButton({
    children,
    redirect,
}: ModalAuthButtonProps) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [mode, setMode] = useState<modes>(modes.SIGNIN)

    return (
        <>
            <span onClick={() => setModalOpen(true)}>
                {children || (
                    <Button small>
                        <span className="uppercase">Inicia sesión</span>
                    </Button>
                )}
            </span>
            <Modal
                title={mode === modes.SIGNIN ? 'Inicia sesión' : 'Regístrate'}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                footer={false}
            >
                {mode === modes.SIGNIN && (
                    <div className="px-4">
                        <img
                            src="/img/full_icon.png"
                            alt="Logo Movie Picker"
                            className="my-8 h-14 md:h-20"
                        />
                        <SigninForm redirect={redirect} />
                        <p className="text-sm text-neutral-400 mt-6 text-center">
                            ¿No tienes una cuenta? &nbsp;
                            <a
                                className="text-white hover:text-amber-500 cursor-pointer"
                                onClick={() => setMode(modes.REGISTER)}
                            >
                                Registrate
                            </a>
                        </p>
                    </div>
                )}

                {mode === modes.REGISTER && (
                    <div className="px-4">
                        <img
                            src="/img/full_icon.png"
                            alt="Logo Movie Picker"
                            className="my-8 h-14 md:h-20"
                        />
                        <RegisterForm redirect={redirect} />
                        <p className="text-sm text-neutral-400 mt-6 text-center">
                            ¿Ya tienes una cuenta? &nbsp;
                            <a
                                className="text-white hover:text-amber-500 cursor-pointer"
                                onClick={() => setMode(modes.SIGNIN)}
                            >
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                )}
            </Modal>
        </>
    )
}
