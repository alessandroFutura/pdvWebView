const queryString = require('query-string');

const parsed = queryString.parse(window.location.search);

const host = 'http://localhost/pdv/api/';
//const host = `http://${window.location.host}/pdv/api/`;
const user_id = parsed.user_id;
const user_session_value = parsed.user_session_value;

export {host, user_id, user_session_value}