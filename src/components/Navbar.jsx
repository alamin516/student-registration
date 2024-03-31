import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='shadow-sm'>
        <div className='w-[55%] h-[72px] mx-auto flex justify-between items-center'>
            <div>DHAKA COLLEGE</div>
            <div> 
                <ul className='flex justify-end gap-6'>
                    <li>
                        <Link href="">Home</Link>
                    </li>
                    <li>
                        <Link href="">About</Link>
                    </li>
                    <li>
                        <Link href="">Gallery</Link>
                    </li>
                    <li>
                        <Link href="">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar