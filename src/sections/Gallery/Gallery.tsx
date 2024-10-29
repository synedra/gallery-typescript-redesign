import { Header } from '~/sections/Gallery/Header.tsx';
import { Card } from '~/sections/Gallery/Card/Card.tsx';
import s from './Gallery.module.scss';
import { WithSelected } from '~/App.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '~/lib/api/apps.ts';
import { OrderedSet } from 'immutable';

interface Props extends WithSelected {
  selected: OrderedSet<string>
}

export const Gallery = ({ ...props }: Props)=> {
  const sorted = props.selected.sort();

  const query = useQuery({
    queryKey: ['apps', sorted],
    queryFn: () => fetchCards(sorted),
    gcTime: 0,
  });
  
  if (!query.data) {
    return <em>Loading...</em>;
  }

  return <section>
    <Header numApps={query.data.length} {...props}/>
    <div className={s.cards}>
      {query.data.map((card, i) =>
        <Card {...card} key={i} {...props}/>)}
    </div>
  </section>;
}
