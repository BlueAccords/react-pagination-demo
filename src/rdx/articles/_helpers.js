export const concatParams = function(params) {

  const paramsArr = Object.keys(params).reduce((acc, val) => {
    if(params[val] !== undefined &&
      params[val] !== null) {
      acc.push(val.concat('=', params[val]));
      return acc;
    } else {
      return acc;
    }
  }, [])
  
  return paramsArr.join('&');
}
