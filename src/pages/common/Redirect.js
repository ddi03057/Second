//토큰체크
//진행상태체크
//체크되면 navigate

import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { loginDomain } from "../../modules/common/boxlogin";
import { oslLogin } from "../../modules/common/oslLogin";
import callOpenApi, { authorization } from "../../modules/common/tokenBase";
import AlertModal from "../../modules/components/AlertModal";
import PathConstants from "../../modules/constants/PathConstants";


export default (props)=> {
  let {type} = useParams();
  console.log("type", type);
  let tokenYn = false;
  let navigate = useNavigate();
  let [progState, setProgState] = useState("");
  let [routePath, setRoutePath] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    
    if(tokenYn) {
      setProgState(type);
      //진행상태체크
      let param = {};
      // callOpenApi("", param, successFn, errorFn);
      const successFn = (res)=> {
        setProgState(res.data);
    
      }
      const errorFn = ()=> {
  
      }
      
      if(routePath != "") {
        alert(routePath);
        
      }
    }
  }, []);
  useEffect(()=> {
    console.log("progState", progState);
    if(!!progState) {
      switch(progState) {
        case "first" :
          navigate(PathConstants.PREJUDGE_CUSTAGREE);
          break;
        case "state" :
          navigate(PathConstants.MAIN,{state: {tabIdx: 2}});
          break;
        default : 
          navigate(PathConstants.GUIDE_DETAIL);
      }
    }
  }, [progState]);

  
  
    
    
  console.log("authorization", authorization(null));
  if(authorization(null)) { //토큰있음
    alert("토큰있음");
    tokenYn = true;
    return (
      null
    );

  }else { //토큰없음
    let msg = "로그인을 하시겠습니까?"
    if(type === "expire") msg = "세션이 종료되었습니다.\n" + msg;
    else msg = "로그인이 필요한 서비스입니다.\n" + msg;
    return (
      <>
      {
        show&&
          <AlertModal 
            show={show}
            msg={msg}
            btnNm={["확인", "취소"]}
            onClickFn={(btnIdx) => {
              if(btnIdx === 0) {
                oslLogin();
              }else {
                handleClose();
                navigate(
                  PathConstants.GUIDE_DETAIL
                );
              }
          }}
          />
      }
      </>
    );
  }
};