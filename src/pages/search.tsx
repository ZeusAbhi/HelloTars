import PreviewCard from "@/components/previewCard";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import { Loading } from "./Loading";

type SearchResponse = {
  total: number
  page: number
  data: Photos['results']
};

export default function Search() {
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", router.query.q],
    queryFn: async ({ pageParam }) => {
      if (!router.query.q || router.query.q.length < 3) {
        return null;
      }
      const res = await fetch(`/api/unsplash/search?q=${router.query.q}&page=${pageParam}`)
      const data = await res.json()
      return data as SearchResponse
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return allPages.length + 1
      }
      if (lastPage.page * 10 >= lastPage.total) {
        return undefined
      }
      return lastPage.page + 1
    },
    initialPageParam: 1,
  });
  console.log(data?.pages)


  return (
    <main className="flex flex-col items-center w-screen h-screen" >
      <h1 className="font-bold text-xl">{router.query.q}</h1>
      {(!data) ? <div className='h-full w-full'>
        <Loading />
      </div> : <div className='h-auto w-full'><ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3 }}
      >
        <Masonry columnsCount={3}>
          {data.pages.map((page) => {
            return page?.data?.map((item) => {
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
    </main>
  )
}
