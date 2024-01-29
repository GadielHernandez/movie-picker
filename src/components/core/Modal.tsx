import React from 'react'
import Button from './Button'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
    title: string
    children: React.ReactNode
    onCancel?: () => void
    onSave?: () => void
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    onCancel,
    onSave,
}: ModalProps) => {
    if (!isOpen) return null

    return (
        <aside
            tabIndex={-1}
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-neutral-950/60 w-screen h-screen"
        >
            <div className="m-auto bg-neutral-900 rounded-lg shadow min-h-72 w-10/12 md:w-1/2">
                <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-950">
                    <h3 className="text-lg font-semibold text-white">
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close modal</span>
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
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </header>
                <main className="p-4 text-left max-h-[70vh] overflow-scroll">
                    {children}
                </main>
                <footer className="flex items-center justify-end p-4 md:p-5 border-t border-slate-950 rounded-b gap-4">
                    <Button outline onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button onClick={onSave}>Guardar</Button>
                </footer>
            </div>
        </aside>
    )
}

export default Modal
