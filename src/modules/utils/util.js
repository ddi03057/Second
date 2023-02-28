export const getCommaAmt = (x)=> {
  if(!x) return "";
	var resultVal = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return resultVal;
}
export const getDotYmd = (x)=> {
  console.log("getDotYmd", x);
  if(!x) return "";
  if(x.length !== 8) return x;
  else return x.substring(0, 4) + "." + x.substring(4,6) + "." + x.substring(6,8)
}

export const getBsnn = (x)=> {
  if(!x) return "";
  if(x.length !== 10)  {
    return x;
  } else {
    console.log("subs > ", x.substring(0, 5) + "-" + x.substring(5))
    return x.substring(0, 5) + "-" + x.substring(5);
  }
}

/**
 * 만나이 계산
 * @param {*} bStr 
 * @returns 
 */
export const getAge = (bStr)=> {
  console.log(bStr)
  var today = new Date();
  var birthDate = getDate(bStr);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if( m<0 || (m===0 && today.getDate() < birthDate.getDate())){
    age--;
  }
  return age;
}
function getDate(yyyymmdd){
  var year = yyyymmdd.substring(0,4);
  var month = yyyymmdd.substring(4,6);
  var day = yyyymmdd.substring(6,8);
  return new Date(Number(year), Number(month), Number(day)); 
}

/**
 * 단어별 맞춤 조사 선택을 위한 함수
 * @param {*} word 
 * @returns 
 */
export const checkBatchimEnding = (word)=> {
  if (typeof word !== 'string') return null;

  var lastLetter = word[word.length - 1];
  var uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
}