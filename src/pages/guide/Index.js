import request from "../../modules/utils/Axios";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import PathConstants from "../../modules/constants/PathConstants";
import { useState } from "react";
import { Context1 } from "./../../App.js";
import { useContext } from "react";
import API from "../../modules/constants/API.js";

function Index() {
  let navigate = useNavigate();

  const [jsonData, setJsonData] = useState("");

  let test = useContext(Context1);
  let bizNum = test.objParam.bizNum

  // const IndexPage = async () => {
  //   const res = await request({
  //     method: "post",
  //     url: API.GUIDE.GUIDE_INDEX,
  //     data: {}
  //   }) 
  //   .then((response) => {
  //     console.log(response);
  //     // setJsonData(response);
  //     // navigate(
  //     //       PathConstants.GUIDE_DETAIL,
  //     //       );
  //     return response;
  //   })
  
  //   .catch((error) => {
  //     console.log("error : ", error);
  //   });
  // }

  useLayoutEffect(()=> {
    //IndexPage()
  }, [])

  // console.log(jsonData)
  // if(jsonData === "y") {
  //   //IngYn 사업자번호 response값이 있을때
  //   navigate(
  //     PathConstants.MAIN,
  //     {
  //       state:{
  //         BZN : 12345
  //       }
  //     }
  //     );
  // }else if (jsonData === "n"){
  //   //IngYn 사업자번호 response값이 없을때
  //   navigate(
  //     PathConstants.GUIDE_DETAIL,
  //     {
  //       state:{
  //         BZN : 12345
  //       }
  //     }
  //     );
  // }
  return(
    <>
    <h5>첫페이지</h5>
    </>
  )
}
export default Index;