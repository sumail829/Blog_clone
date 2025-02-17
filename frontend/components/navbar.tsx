"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from './ui/modeToggle'



export default function Navbar() {
    return (

        <div className="mx-36 flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md">

            <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-800 rounded-lg">
                    <Image src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/10/logo.png"
                        alt="Logo"
                        width={35}
                        height={35}
                    />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">REVISION</span>
            </div>


            <ul className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-white">
                <li>
                    <button className="relative px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        Homepages <span className="ml-1">▼</span>
                    </button>
                </li>
                <li>
                    <button className="relative px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        Features <span className="ml-1">▼</span>
                    </button>
                </li>
                <li>
                    <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                </li>
                <li>
                    <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contacts</Link>
                </li>
            </ul>


            <div className="flex items-center space-x-4">

                <ModeToggle></ModeToggle>
                <button className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
                    Buy Now
                </button>
            </div>
        </div>
    )
}
