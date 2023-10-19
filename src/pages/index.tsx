import PreviewCard from '@/components/previewCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { Basic } from 'unsplash-js/dist/methods/photos/types'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import SearchBox from '@/components/searchbox'
import { Loading } from './Loading'

type UnsplashResponse = {
  data: Basic[],
  total: number,
  page: number
}

const fetchPage = async ({ pageParam }: { pageParam: any }) => {
  const res = await fetch(`/api/unsplash?page=${pageParam}`)
  const data: UnsplashResponse = await res.json()
  return data
}

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['unsplash', 'home'],
    queryFn: fetchPage,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page + 1 <= lastPage.total / 10) {
        return lastPage.page + 1
      } else {
        return undefined
      }
    },
    initialPageParam: 1,
  })

  return (
    <main className="flex flex-col items-center w-full h-screen" >
      <div className='min-h-[50vh] flex px-4 py-12 flex-col gap-4 justify-center text-white items-center w-full bg-center bg-cover bg-no-repeat md:min-h-[40vh] bg-[url(https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fit=crop&w=1080&q=80&fit=max)]'>
        <h2 className='font-bold font-montserrat text-4xl text-white text-center'>Download High Quality Images by creators</h2>
        <p className='font-montserrat'> Over 2.4 Million+ Stock Images by our talented community</p>
        <div className='w-4/5 text-black dark:text-white'>
          <SearchBox />
        </div>
      </div>

      {(!data) ? <div className='h-full w-full'>
        <Loading />
      </div> : <div className='h-auto w-full'><ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3 }}
      >
        <Masonry columnsCount={3}>
          {data.pages.map((page) => {
            return page.data.map((item) => {
              return <div className='break-inside-avoid' key={item.id} >
                <PreviewCard photo={item.urls} likes={item.likes} author={{ name: item.user.name, photo: item.user.profile_image.medium, at: item.user.username, bio: item.user.bio || "", location: item.user.location || "" }} desc={item.description || ""} />
              </div>
            }
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
      </div>
      }
      <button disabled={!hasNextPage || isFetchingNextPage} onClick={() => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage()
      }} className="bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-200 px-4 py-2 rounded-md mt-4">
        {(isFetchingNextPage) ? "Loading" : hasNextPage ? "Load More" : "No More Data"}
      </button>
    </main >
  )
}
