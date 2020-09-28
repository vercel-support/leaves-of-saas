export interface IGoodRead {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  averageRating: number;
  publicationDate: string;
}

export interface IGoodReadResponse {
  items: IGoodRead[];
  hasMore: boolean;
}

export interface IGoodreadsResponse {
  search: {
    results: { work: IGoodreadsWork[] };
    results_start: number;
    results_end: number;
    total_results: number;
  };
}

type valueType = 'integer' | 'string';

export interface IGoodReadsValue {
  _: string;
  type: valueType;
}

export interface IGoodReadsAuthor {
  id: IGoodReadsValue;
  name: string;
}

export interface IGoodReadsBook {
  title: string;
  id: IGoodReadsValue;
  author: IGoodReadsAuthor;
  image_url: string;
}

export interface IGoodreadsWork {
  id: IGoodReadsValue;
  average_rating: string;
  best_book: IGoodReadsBook;
  original_publication_year: IGoodReadsValue;
  original_publication_month: IGoodReadsValue;
  original_publication_day: IGoodReadsValue;
}

export interface IGoodReadsArgs {
  search: string;
  skip: number;
  take: number;
}
