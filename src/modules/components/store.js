import { atom } from "jotai";


// function getStore(props) {
//   switch(props) {
//       case 'loanTerm'     : return loanTermList;
//       case 'crdBru'       : return crdBruList;
//       case 'email'        : return emailList;
//       case 'judgeStepNm'  : return arrJudgeStepNm;
//       case 'loanStepNm'   : return arrLoanStepNm
//       case 'page'         : return pageList;
//       //case 'valid1' : return validList1;
//       //case 'valid2' : return validlist2;
//   }
//   return null;
// }

// export default getStore;

export const headerAtom = atom('헤더');