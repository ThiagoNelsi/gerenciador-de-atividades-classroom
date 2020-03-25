import React, { useEffect, useState } from 'react';

import Loading from '../Loading';

import { load } from '../../funcs';
import './styles.css';

function Main() {

  const [works, setWorks] = useState();

  useEffect(() => {
    (async () => setWorks(await load()))();
  }, []);

  function handleClickOnCard(id) {
    document.getElementById(id).classList.toggle('clicked');
  }

  if (!works) return <Loading />

  return (
    <div className='main'>
      <div className="todo">
        <h1>Trabalhos</h1>
        <ul>
          {works.map(work => (
            <li id={work.id} key={work.id}>
              <div className="clickable" onClick={() => handleClickOnCard(work.id)}>
                <div className="conclude">
                  <img src={require('../../assets/checked.svg')} alt='check' />
                  <span className='conclude-txt'>Concluída</span>
                </div>
                <div className='card-top'>
                  <span>{work.course}</span>
                  <span>Entrega: {work.dueDate ? `${work.dueDate.day}/${work.dueDate.month}/${work.dueDate.year}` : 'Sem data de entrega'}</span>
                </div>
                <h2>{work.title}</h2>
                <p>{work.description}</p>
              </div>
              <div className="open-on-classroom">
                <a href={work.alternateLink} target='_blank'>
                  <img src={require('../../assets/google-classroom.svg')} alt="google-classroom" />
                </a>
                <a href={work.alternateLink} target='_blank'>
                  <span>Abrir trabalho no Google Classroom</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
