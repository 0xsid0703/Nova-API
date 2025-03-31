'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import PriceBar from './PriceBar'

const Sidebar = () => {
    const router = useRouter();
    const pathName = usePathname()
    const menus = [
        { name: 'Dashboard', href: '/' },
        { name: 'Register', href: '/register' },
        { name: 'My Status', href: '/my-status' },
        { name: 'Distribution', href: '/distribution' },
        { name: 'Subnet 50', href: '/sn50' },
        { name: 'APIs', href: '/apis' },
    ]
    const handleMenuClick = (href: string) => {
        router.push(href)
    }
    return (
        <div className='w-[250px] h-screen border-r border-x-slate-700 shadow-2xl flex flex-col py-8 justify-between'>
            <div className='flex flex-col gap-10'>
                <Image src="/mark.png" width={150} height={100} alt='' className='w-24 h-14 mx-auto' />
                <div className="flex flex-col items-center">
                    {menus.map((menu) => (
                        <div key={menu.name} className={clsx('py-3 cursor-pointer hover:bg-slate-500 w-full text-center text-lg', pathName === menu.href && 'bg-slate-500')} onClick={() => handleMenuClick(menu.href)}>
                            {menu.name}
                        </div>
                    ))}
                </div>
            </div>
            <PriceBar />
        </div>
    )
}

export default Sidebar