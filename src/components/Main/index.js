import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

import './styles.css';

function Main() {

  const [works, setWorks] = useState();
  const isAuth = true;

  useEffect(() => {
    if (isAuth) load();
  }, []);

  async function load() {
    const auth = JSON.parse(localStorage.getItem('googleToken')).access_token;
    const { data: { courses } } = await axios.get('https://classroom.googleapis.com/v1/courses', {
      headers: { Authorization: 'Bearer ' + auth }
    });
    console.log(courses);
    const coursesArray = await Promise.all(courses.map(async course => {
      const response = await axios.get(`https://classroom.googleapis.com/v1/courses/${course.id}/courseWork`, {
        headers: { Authorization: 'Bearer ' + auth }
      });
      return { name: course.descriptionHeading, ...response.data };
    }));

    let worksArray = [];
    coursesArray.map(course => {
      if (course.courseWork) {
        course.courseWork.map(w => {
          worksArray = [...worksArray, { course: course.name, ...w }];
        });
      }
    });
    setWorks(worksArray);
    console.log(worksArray);
  }


  function handleClickOnCard(id, target) {
    console.log(target);
    document.getElementById(id).classList.toggle('clicked');
  }


  if (!works) return <div className='loading'><SyncLoader /></div>

  return (
    <div className='main'>
      <div className="todo">
        <h1>Trabalhos</h1>
        <ul>
          {
            works.map(work => (
              <li id={work.id} key={work.id}>
                <div className="clickable" onClick={({ target }) => handleClickOnCard(work.id, target)}>
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
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Main;
