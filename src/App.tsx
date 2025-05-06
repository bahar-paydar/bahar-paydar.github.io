import { useEffect, useState } from 'react';
import { dir } from './lib';

import en from './assets/en.json';
import fa from './assets/fa.json';

import './App.sass';


type ProjectItemType = {
  "icon": string,
  "title": string,
  "description": string,
  "link": {
    "label": string,
    "href": string,
  },
};

const content: {
  [key: string]: any
} = {
  'en': en,
  'fa': fa,
};

function App() {
  const [lang, setLang] = useState('en');

  useEffect(()=>{
    const getLanguage = async () => {
      let locale = localStorage.getItem('solacode_locale');
      if(locale && Object.keys(content).includes(locale)){
        change_language(locale);
      } else {
        localStorage.setItem('solacode_locale','en');
      }
    };
    getLanguage();
  },[]);

  const change_language = (new_lang: string) => {
    if(lang!==new_lang){
      setLang(new_lang);
      localStorage.setItem('solacode_locale',new_lang);
      document.dir = dir(new_lang);
    }
  };

  return (
    <>
      <header>
        <section aria-label='Language / زبان' id='lang-wrapper' className={dir(lang)}>
          <button onClick={()=>change_language('en')} className={`body-small color-primary900 lang-button ${lang==='en'?'active-lang':''}`}>English</button>
          <button onClick={()=>change_language('fa')} className={`body-small color-primary900 lang-button ${lang==='fa'?'active-lang':''}`}>فارسی</button>
        </section>
        <img alt='SolaCode' src='/graphics/solacode.png' id='main-logo' />
      </header>

      <section id='banner'>
        <h1 className='display-small color-primary500'>{content[lang].banner.title}</h1>
        <h2 className='body-large color-primary500'>{content[lang].banner.tagline}</h2>
        <section id='banner-actions'>
          <a className='action-link button-typography color-primary500' download={`${content[lang].banner.filename}.pdf`} href={`/resume/${lang}.pdf`} target='blank'>{content[lang].banner.resume}</a>
          <a className='action-link button-typography color-primary500' href="#contact-wrapper">{content[lang].banner.contact}</a>
        </section>
      </section>
      <section className='segment'>
        <h3 className='heading-large color-primary900 segment-title'>{content[lang].about.title}</h3>
        <p className='body-medium color-primary900'>{content[lang].about.content}</p>
      </section>
      <section className='segment'>
        <h3 className='heading-large color-primary900 segment-title'>{content[lang].skills.title}</h3>
        <section id='skills-wrapper'>
          {content[lang].skills.content.map( (skill: string) => <section className='skill-item' key={skill}>
            <img alt='' src='/icons/bookmark.svg' />
            <p className='body-medium color-primary900'>{skill}</p>
          </section> )}
        </section>
      </section>
      <section className='segment'>
        <h3 className='heading-large color-primary900 segment-title'>{content[lang].projects.title}</h3>
        {content[lang].projects.content.map( (project: ProjectItemType) => <section className='project-item'>
          <img className='project-icon' src={project.icon} />
          <section className='project-detail'>
            <h4 className='heading-small color-primary900'>{project.title}</h4>
            <p className='body-medium color-primary900'>{project.description}</p>
            <a className='button-typography color-primary500' href={project.link.href} target='blank'>{project.link.label} <img className='project-more-icon' src={`/icons/more-${dir(lang)}.svg`} /></a>
          </section>
        </section> )}
      </section>
      <section className='segment'>
        <h3 className='heading-large color-primary900 segment-title'>{content[lang].contact.title}</h3>
        <section id='contact-wrapper' dir='ltr'>
          <img src='/graphics/mail.png' />
          <img src='/graphics/phone.png' />
        </section>
      </section>

      <footer>
        <p className='body-small'>{content[lang].footer}</p>
      </footer>
    </>
  )
}

export default App
