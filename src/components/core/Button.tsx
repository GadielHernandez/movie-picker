import type { MouseEvent } from 'react'

interface Props {
    children: React.ReactNode
    onClick?: (e: MouseEvent) => void | Promise<void>
    outline?: boolean
    circle?: boolean
    enabled?: boolean
    loading?: boolean
    small?: boolean
    href?: string
}
export default function Button({
    children,
    onClick,
    outline,
    circle,
    enabled = true,
    loading = false,
    small = false,
    href,
}: Props) {
    let classes =
        'block text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-800 font-medium rounded-lg px-5 py-2.5 text-sm text-center min-w-20'

    if (outline)
        classes = classes.replace(
            'bg-amber-500 hover:bg-amber-600 active:bg-amber-800',
            'bg-transparent hover:bg-gray-200 text-gray-400 hover:text-gray-900 active:bg-amber-800'
        )

    if (circle)
        classes = classes.replace('rounded-lg px-5 py-2.5', 'rounded-full p-2')

    if (!enabled)
        classes = classes.replace(
            'hover:bg-amber-600 active:bg-amber-800',
            'opacity-50 cursor-default'
        )

    if (small)
        classes = classes.replace('px-5 py-2.5 text-sm', 'px-2 py-1 text-xs')

    return (
        <a
            className={classes}
            role="button"
            onClick={(e) => {
                if (enabled && !loading && onClick) onClick(e)
            }}
            href={href}
        >
            {loading ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    className="w-6 h-6 m-auto"
                >
                    <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="15"
                        r="15"
                        cx="40"
                        cy="65"
                    >
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.4"
                        ></animate>
                    </circle>
                    <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="15"
                        r="15"
                        cx="100"
                        cy="65"
                    >
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.2"
                        ></animate>
                    </circle>
                    <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="15"
                        r="15"
                        cx="160"
                        cy="65"
                    >
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="0"
                        ></animate>
                    </circle>
                </svg>
            ) : (
                children
            )}
        </a>
    )
}
