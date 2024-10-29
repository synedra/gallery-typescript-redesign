import { Selector } from '~/sections/Filters/Selector.tsx';
import { ClearFilters } from '~/sections/Filters/ClearFilters.tsx';
import { TagsList } from '~/lib/components/Tags';
import { useState } from 'react';
import s from './Filter.module.scss';
import { Categories } from '~/lib/api/tags.ts';
import { WithSelected } from '~/App.tsx';

interface Props extends WithSelected {
  categories: Categories;
}

export const Filter = ({ categories, selected, setSelected }: Props) => {
  const [currCategory, setCurrCategory] = useState<string>(Object.keys(categories)[0]);

 
  return <search>
    <h2 className={s.h2}>Filter results</h2>
    <Selector categories={categories} selected={selected} setSelected = {setSelected} currCategory={currCategory} setCurrCategory={setCurrCategory}/>
    {!currCategory
      ? <em className={s.em}>Select a filter...</em>
      : <>
        <TagsList tags={categories[currCategory]} selected={selected} setSelected={setSelected} mainColor="rgb(32, 41, 58)" invertedColor="white"/>
        {selected.size > 0 && <ClearFilters setSelected={setSelected}/>}
      </>}
  </search>;
}
