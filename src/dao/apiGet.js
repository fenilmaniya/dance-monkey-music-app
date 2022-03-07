import defaultHeader from './defaultHeader';

const getBaseUrl = ({ isOld = true, app }) => {

  if (isOld) {
    return app.old_base_url;
  }
}

export default apiGet = ({isOld = true, app, route}) => {
  
  return fetch(`${getBaseUrl({ app })}${route}`, {
    method: 'get',
    headers: defaultHeader,
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err);
    throw new Error(err);
  });
}