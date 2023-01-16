
/**
 * li 하위 텍스트 컴포넌트
 * @param {*} props \
 * showYn
 * textData
 * styleTxt
 * styleInput
 * @returns 
 */
function TextComponent(props) {
  const objTextData = props.textData;
  if(props.showYn) {
    return (
      <div className="form-group">
        <div className={props.styleSeleList}>
          <div className="item">
            <input 
              className={props.styleInput}
              type="text"
              name={`text${objTextData.id}`}  
              id={`text${objTextData.id}`}
              placeholder={objTextData.placeholder}
              onChange={(e) => {
                props.onChangeFn(e.target.value);
              }} 
              value={objTextData.value}
            />
          </div>
          {/* <div className="btn-wrap">
            <button type="reset" className="btn btn-sm btn-reset"><span className="blind">재작성</span></button>
          </div> */}
        </div>
      </div>
    );
  }else {
    return null;
  }
}

export default TextComponent;