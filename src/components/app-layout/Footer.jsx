import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer>

                <div className='lg:pl-12 lg:pr-12 lg:p-6 sm:pl-7 sm:pr-7 sm:p-4 p-4 w-full flex flex-col gap-6 sm:gap-0 sm:flex-row items-center justify-between bg-black border-t-2'>
                    <div className="flex flex-col gap-4 w-full sm:w-5/12">
                        <h2 className='text-2xl sm:text-4xl font-bold text-yellow-300'>Spring.</h2>
                        <p className='text-xs'>At Spring, we believe in bringing style and creativity to your everyday life. From trendy apparel and accessories to unique wall art, phone cases, and stationery, we offer a curated collection to elevate your look and living space. Shop with us for quality, style, and inspiration — all at your fingertips!</p>
                    </div>

                    <div className="flex w-full sm:w-1/12 text-xs">
                       <div className="w-fit flex  flex-col gap-4">
                        <Link>Home</Link>
                        <Link>About</Link>
                        <Link>Contact</Link>
                       </div>
                    </div>

                    <div className="flex w-full sm:w-1/12 text-xs">
                       <div className="w-fit flex  flex-col gap-4">
                        <Link>My Orders</Link>
                        <Link>The Populars</Link>
                        <Link>My Wishlist</Link>
                       </div>
                    </div>

                    <div className="flex w-full sm:w-1/12 text-xs">
                       <div className="w-fit flex  flex-col gap-4">
                        <Link>Sister Companies</Link>
                        <Link>Recent Launches</Link>
                        <Link>Explore All</Link>
                       </div>
                    </div>
                </div>
                <div className='lg:pl-12 lg:pr-12 lg:p-4 sm:pl-7 sm:pr-7 sm:p-2 p-2 w-full flex items-center justify-between bg-black border-t-2 border-gray-900'>
                    <p className='pl-2 sm:p=0 text-xs'>
                        Designed & Developed By Aman Yadav
                    </p>
                </div>
            </footer>

        </>
    )
}

export default Footer
