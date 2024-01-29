import React from 'react'

interface Props {
    children: React.ReactNode
    onClick?: () => void
    outline?: boolean
    black?: boolean
    circle?: boolean
}
export default function Button({
    children,
    onClick,
    outline,
    black,
    circle,
}: Props) {
    let classes =
        'block text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg px-5 py-2.5 text-sm text-center'

    if (outline)
        classes = classes.replace(
            'bg-amber-600 hover:bg-amber-700',
            'bg-slate-800 hover:bg-slate-900 text-amber-600 hover:bg-amber-600 border border-amber-600 '
        )

    if (black)
        classes = classes.replace(
            'bg-cyan-600 hover:bg-cyan-700',
            'bg-slate-900 text-white hover:bg-white hover:text-slate-900 border hover:border-slate-900'
        )

    if (circle)
        classes = classes.replace('rounded-lg px-5 py-2.5', 'rounded-full p-2')

    return (
        <button className={classes} type="button" onClick={onClick}>
            {children}
        </button>
    )
}
