import { isEmpty } from 'lodash';
import defaultHeader from './defaultHeader';

const getBaseUrl = ({ isOld = true, app, base }) => {

  if (!app && !isEmpty(base)) {
    return base;
  }

  if (!isEmpty(base)) {
    return base;
  }

  if (isOld) {
    return app.old_base_url;
  }

  return '';
}

export default apiGet = ({isOld = true, base = '', app, route, needHaeder = false}) => {

  console.log(`${getBaseUrl({ app, isOld, base })}${route}`);
  
  return fetch(`${getBaseUrl({ app, isOld, base })}${route}`, {
    method: 'get',
    headers: needHaeder ? defaultHeader : {},
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err);
    throw new Error(err);
  });
}