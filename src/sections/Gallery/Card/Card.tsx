import s from './Card.module.scss';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { WithSelected } from '~/App.tsx';
import { CardInfo } from '~/lib/api/apps.ts';

export const Card = ({ title, description, tags, icon, codeRoot, selected, setSelected }: CardInfo & WithSelected) => {

const handleGithubClick = (codeRoot:string) => {
  const rawPrefix = "https://raw.githubusercontent.com/";
  const repoPrefix = "https://github.com/";
  const modifiedUrl:string = codeRoot.replace(rawPrefix, repoPrefix).replace('/main', '');
  window.open(modifiedUrl, '_blank', 'noopener,noreferrer');
};

return <article className={s.cardImg} >
    <div className={s.overlay}>
      <Header title={title} icon={icon} tags={tags} description={description} setSelected={setSelected} selected={selected}/>
    </div>
    <div className={s.buttons}>
      <button className={s.tryItNow} onClick={() => handleGithubClick(codeRoot)}>Try It Now</button>
    </div>
    
  </article>
}