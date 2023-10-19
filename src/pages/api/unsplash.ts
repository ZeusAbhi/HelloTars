import { OrderBy, createApi } from 'unsplash-js';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let page:number = 1;
  if (req.query.page) {
    page = Number(req.query.page);
  }
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
  });
  const data = await unsplash.photos.list({
    orderBy: OrderBy.POPULAR,
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
