import axios from 'axios';

export async function checkIfIsAuthAndRefreshToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const { expires_in, created_at, refresh_token } = JSON.parse(token);

  if (new Date().getTime() >= (expires_in * 1000) + created_at) {
    try {
      const credentials = await getRefreshedToken(refresh_token, 'refresh_token');
      localStorage.setItem('token', JSON.stringify({ refresh_token, ...credentials }));
      localStorage.setItem('recarregou', String(new Date()));
      return true;
    } catch (err) {
      return false;
    }
  }
  return true;
}

export async function load() {
  const auth = JSON.parse(localStorage.getItem('token')).access_token;
  const { data: { courses } } = await axios.get('https://classroom.googleapis.com/v1/courses', {
    headers: { Authorization: 'Bearer ' + auth }
  });
  const coursesArray = await Promise.all(courses.map(async course => {
    const response = await axios.get(`https://classroom.googleapis.com/v1/courses/${course.id}/courseWork`, {
      headers: { Authorization: 'Bearer ' + auth }
    });
    return { name: course.descriptionHeading, ...response.data };
  }));

  let worksArray = [];
  coursesArray.map(course => {

    if (course.courseWork) {
      course.courseWork.map(work => {

        // Change the dueDate and dueTime to the local timezone
        if (work.dueDate) {
          const gmt = new Date(
            work.dueDate.year,
            work.dueDate.month,
            work.dueDate.day,
            work.dueTime.hours ? work.dueTime.hours : 0,
            work.dueTime.minutes ? work.dueTime.minutes : 0,
          );
          const localTimestamp = gmt.getTime() - gmt.getTimezoneOffset() * 60000;
          const localDueDate = new Date(localTimestamp);

          work.dueDate.day = localDueDate.getDate();
          work.dueDate.month = localDueDate.getMonth();
          work.dueDate.year = localDueDate.getYear();

          work.dueTime.hours = localDueDate.getHours();
          work.dueTime.minutes = localDueDate.getMinutes();

        }

        worksArray = [...worksArray, { course: course.name, ...work }];

      });
    }
  });
  return worksArray;
}

export async function handleGoogleResponse({ code }, setIsAuth) {
  try {
    const credentials = await getRefreshedToken(code, 'code');
    localStorage.setItem('token', JSON.stringify(credentials));
    setIsAuth(true);
  } catch (err) {
  }
}

/**
 *
 * @param {String} code Google oAuth2 code (if it's the first time using the app) or the refresh token
 * @param {String} type 'code' or 'refresh_token'
 */

export async function getRefreshedToken(code, type) {
  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    [type]: code,
    client_id: '550789364569-ppnjnsifhsj3e3vs97o5v38c5ect8r5u.apps.googleusercontent.com',
    client_secret: 'EDCK2AZUCWmmWjWjmIPTD-Pk',
    grant_type: type === 'code' ? 'authorization_code' : 'refresh_token',
    redirect_uri: 'http://localhost:3000'
  });
  return { created_at: new Date().getTime(), ...data };

}
