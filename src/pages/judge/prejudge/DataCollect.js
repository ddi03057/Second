function DataCollect(){
  return(
    <>
    {/* 헤더 */}
    <div class="container">
        <div class="content">
            <div class="content-body">
                <div class="content-top">
                    <p class="top-tit"><strong>자료 수집을</strong> 위해<br />
                        <strong>입력해야할 내용</strong>이 있습니다.
                    </p>
                </div>
                <div class="section">
                    <ul class="sele-list type02">
                        <li class="item"> 
                            <div class="question-wrap txt-wrap">
                                <p class="txt fc-6">
                                    사업자 번호
                                </p>
                            </div>
                            <div class="form-group">
                                <div class="sele-list type01 radius answer-wrap">
                                    <div class="item">
                                        <input type="number" name="text01" id="text01_01" placeholder="사업자 번호"/>
                                    </div>
                                    <div class="btn-wrap">
                                        <button type="reset" class="btn btn-sm btn-reset"><span class="blind">재작성</span></button>
                                    </div>
                                </div>
                                <span class="sm-txt info">주민등록상 행정구역을 선택해주세요.</span>
                            </div>
                        </li>
                        <li class="item">
                            <div class="question-wrap txt-wrap">
                                <p class="txt fc-6">
                                    시,도
                                </p>
                            </div>

                            <div class="sele-list type01 radius answer-wrap mar-t10">
                                <div class="item">
                                    <label class="ui-select">
                                        <select name="sSel" id="sSel1" disabled="">
                                            <option value="">선택불가</option>
                                            <option value="">선택1</option>
                                            <option value="">선택2</option>
                                        </select>
                                        <span class="radio"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <div class="question-wrap txt-wrap">
                                <p class="txt fc-6">
                                    시,군,구
                                </p>
                            </div>

                            <div class="sele-list type01 radius answer-wrap mar-t10">
                                <div class="item">
                                    <label class="ui-select">
                                        <select name="sSel" id="sSel1" disabled="">
                                            <option value="">선택불가</option>
                                            <option value="">선택1</option>
                                            <option value="">선택2</option>
                                        </select>
                                        <span class="radio"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 푸터 다음 */}
        </div>
    </div>
    </>
  )
}
export default DataCollect;