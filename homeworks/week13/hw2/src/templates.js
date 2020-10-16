/* eslint-disable */

export function getForm(FormClassName, commentsClassName) {
  return `
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
`
}

export const css = `
  .card {
    margin: 20px;
  }

  .add-comment-form {
    margin-top: 30px;
  }
`

export function getLoadMoreButton(className) {
  return `<button class="btn btn-block btn-warning ${className}">載入更多</button>`
}