import { OrderedSet } from 'immutable';

export type Categories = Record<string, Tags>;
export type Tags = OrderedSet<string>;

type CategoriesDTO = {
  _id: string,
  tags: string[]
}[];


const processCategories = (categories: CategoriesDTO): Categories => 
  categories.reduce((acc, { _id, tags }) => ({ ...acc, [_id]: OrderedSet(tags) }), {});


export const fetchCategories = () =>
  fetch('/.netlify/functions/getTags')
    .then(res => res.json())
    .then(processCategories);