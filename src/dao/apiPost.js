import defaultHeader from './defaultHeader';

const getBaseUrl = ({ isOld = true, app }) => {

  if (isOld) {
    return app.old_base_url;
  }

  return 'https://gaana.com/';
}

export default apiPost = ({ isOld = true, app, route, bodyData = {} }) => {

  console.log(`${getBaseUrl({ isOld, app })}${route}`);
  
  return fetch(`${getBaseUrl({ isOld, app })}${route}`, {
    method: 'post',
    body: JSON.stringify(bodyData)
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err);
    throw new Error(err);
  });
}