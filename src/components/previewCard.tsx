import { Card, CardFooter, CardHeader } from "@/shadcn/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/ui/sheet";
import { Skeleton } from "@/shadcn/ui/skeleton";
import Image from "next/image"
import { useState } from "react";

type PreviewCardProps = {
  photo: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  },
  likes: number,
  author: {
    name: string,
    photo: string
    at: string,
    bio?: string,
    location?: string
  },
  desc: string
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  photo,
  likes,
  author,
  desc
}) => {
  const [clicked, setClicked] = useState(false)

  return <>
    <Sheet open={clicked} onOpenChange={setClicked}>
      <SheetContent side="bottom" className="flex flex-col">
        <img src={photo.full} alt="preview" className="max-h-[60vh] w-full object-cover object-center" width="100%" height="0" sizes="100vw" />
        <i className="text-end">{desc}</i>
        <SheetDescription>
          <div className="flex flex-col items-center gap-2 justify-start py-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col font-poppins">
                <Image src={author.photo} alt="author" className="h-20 w-20 rounded-full" width="0" height="0" sizes="100vw" />
                {author.name}
                <p className="text-slate-600 italic">@{author.at}</p>
              </div>
              <div className="flex flex-col font-poppins flex-1">
                {author.bio}
              </div>
              <div className="flex flex-col font-poppins">
                <LikeSVG /> {likes}
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
    <Card className="h-max m-2" onClick={() => {
      setClicked(true)
    }}>
      <CardHeader>
        <Image src={photo.regular} alt="preview" className="h-auto w-full" width="0" height="0" sizes="100vw" />
      </CardHeader>
      <CardFooter>
        <div className="flex flex-1 items-center gap-2 justify-start float-left">
          <Image src={author.photo} alt="author" className="h-8 w-8 rounded-full" width="0" height="0" sizes="100vw" />
          <div className="flex flex-col font-poppins">
            {author.name}
            <p className="text-slate-600 italic">@{author.at}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center float-right">
          <LikeSVG /> {likes}
        </div>
      </CardFooter>
    </Card>
  </>
}

const LikeSVG = () => {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.36328 10.7042L6.17161 12.1042C6.40495 12.3375 6.92995 12.4542 7.27995 12.4542H9.49662C10.1966 12.4542 10.9549 11.9292 11.1299 11.2292L12.5299 6.97086C12.8216 6.15419 12.2966 5.45419 11.4216 5.45419H9.08828C8.73828 5.45419 8.44661 5.16252 8.50495 4.75419L8.79661 2.88752C8.91328 2.36252 8.56328 1.77919 8.03828 1.60419C7.57161 1.42919 6.98828 1.66252 6.75495 2.01252L4.36328 5.57086" className="dark:stroke-[#7F7F7F] stroke-[#4F4F4F]" strokeMiterlimit="10" />
    <path d="M1.38843 10.7042V4.98748C1.38843 4.17082 1.73843 3.87915 2.55509 3.87915H3.13843C3.95509 3.87915 4.30509 4.17082 4.30509 4.98748V10.7042C4.30509 11.5208 3.95509 11.8125 3.13843 11.8125H2.55509C1.73843 11.8125 1.38843 11.5208 1.38843 10.7042Z" className="dark:stroke-[#7F7F7F] stroke-[#4F4F4F]" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export default PreviewCard
