import { useState } from 'react'

export default function ImageCover() {
    const [currentImage, setCurrentImage] = useState(5)

    const photos = [
        {
            image: 'cover-1.jpg',
            credits:
                'https://unsplash.com/@imnoom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/two-reels-2uwFEAGUm6E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },
        {
            image: 'cover-2.jpg',
            credits:
                'https://unsplash.com/@grstocks?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/white-printer-paper-with-black-texts-q8P8YoR6erg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },
        {
            image: 'cover-3.jpg',
            credits:
                'https://unsplash.com/@felixmooneeram?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/red-cinema-chair-evlkOfkQ5rE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },
        {
            image: 'cover-4.jpg',
            credits:
                'https://unsplash.com/@masonkimbar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/red-yellow-and-white-abstract-painting-X_d7m2r70bA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },
        {
            image: 'cover-5.jpg',
            credits:
                'https://unsplash.com/@jakobowens1?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/clap-board-roadside-jakob-and-ryan-CiUR8zISX60?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },

        {
            image: 'cover-6.jpg',
            credits:
                'https://unsplash.com/@christopherphigh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
            link: 'https://unsplash.com/photos/white-ice-on-blue-surface-H9lcNEmlEyY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        },
    ]

    return (
        <div className="absolute top-0 left-0 w-screen h-32 md:h-44 -z-50">
            <div
                className="flex items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/img/cover/${photos[currentImage].image}')`,
                }}
            />
        </div>
    )
}
