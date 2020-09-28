import { IResolvers } from 'apollo-server-micro';
import goodreads from 'goodreads-api-node';

import {
  IGoodRead,
  IGoodReadResponse,
  IGoodReadsArgs,
  IGoodreadsResponse,
  IGoodreadsWork,
} from './models';

const credentials = {
  key: process.env.GOODREADS_KEY,
  secret: process.env.GOODREADS_SECRET,
};

const client = goodreads(credentials);

const findGoodReads = async (
  parent,
  args: IGoodReadsArgs,
  context
): Promise<IGoodReadResponse> => {
  const firstItem = args.skip + 1;
  const lastItem = firstItem + args.take;

  const firstPage = Math.ceil(firstItem / 20.0);
  const lastPage = Math.ceil(lastItem / 20.0);
  const pagesArray: number[] = [];
  for (let page = firstPage; page <= lastPage; page++) {
    pagesArray.push(page);
  }

  const promise: Promise<IGoodreadsResponse[]> = Promise.all(
    pagesArray.map((page: number) =>
      client.searchBooks({
        q: args.search,
        page,
      })
    )
  );

  const result: IGoodreadsResponse[] = await promise;

  const values = result.flatMap((value: IGoodreadsResponse) =>
    value.search.results.work.map(
      (work: IGoodreadsWork): IGoodRead => ({
        id: +work.id._,
        title: work.best_book.title,
        author: work.best_book.author.name,
        imageUrl: work.best_book.image_url,
        averageRating: +work.average_rating,
        publicationDate: !!work.original_publication_year._
          ? `${work.original_publication_year._}-${work.original_publication_month._}-${work.original_publication_day._}`
          : undefined,
      })
    )
  );

  const offset = args.skip - (firstPage - 1) * 20;

  return {
    hasMore: result[0].search.total_results > args.skip + args.take,
    items: values.slice(offset, offset + args.take),
  };
};

const goodReadsResolvers: IResolvers<any, any> = {
  Query: {
    findGoodReads,
  },
};

export { goodReadsResolvers };
