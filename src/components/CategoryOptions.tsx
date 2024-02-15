import React, { useState } from 'react'
import Modal from './core/Modal'
import {
    TypeCategory,
    type ICategory,
} from '../models/categories/category.interfaces'

interface CategoryOptionsProps {
    onNewSelection: (selected: any) => void
    onCloseModal: () => void
    initialSelection?: number | string
    category: ICategory
    open: boolean
}

export default function CategoryOptions({
    onCloseModal,
    onNewSelection,
    initialSelection,
    category,
    open,
}: CategoryOptionsProps) {
    const [selected, setSelected] = useState(initialSelection)

    const closeModal = () => {
        onCloseModal()
    }

    const unselectedClasses =
        'border-neutral-900 hover:bg-neutral-950 text-amber-400'
    const selectedClasses =
        'bg-amber-500 border-amber-500 hover:bg-amber-600 text-white'

    const isTypeMovie = category.type === TypeCategory.MOVIE

    const handleOnSave = () => {
        const selectedNominate = category.nominates.find(
            (nominated) => nominated.id === selected
        )

        if (selectedNominate) onNewSelection(selectedNominate)
        closeModal()
    }

    return (
        <Modal
            isOpen={open}
            onClose={closeModal}
            onCancel={closeModal}
            onSave={handleOnSave}
            title={category.title}
        >
            <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg px-4 py-8`}
            >
                {category.nominates.map((nominated) => (
                    <div
                        key={nominated.id}
                        className={`flex flex-col items-center text-center border cursor-pointer overflow-hidden rounded-md shadow-black shadow-lg ${
                            selected === nominated.id
                                ? selectedClasses
                                : unselectedClasses
                        } }`}
                        onClick={() => setSelected(nominated.id)}
                    >
                        <div
                            className={`cursor-pointer w-full bg-cover bg-center bg-no-repeat h-52`}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
                                    isTypeMovie
                                        ? nominated?.movie?.poster_path ||
                                          nominated?.movie?.backdrop_path ||
                                          ''
                                        : nominated?.person?.profile_path || ''
                                })`,
                            }}
                        />
                        <div
                            className={`flex px-2 ${
                                isTypeMovie ? 'h-14' : 'h-20'
                            }`}
                        >
                            <div className="my-auto">
                                <p className="text-xs md:text-sm font-bold uppercase">
                                    {nominated.name}
                                </p>
                                {!isTypeMovie && (
                                    <p
                                        className={`text-[10px] md:text-xs uppercase my-2 ${
                                            selected !== nominated.id &&
                                            'text-gray-400 '
                                        }`}
                                    >
                                        {nominated?.movie?.title}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    )
}
