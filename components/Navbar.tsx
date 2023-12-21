import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { UserButton, currentUser } from "@clerk/nextjs";
import { SignInBtn } from './SignInBtn';
import { SignOutBtn } from './SignOutBtn';

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]

const Navbar = () => {
  const { userId }: { userId: string | null } = auth();
  // const { getToken } = auth();

  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            Price<span className='text-primary'>Tracker</span>
          </p>
        </Link>

        {
          !userId ? (
            <div className="flex items-center gap-5 ">
              <Link href="/sign-in" className="flex items-center gap-1 ring-red-500">
                <p className="">
                  SignIn0
                </p>
              </Link>
              <Link href="/sign-up" className="flex items-center gap-1 ring-red-500">
                <p className="">
                  SignUp
                </p>
              </Link>
              {/* <SignInBtn/> */}
            </div>
          )
            : (
              <>
                <Link href="/profile">Profile</Link>
                <UserButton afterSignOutUrl="/" />
                {/* <SignOutBtn /> */}
              </>
            )
        }

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar