import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function SearchBox({ onCut }: { onCut?: () => void }) {
  const [suggestions, setSuggestions] = useState(["sample suggestions", "clicking these", "does nothing"]);
  const [search, setSearch] = useState("")
  const lastTime = useRef<NodeJS.Timeout>(null)
  const router = useRouter()
  const clear = () => {
    setSearch("")
    if (onCut) {
      onCut()
    }
  }
  useEffect(() => {
    if (search.length < 3) {
      return;
    }
    if (lastTime.current) {
      clearTimeout(lastTime.current)
    }
    (lastTime.current as any) = setTimeout(async () => {
      router.push({
        pathname: "/search",
        query: { q: search },
      })
    }, 1000)
  }, [search])

  return <div className="relative w-full ">
    <div className="z-10 rounded-md w-full px-4 py-2 peer bg-slate-100 dark:bg-neutral-800 flex flex-row h-min items-center gap-1">
      <SearchIcon />
      <input className="flex-1 bg-inherit focus:ring-0 focus:outline-none" placeholder="Search"
        value={search} onChange={(e) => { setSearch(e.target.value) }} />
      <button onClick={clear} className="text-sm text-slate-500">x</button>
    </div>
    <div className="absolute mt-[4.2ch] top-0 left-0 w-full bg-white border border-gray-200 dark:border-gray-800 rounded-md peer-focus-within:block hidden">
      {suggestions.map((item, index) => {
        return <div key={index} className="p-2 z-20 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-700 transition-colors w-full break-words">{item}</div>
      }
      )}
    </div>
  </div>
}

export const SearchIcon = () => {
  return <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13L17 18" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7.5" cy="7.5" r="6.75" stroke="#A7A7A7" strokeWidth="1.5" />
  </svg>
}


// unused code for autocomplete
//
// const getSuggestions = async(search:string)=>{
//   const res = await fetch(`https://unsplash.com/nautocomplete/${search}`,{
//     mode:"no-cors"
//   })
//   const data = await res.json() as {
//     fuzzy: Array<{query: string, priority: number}>,
//     autocomplete: Array<{query: string, priority: number}>,
//     did_you_mean: Array<{query: string, priority: number}>,
//   };
//   return data;
// }
//
// useEffect(() => {
//   if (search.length < 3) {
//     return
//   }
//   if (lastTime.current) {
//     clearTimeout(lastTime.current)
//   }
//   lastTime.current = setTimeout(async () => {
//     const data = await getSuggestions(search)
//     const suggestions = [...data.fuzzy, ...data.autocomplete, ...data.did_you_mean].map((item) => item.query)
//     setSuggestions(suggestions)
//   }, 500)
// }, [search])
