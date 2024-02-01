import { useState, type ChangeEvent } from 'react'

interface Validator {
    validation: (value: string) => boolean
    message: string
}

interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    id: string
    icon?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    validators?: Validator[]
}

export default function input({
    placeholder,
    value,
    type,
    id,
    icon,
    label,
    onChange,
    validators,
}: InputProps) {
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e)

        validators?.some((validator) => {
            if (!validator.validation(e.target.value)) {
                setError(validator.message)
                return true
            }
            setError(null)
            return false
        })
    }

    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <img src={`/img/${icon}`} alt={icon} className="h-4" />
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    value={value}
                    className={`bg-neutral-700 border border-neutral-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 ${
                        icon && 'pl-10'
                    }`}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end">
                <p className="text-xs text-amber-500 mt-2 min-h-4">{error}</p>
            </div>
        </div>
    )
}
