interface InputProps {
    label?: string
    placeholder: string
    value?: string
    maxLength: number
    id: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export default function input({
    placeholder,
    id,
    value,
    label,
    maxLength,
    onChange,
}: InputProps) {
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
            <textarea
                id={id}
                value={value}
                className="bg-neutral-700 border border-neutral-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                placeholder={placeholder}
                required
                maxLength={maxLength}
                onChange={onChange}
            />
            <div className="flex items-center justify-end text-xs text-slate-700 mt-2">
                <span>{maxLength} caracteres max.</span>
            </div>
        </div>
    )
}
