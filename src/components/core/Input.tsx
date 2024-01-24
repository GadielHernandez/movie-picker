interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    id: string
    icon?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function input({
    placeholder,
    value,
    type,
    id,
    icon,
    label,
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
                    className={`bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 ${
                        icon && 'pl-10'
                    }`}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
