import s from './Tag.module.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { WithSelected } from '~/App.tsx';

interface Props extends WithSelected {
  name: string,
  mainColor?: string,
  invertedColor?: string,
}

export const Tag = ({ selected, setSelected, name, mainColor, invertedColor }: Props) => {
  name = name.toLowerCase()
  const onClick = () => setSelected((selected) => selected.has(name) ? selected.delete(name) : selected.add(name));
  
  const isSelected = selected.has(name);

  return <li style={{ '--main': mainColor, '--inverted': invertedColor } as CSSProperties}>
    <button className={clsx(s.tag, isSelected && s.selected)} onClick={onClick}>{name}</button>
  </li>;
}
