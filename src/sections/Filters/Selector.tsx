import s from './Selector.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { UseStateProps } from '~/lib/prelude.ts';
import { OrderedSet } from 'immutable';
import { Categories } from '~/lib/api/tags.ts';
import { Bubble } from '~/lib/components/Bubble';
import { Consumer } from '~/lib/prelude.ts';

interface Props extends UseStateProps<string, 'currCategory'> {
  categories: Categories,
  selected: OrderedSet<string>,
  setSelected: Consumer<OrderedSet<string>>
}

export const Selector = ({ categories, selected, setSelected, currCategory, setCurrCategory }: Props) => {
  const borderRef = useRef<HTMLDivElement>(null!);
  const [selectedRef, setSelectedRef] = useState<HTMLElement>();

  const [selectedStyle, setSelectedStyle] = useState({ transform: 'scaleX(0)', left: 0 });
  const categoryNames = Object.keys(categories);
  
  const onClick = (category: string) => (e: { currentTarget: HTMLElement }) => {
    setSelectedRef(e.currentTarget);
    setCurrCategory(category);
    setSelected((selected) = selected.has(category) ? selected.delete(category) : selected.add(category));
  }
  
  
  useEffect(() => {
    // Temporary, I swear
    const actualSelectedRef = selectedRef ?? document.querySelector<HTMLElement>(`.${s.list} li button`)!;

    setSelectedStyle(calcUnderline(actualSelectedRef, borderRef.current));
  }, [selected, selectedRef]);

  return <div className={s.wrapper}>
    <header className={s.header}>
      <i className={s.icon}/>
      <ul className={s.list}>{
        categoryNames.map((category) => {
          const numSelected = categories[category].intersect(selected).size;

          return <li key={category} className={clsx(category === currCategory && s.selected)}>
            <button onClick={onClick(category)}>
              <span>{category}</span>
              {/*{numSelected > 0 && <em>{numSelected}</em>}*/}
              {numSelected > 0 && <Bubble number={numSelected} scale={.8}/>}
            </button>
          </li>;
        })
      }</ul>
    </header>
    <div className={s.border} ref={borderRef}>
      <div className={s.borderSelected} style={selectedStyle}/>
    </div>
  </div>;
}

const calcUnderline = (selected: HTMLElement, border: HTMLElement) => ({
  transform: `scaleX(${selected.offsetWidth})`,
  left: selected.offsetLeft - border.offsetLeft,
});
