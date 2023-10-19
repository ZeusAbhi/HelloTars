import { createApi } from 'unsplash-js';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let page:number = 1;
  if (req.query.page) {
    page = Number(req.query.page);
  }
  let search:string = '';
  if (req.query.q) {
    search = String(req.query.q);
  }else{
    return res.status(400).json({
      message: 'search query is required',
    });
  }
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
  });
  console.log(search, page)
  const data = await unsplash.search.getPhotos({
    query: search,
    page: page, 
    perPage: 10,
  })
  // console.log(data.response?.results)
  return res.status(data.status).json({
    data: data.response?.results,
    total: data.response?.total,
    page: page,
  });

};
