import { useEffect, useState } from 'react'
import {
    TypeCategory,
    type ICategory,
    type INominated,
} from '../models/categories/category.interfaces'
import CategoryOptions from './CategoryOptions'
import {
    setUserSelection,
    getGuestSelection,
} from '../lib/client/movieSelection'

interface CategoryProps {
    user?: string
    category: ICategory
    userSelection?: INominated
    width: number
    enable: boolean
}
export default function Category({
    user,
    category,
    userSelection,
    width,
    enable = true,
}: CategoryProps) {
    const [selection, setSelection] = useState(userSelection)
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!user) {
            const guestSelection = getGuestSelection(category.id)
            if (guestSelection) setSelection(guestSelection)
            return
        }
    }, [])

    const handleNewSelection = async (newSelection: INominated) => {
        await setUserSelection(
            newSelection.id,
            category.id,
            newSelection.movieid,
            newSelection.personId,
            user
        )

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
            <div
                key={category.id}
                className={`rounded-lg bg-gradient-to-r from-amber-500 to-amber-800 shadow-lg shadow-black overflow-hidden p-1 h-full group ${
                    enable && 'cursor-pointer'
                }`}
                onClick={() => enable && setOpen(true)}
                // style={{
                //     background:
                //         'repeating-conic-gradient(from 30deg,#0000 0 120deg,#332102 0 180deg) 200px 115.39999999999999px, repeating-conic-gradient(from 30deg,#f59e0c 0 60deg,#956006 0 120deg,#332102 0 180deg)',
                //     backgroundSize: '400px 231px',
                // }}
            >
                <main className="relative rounded-lg h-full overflow-hidden">
                    <div className="bg-gradient-to-b from-50% from-transparent to-neutral-950 z-10 absolute bottom-0 left-0 top-0 h-full w-full" />
                    <div
                        className={`background transition-scale absolute bottom-0 left-0 top-0 h-full w-full bg-neutral-900 bg-cover bg-no-repeat duration-1000 ease-in-out group-hover:scale-110
                        bg-[center_top_40%]
                    `}
                        style={{
                            backgroundImage: image
                                ? `url('https://image.tmdb.org/t/p/original${image}')`
                                : 'unset',
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
                    <div
                        className={`absolute ${selection && 'hidden'} ${
                            !enable && 'hidden'
                        } transition-all opacity-50 group-hover:opacity-100 duration-500 top-1/3 left-1/2 transform -translate-x-1/2`}
                    >
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
            </div>

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
