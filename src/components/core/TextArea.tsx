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
                    className="block mb-2 text-sm font-medium text-slate-900"
                >
                    {label}
                </label>
            )}
            <textarea
                id={id}
                value={value}
                className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 "
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
