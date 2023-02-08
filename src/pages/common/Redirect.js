//토큰체크
//진행상태체크
//체크되면 navigate

import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginDomain } from "../../modules/common/boxlogin";
import { oslLogin } from "../../modules/common/oslLogin";
import callOpenApi, { authorization } from "../../modules/common/tokenBase";
import AlertModal from "../../modules/components/AlertModal";
import PathConstants from "../../modules/constants/PathConstants";


export default ()=> {
  let tokenYn = false;
  let navigate = useNavigate();
  let [progState, setProgState] = useState("");
  let [routePath, setRoutePath] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    
    if(tokenYn) {
      setProgState("first");
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
    if(!!progState) {
      switch(progState) {
        case "first" :
          navigate(PathConstants.PREJUDGE_CUSTAGREE);
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

    return (
      <AlertModal 
        show={show}
        msg="로그인을 하시겠습니까?"
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
    );
  }
};