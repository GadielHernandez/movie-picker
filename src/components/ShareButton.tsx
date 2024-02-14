import { useState } from 'react'
import Button from './core/Button'

interface ShareButtonProps {
    userId: string
}

export default function ShareButton({ userId }: ShareButtonProps) {
    const [toast, setToast] = useState('invisible opacity-0 -translate-y-14')

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: 'Movie Picker',
                text: 'Estas son mis predicciones para los Oscars 2024',
                url: `https://oscars-pools.com/?user=${userId}`,
            })
            return
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(
                `https://oscars-pools.com/?user=${userId}`
            )
            setToast('opacity-100')
            setTimeout(() => {
                setToast('invisible opacity-0 -translate-y-14')
            }, 2000)
            return
        }
    }
    return (
        <>
            <a
                className="px-2 py-1 text-xs cursor-pointer hover:text-amber-400"
                onClick={handleShare}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
            <div
                onClick={handleShare}
                className={`absolute z-50 text-xs font-bold px-6 py-3 top-10 left-1/2 transform -translate-x-1/2 text-amber-500 bg-white rounded-lg ${toast} transition-all`}
            >
                Link copiado
            </div>
        </>
    )
}
