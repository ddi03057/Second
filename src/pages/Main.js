import { useEffect, useState } from "react";
import Detail from "./guide/Detail";
import Progress from "./common/Progress";
import MyLon from "./postmanagement/MyLon";
import TabComponent from "./common/TabComponent";
import PathConstants from "../modules/constants/PathConstants";

function Main(props) {
  const tabList = [
    {
      id: 0,
      link: PathConstants.GUIDE_DETAIL,
      name: "상품안내"
    },
    {
      id: 1,
      link: "",
      name: "나의대출"
    },
    {
      id: 2,
      link: "",
      name: "진행상태"
    }
  ];
  let [tabIdx, setTabIdx] = useState(0); //0,1,2
  useEffect(()=> {
    console.log(tabIdx);
  }, [tabIdx])
  
  return (
    <>
      <TabComponent 
        styleMark="state-mark s-red"
        tabList={tabList}
        tabIdx={tabIdx}
        setTabIdx={setTabIdx}
      />
      {
        (tabIdx === 0)&&
          <Detail />
      }
      {
        (tabIdx === 1)&&
          <MyLon />
      }
      {
        (tabIdx === 2)&&
          <Progress />
      }
    </>
  )
}

export default Main;