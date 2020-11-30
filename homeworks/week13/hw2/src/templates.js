export function getForm(
  siteKey,
  commentsAreaName,
  FormClassName,
  commentsClassName
) {
  return `
  <div class="commtnts-area ${commentsAreaName}" style="margin: 20px 0;">
    <h1>${siteKey}的留言板</h1>
    <div>
      <form class='${FormClassName}'>
        <div class="form-group">
          <label>暱稱</label>
          <input name='nickname' type="text" class="form-control">
        </div>
        <div class="row align-items-center">
            <div class="form-group col-11">
                <label for="exampleFormControlTextarea1">輸入留言：</label>
                <textarea name='content' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-outline-secondary col col-lg-1">提交</button>
        </div>
      </form>
      <div class='${commentsClassName}'>

      </div>
    </div>
  </div>
`;
}

export function getLoadMoreButton(className) {
  return `<button class="btn btn-block btn-warning ${className}">載入更多</button>`;
}
