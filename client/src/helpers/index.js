export const formEnter = (callback) => {
  return event => {
    if (event.code === 'Enter') {
      callback();
    }
  }
}

export const formatDatetime = (datetime) => {
  const tmp = new Date(datetime);

  return `${tmp.getHours()}:${tmp.getMinutes()} ${tmp.getDate()}-${tmp.getMonth()}-${tmp.getFullYear()}`;
}

export default {
  formEnter,
  formatDatetime
};