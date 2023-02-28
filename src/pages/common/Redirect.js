import { useState, useEffect, useLayoutEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router";
import { TokenContext } from "../../App";
import { oslLogin, oslLogout } from "../../modules/common/oslLogin";
import { isToken } from "../../modules/common/tokenBase";
import AlertModal from "../../modules/components/AlertModal";
import PathConstants from "../../modules/constants/PathConstants";

/**
 * 진입통로
 *  -라우팅 / or /:type("expire")
 *  -세션만료 > oslLogout 에서 href = "/expire"
 *  -box로그인 성공 > redirect.html에서 href = "/"
 */
export default (props)=> {
  let {type} = useParams();
  //const [tokenYn, setTokenYn] = useState(false);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {tokenYn} = useContext(TokenContext);
  const [redirectPath, setRedirectPath] = useState("");
  console.log("type", type);
  console.log("tokenYn", tokenYn);

  useLayoutEffect(()=> {
    console.log("tokenYn>>", tokenYn)
    if(tokenYn !== "Y") {
      handleShow();
    }
    else {
      /**
       * [todo]진행상태 조회해서 진입 페이지세팅
       */
      
    }
  }, []);
  useEffect(()=> {
    if(tokenYn === "Y") {
      navigate(PathConstants.PREJUDGE_CUSTAGREE);
    }
  }, [tokenYn]);

  // useEffect(()=> {
  //   console.log("redirectType>>", redirectType);
  // }, [redirectType]);

  // useEffect(()=> {
    
  //     if(redirectType === "refresh" && type === "refresh") {
  //       navigate(redirectPath,{state: {tabIdx: 21}});
  //     }else {
  //       navigate(redirectPath);
  //     }
    
  // }, [redirectPath]);
  
    
    
  //console.log("authorization", authorization(null));
  // if(!!type) { //토큰있음
  //   switch(type) {
  //     case "first" :
  //       //alert(type);
  //       navigate(PathConstants.PREJUDGE_CUSTAGREE);
  //       break;
  //     case "state" :
  //       navigate(PathConstants.MAIN,{state: {tabIdx: 2}});
  //       break;
  //     default : 
  //       navigate(PathConstants.GUIDE_DETAIL);
  //   }

  // } //토큰없음

  let msg = "로그인을 하시겠습니까?"
  if(type === "refresh") msg = "세션이 종료되었습니다.\n" + msg;
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
              navigate(PathConstants.GUIDE_DETAIL);
            }
        }}
        />
    }
    </>
  );

  
};