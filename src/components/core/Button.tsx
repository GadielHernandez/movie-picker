import React from 'react'

interface Props {
    children: React.ReactNode
    onClick?: () => void
    outline?: boolean
}
export default function Button({ children, onClick, outline }: Props) {
    let classes =
        'block text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'

    if (outline)
        classes = classes.replace(
            'bg-cyan-600 hover:bg-cyan-700',
            'bg-white hover:bg-gray-50 text-cyan-600 hover:text-cyan-700 border border-cyan-600 hover:border-cyan-700'
        )

    return (
        <button className={classes} type="button" onClick={onClick}>
            {children}
        </button>
    )
}
