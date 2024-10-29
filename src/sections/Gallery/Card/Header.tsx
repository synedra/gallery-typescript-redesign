import s from './Header.module.scss'
import { TagsList } from '~/lib/components/Tags';
import { WithSelected } from '~/App.tsx';
import { Tags } from '~/lib/api/tags.ts';

interface Props extends WithSelected {
  title: string,
  tags: Tags,
  description: string,
  icon: string
}

export const Header = ({ title, ...props }: Props) =>
  <header className={s.header}>
    <h1 className={s.h3}>{title}</h1>
    <TagsList listClass={s.list} {...props} mainColor="white" invertedColor="rgb(32, 41, 58)"/>
    <span className={s.h3}><img alt={title} src={`https://fusionauth.io${props.icon}`} /> {props.description}</span>
  </header>
