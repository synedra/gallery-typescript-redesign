import { OrderedSet } from 'immutable';
import { Tags } from '~/lib/api/tags.ts';

export interface CardInfo {
  title: string,
  tags: Tags,
  description: string,
  icon: string,
  codeRoot: string,
}

interface CardInfoDTO {
  title: string,
  tags: Tags,
  description: string,
  icon: string,
  codeRoot: string,
}

const processCards = (cards: CardInfoDTO[]): CardInfo[] =>
  cards.map((dto) => ({
    title: dto.title,
    tags: OrderedSet(dto.tags),
    description: dto.description,
    icon: dto.icon,
    codeRoot: dto.codeRoot,
  })
);

export const fetchCards = (tags: Tags) =>
  fetch('/.netlify/functions/getApps?tag=' + tags.join(','))
    .then(res => res.json())
    .then(processCards);
