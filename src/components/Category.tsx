import { useEffect, useState } from 'react'
import {
    TypeCategory,
    type ICategory,
    type INominated,
} from '../models/categories/category.interfaces'
import CategoryOptions from './CategoryOptions'
import Button from './core/Button'

interface CategoryProps {
    category: ICategory
    initialSelection?: INominated
    width: number
}

const emojis: Record<any, string> = {
    'category-1': '🏆',
    'category-2': '🎥',
    'category-3': '🏅',
    'category-4': '🏅',
    'category-5': '🙋‍♂️',
    'category-6': '🙋‍♀️',
    'category-7': '📝',
    'category-8': '🔖',
    'category-9': '🎞',
    'category-10': '🌅 ',
    'category-11': '🥻',
    'category-12': '🪭',
    'category-13': '🎶',
    'category-14': '🎼',
    'category-15': '🔉',
    'category-16': '💄',
    'category-17': '💥',
    'category-18': '🎬 ',
    'category-19': '🎥',
    'category-20': '🎥',
    'category-21': '📽',
    'category-22': '📽',
    'category-23': '📽',
} as const

export default function Category({
    category,
    initialSelection,
    width,
}: CategoryProps) {
    const [selection, setSelection] = useState(initialSelection)
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)

    const handleNewSelection = (newSelection: INominated) => {
        setSelection(newSelection)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    useEffect(() => {
        const newImage =
            category.type === TypeCategory.MOVIE
                ? selection?.movie?.backdrop_path ||
                  selection?.movie?.poster_path ||
                  ''
                : selection?.person?.profile_path || ''
        setImage(newImage)
    }, [selection])

    return (
        <>
            <article
                className={`rounded-lg border border-amber-500 shadow-sm shadow-neutral-950 overflow-hidden row-span-1 col-span-${width} p-2 h-full group cursor-pointer`}
                onClick={() => setOpen(true)}
                style={{
                    background:
                        'repeating-conic-gradient(from 30deg,#0000 0 120deg,#332102 0 180deg) 200px 115.39999999999999px, repeating-conic-gradient(from 30deg,#f59e0c 0 60deg,#956006 0 120deg,#332102 0 180deg);',
                    backgroundSize: '400px 231px',
                }}
            >
                <main className="relative border border-amber-500 rounded-lg h-full overflow-hidden">
                    <div className="bg-gradient-to-b from-50% from-transparent to-neutral-900 z-10 absolute bottom-0 left-0 top-0 h-full w-full" />
                    <div
                        className={`background transition-scale absolute bottom-0 left-0 top-0 h-full w-full bg-neutral-900 bg-cover bg-no-repeat duration-1000 ease-in-out group-hover:scale-110
                        bg-[center_top_40%] 
                    `}
                        style={{
                            backgroundImage: image
                                ? `url('https://image.tmdb.org/t/p/original${image}')`
                                : '',
                        }}
                    ></div>
                    <div className="absolute bottom-3 left-3 right-3 p-0 md:p-3 tracking-wide rounded-lg z-20">
                        <h2 className="text-sm md:text-xl text-white w-full font-semibold">
                            {selection && selection.name}
                        </h2>
                        <h1 className="text-[12px] md:text-sm text-white uppercase">
                            {category.title}
                        </h1>
                    </div>
                    <div className="absolute transition-all opacity-50 group-hover:opacity-100 duration-500 top-1/3 left-1/2 transform -translate-x-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </main>
            </article>

            <CategoryOptions
                category={category}
                open={open}
                onNewSelection={handleNewSelection}
                onCloseModal={handleCloseModal}
                initialSelection={selection?.id}
            ></CategoryOptions>
        </>
    )
}
