import React from 'react'

interface Props {
    children: React.ReactNode
    onClick?: () => void
    outline?: boolean
    circle?: boolean
}
export default function Button({ children, onClick, outline, circle }: Props) {
    let classes =
        'block text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg px-5 py-2.5 text-sm text-center'

    if (outline)
        classes = classes.replace(
            'bg-amber-500 hover:bg-amber-600',
            'bg-transparent hover:bg-gray-200 text-gray-400 hover:text-gray-900'
        )

    if (circle)
        classes = classes.replace('rounded-lg px-5 py-2.5', 'rounded-full p-2')

    return (
        <button className={classes} type="button" onClick={onClick}>
            {children}
        </button>
    )
}
