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
    horizontal?: boolean
    open: boolean
}

export default function CategoryOptions({
    onCloseModal,
    onNewSelection,
    initialSelection,
    category,
    horizontal = false,
    open,
}: CategoryOptionsProps) {
    const [selected, setSelected] = useState(initialSelection)

    const closeModal = () => {
        onCloseModal()
    }

    const unselectedClasses =
        'border-slate-950 hover:bg-slate-900 text-amber-400'
    const selectedClasses =
        'bg-amber-500 border-amber-500 hover:bg-amber-600 text-white'

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
            title="Selecciona una opciòn"
        >
            <div
                className={`grid grid-cols-${
                    horizontal ? '1' : '2'
                } md:grid-cols-${
                    horizontal ? '3' : '4'
                } gap-4 rounded-lg px-4 py-8`}
            >
                {category.nominates.map((nominated) => (
                    <div
                        className={`flex flex-col items-center text-center border cursor-pointer overflow-hidden rounded-lg ${
                            selected === nominated.id
                                ? selectedClasses
                                : unselectedClasses
                        } }`}
                        onClick={() => setSelected(nominated.id)}
                    >
                        <div
                            className={`cursor-pointer w-full bg-cover bg-center bg-no-repeat ${
                                horizontal ? 'h-28' : 'h-48'
                            }`}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
                                    category.type === TypeCategory.MOVIE
                                        ? nominated?.movie?.poster_path ||
                                          nominated?.movie?.backdrop_path ||
                                          ''
                                        : nominated?.person?.profile_path || ''
                                })`,
                            }}
                        />
                        <div className="flex h-14 px-2">
                            <p className="text-sm font-bold uppercase  my-auto">
                                {nominated.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    )
}
