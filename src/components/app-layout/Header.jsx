import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton, SignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from 'react';
import { BoxesIcon, ChevronDownIcon, Heart, Package, PackagePlusIcon, Search, ShoppingCartIcon, Truck } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { getCategory } from '@/api/apiProducts';
import useFetch from '@/hooks/useFetch';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';





const Header = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const [query, setQuery] = useState('')
    const { user, isLoaded } = useUser();
    const { data: catData, loading: catLoading, error: catError, fn: fnCat } = useFetch(getCategory);
    

    useEffect(() => {
        if (search.get("sign-in")) {
            setShowLoginPopup(true)
        }
    }, [search])



    useEffect(() => {
        fnCat();

    }, [isLoaded])







    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowLoginPopup(false);
            setSearch({})
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/shop?q=${query}`);
    }
    return (
        <>
            <header className="navbar lg:pl-12 lg:pr-12 lg:p-6 sm:pl-7 sm:pr-7 sm:p-4 p-4 w-full flex justify-between items-center z-40">
                <div>
                    <Link to="/" className='text-base font-semibold text-yellow-300'>Spring.</Link>
                </div>
                <nav className="flex justify-between items-center text-base gap-5 text-gray-300">
                    <Link to="/shop?ispop=true" className='text-xs font-medium hidden md:block' >Populars</Link>
                    <SignedIn>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='md:flex gap-2 items-center justify-center text-xs outline-none hidden'>Categories  <ChevronDownIcon size={15} className='mt-[1.5px]' /></DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col gap-1 p-1.5">
                                {catData && catData.map(cat => {
                                    return <Link key={cat.name} to={`/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}><DropdownMenuItem className='cursor-pointer text-xs rounded-sm outline-none p-2 duration-200 hover:bg-gray-900'>{cat.name}</DropdownMenuItem></Link>
                                })}

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' outline-none'><Search size={18} /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Search</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <form onSubmit={handleClick} className="flex">
                                <Input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for products"
                                />
                                <Button type="submit" variant="outline">Search</Button>
                            </form>


                        </DropdownMenuContent>
                    </DropdownMenu>
                    {user?.unsafeMetadata?.role === "customer" &&
                        <Link to="/cart" className='font-medium relative' ><ShoppingCartIcon size={18} /><p className=" bg-yellow-300 absolute text-black right-[-5px] top-[-1px] rounded-full h-[11px] flex justify-center font-bold aspect-square text-[8px] items-center">3</p></Link>}


                    <div className='flex items-center justify-center'>
                        <SignedOut>
                            <Button variant="outline" onClick={() => { setShowLoginPopup(true) }}>Login / Register</Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton>
                                <UserButton.MenuItems>
                            <UserButton.Link
                                        label={`${user?.unsafeMetadata?.role === "customer" ? "My WishList" : "My Favorites"}`}
                                        labelIcon={<Heart size={16} strokeWidth={2.5} />}
                                        href='/wishlist'
                                    />
                                    <UserButton.Link
                                        label='My Orders'
                                        labelIcon={<Truck size={16} strokeWidth={2.5} />}
                                        href='/my-orders'
                                    />
                                    {user?.unsafeMetadata?.role === "seller" && <UserButton.Link
                                        label='My Products'
                                        labelIcon={<BoxesIcon size={16} strokeWidth={2.5} />}
                                        href='/my-products'
                                    />}
                                    {user?.unsafeMetadata?.role === "seller" && <UserButton.Link
                                        label='Add Products'
                                        labelIcon={<PackagePlusIcon size={16} strokeWidth={2.5} />}
                                        href='/add-product'
                                    />}
                                </UserButton.MenuItems>

                            </UserButton>
                        </SignedIn>
                    </div>
                </nav>
            </header>
            {showLoginPopup &&
                <div className="z-50 flex items-center align-middle justify-center h-screen fixed top-0 w-full bg-gray-950 bg-opacity-50" onClick={handleOverlayClick}>
                    <SignIn />
                </div >
            }
        </>
    )
}

export default Header
