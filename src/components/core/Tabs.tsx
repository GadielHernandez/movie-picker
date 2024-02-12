import { useState } from 'react'

interface TabsProps {
    sections: any
    tabs: string[]
}

export default function Button({ tabs, sections }: TabsProps) {
    const [active, setActive] = useState(0)
    return (
        <>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {tabs.map((tab, index) => (
                    <li key={index} className="me-2 cursor-pointer">
                        <a
                            className={`inline-block px-4 py-3 rounded-lg font-semibold ${
                                active === index
                                    ? 'text-white bg-amber-500'
                                    : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-amber-800/60 dark:hover:text-white'
                            }`}
                            onClick={() => setActive(index)}
                        >
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>

            {sections.map((section: any, index: number) => (
                <section
                    key={index}
                    className={`mt-4 ${
                        active === index ? '' : 'hidden'
                    } transition-all duration-300 ease-in-out`}
                >
                    {section}
                </section>
            ))}
        </>
    )
}
