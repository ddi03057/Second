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