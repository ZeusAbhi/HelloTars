import Link from "next/link";
import SearchBox, { SearchIcon } from "./searchbox";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window == "undefined") return;
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  if (isMobile) {
    return <MobileNav />
  } else {
    return <DesktopNav />
  }
}

const DesktopNav = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }
  return <div className="flex flex-row w-full px-4 md:px-15 py-2 gap-2 md:gap-8 items-center">
    <Link href="/" className="font-normal text-2xl font-pattaya whitespace-nowrap">
      Image Gallery
    </Link>
    <div className="flex-1">
      <SearchBox />
    </div>
    <Link href="#" className="font-semibold text-sm font-montserrat">Explore</Link>
    <Link href="#" className="font-semibold text-sm font-montserrat">Collection</Link>
    <Link href="#" className="font-semibold text-sm font-montserrat">Community</Link>
    <div className="flex flex-row items-center gap-2">
      <p className="text-sm font-semibold whitespace-nowrap">Dark Mode</p>
      <div className="relative isolate" onClick={() => { toggleTheme() }}>
        <input readOnly type="checkbox" className="sr-only peer" checked={theme == 'dark'} />
        <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-slate-800"></div>
        <div className="dot absolute left-1 right-auto top-1 h-6 w-6 rounded-full bg-white peer-checked:right-1 peer-checked:left-auto"></div>
      </div>
    </div >
  </div >
}

const MobileNav = () => {

  const { theme, setTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }
  return <div className="flex flex-col w-full px-4 md:px-20 py-2 gap-2 md:gap-8 lg:gap-12 items-center">
    <div className="flex flex-row w-full items-center gap-2">
      {
        !mobileSearch && <><Link href="/" className="font-normal flex-1 text-2xl font-pattaya whitespace-nowrap">
          Image Gallery
        </Link>
          <div onClick={() => { setMobileSearch(true) }} className="cursor-pointer"  ><SearchIcon /></div></>
      }
      {
        mobileSearch && <div className="flex-1">
          <SearchBox onCut={() => { setMobileSearch(false) }} />
        </div>
      }
      <div onClick={() => { setMobileMenu(!mobileMenu) }} className="cursor-pointer">
        {mobileMenu ? "x" : "="}
      </div>
    </div>
    {mobileMenu && <div className="grid grid-rows-4 w-full">
      <Link href="#" className="font-semibold text-sm font-montserrat my-auto">Explore</Link>
      <Link href="#" className="font-semibold text-sm font-montserrat my-auto">Collection</Link>
      <Link href="#" className="font-semibold text-sm font-montserrat my-auto">Community</Link>
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="text-sm font-semibold whitespace-nowrap">Dark Mode</p>
        <div className="relative isolate" onClick={() => { toggleTheme() }}>
          <input readOnly type="checkbox" className="sr-only peer" checked={theme == 'dark'} />
          <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-slate-800"></div>
          <div className="dot absolute left-1 right-auto top-1 h-6 w-6 rounded-full bg-white peer-checked:right-1 peer-checked:left-auto"></div>
        </div>
      </div >
    </div>
    }
  </div >
}
