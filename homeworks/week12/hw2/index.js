/* eslint-disable */

// 先設定好參數
const todosDOM = $('.todos');
var status_chosen = 'all';
var is_new_user = true;
// 得到 token
const getUrlString = location.href;
const url = new URL(getUrlString);
const token = url.searchParams.get('token');

// 函式都放這裡

function escape(str){
  return str.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

// 更換 class
function chageClass(eleClassList, before, after) {
  eleClassList.addClass(after);
  eleClassList.removeClass(before);
}

// 得到所有 todo
const getAllTodo = (doms) => [...doms.find('.todo')];

// 加上新 todo
// 一時想不到怎麼更改 input 的 checked 狀態 (用 .prop('checked', 'true') 沒用) ，在此先暴力改變 checked 狀態
function addTodoToDOM(container, todo, done, isPrepend) {
  var checked_status = '';
  if (done) {
    checked_status = 'checked';
  }
  const content = `
    <div class='todo d-flex justify-content-between completed'>
      <div class="d-flex w-100 p-2 form-check">
        <label class="todo-content text-truncate" style="max-width: 500px;">
          <input class="form-check-input" type="checkbox" ${checked_status}/>
          <span>${escape(todo)}</span>    
        </label> 
        <input class="form-control edit-todo__input" value="">
      </div>
      <div class='action d-flex p-2'>
        <div class='edit-todo__btn'>
          <img class='update-todo__btn' src='./edit.png' width="28px" height="28px">
          <img class='edit_ok__btn' src='./edit_ok.png' width="28px" height="28px">
        </div>
        <img class='delete-todo__btn' src='./remove.png' width="28px" height="28px">
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(content);
  } else {
    container.append(content);    
  }
}

// 更改 todo 狀態
function changeTodoStatus(card) {
  card.find('span').toggleClass('done');
  card.find('.update-todo__btn').toggle();
  countStatusNum();
}

// 選擇篩選器 -> active + 隱藏不是的
// d-flex 有點煩，有其他方法可以蓋過嗎？
function chooseStatus(status) {
  // 預設全部 active 關掉 + 全部顯示
  const all_status = [...$('.status__btn').find('button')];
  for (btn of all_status) {
    $(btn).removeClass('active');
  }
  const allTodo = getAllTodo(todosDOM);
  $.map(allTodo, (todo) => {
    $(todo).addClass('d-flex');
    $(todo).show();
  })
  
  // 加上 active 和隱藏
  switch (status) {
    case 'all':
      status_chosen = 'all';
      $(btn).removeClass('active');
      $('.btn-all').addClass('active');
      break;
    case 'done':
      status_chosen = 'done';
      $(btn).removeClass('active');
      $('.btn-done').addClass('active');
      $.map(allTodo, (todo) => {
        if (!$(todo).find('span').hasClass('done')) {
          $(todo).hide();
          $(todo).removeClass('d-flex')
        }
      });
      break;
    case 'not-yet':
      status_chosen = 'not-yet';
      $(btn).removeClass('active');
      $('.btn-not-yet').addClass('active');
      $.map(allTodo, (todo) => {
        if ($(todo).find('span').hasClass('done')) {
          $(todo).hide();
          $(todo).removeClass('d-flex');
        }
      });
      break;
  }
}

// 計算總數量並更新
function countStatusNum() {
  allTodo = getAllTodo(todosDOM);
  all = allTodo.length;
  done = 0;
  $.map(allTodo, (todo) => {
    if ($(todo).find('span').hasClass('done')) done += 1;
  });
  not_yet = all - done;
  
  // 更新
  $('.all-num').text(`(${all})`);
  $('.not-yet-num').text(`(${not_yet})`);
  $('.done-num').text(`(${done})`);
}

// 將現狀打包
function packageTodo() {
  allTodo = getAllTodo(todosDOM);
  var todos = [];
  $.map(allTodo, (todo) => {
    const status = ($(todo).find('span').hasClass('done'))? 'done':'not_yet';
    const content = ($(todo).find('span').text());
    todos.push({
      status: status,
      content: content
    });
  })

  // todos 包成 json 格式
  const todo_nacked = {'content': todos};
  var todos_json
  try {
    todos_json = JSON.stringify(todo_nacked);
  } catch(e) {
    console.log(e);
  }

  // 所有資料包成物件
  const new_todos = {
    contents: todos_json,
    status_chosen: status_chosen
  };
  return new_todos;
}

// 發 request
function pushAPI(method, url, data, cb) {
  $.ajax({
    type: method,
    url: url,
    data: data
  }).done((data) => {
    if(!data.ok) {
      alert(data.message);
      return;
    }
    cb(data);
  })
}

// 如果有東西正在編輯 -> 不能儲存 (加上 notOK class)
function saveOK() {
  const todos = getAllTodo(todosDOM);
  var ok = true;
  $.map(todos, (todo) => {
    if ($(todo).hasClass('editing')) {
      ok = false;
    }
  })
  if (ok) {
    chageClass($('.save'), 'notOK', 'saveOK');
  } else {
    chageClass($('.save'), 'saveOK', 'notOK');
  }
}

// 轉跳頁面
function toOtherPage(token) {
  const new_url = 'http://mentor-program.co/mtr04group6/v61265/week12/todo/index.html?token=' + token;
  document.location.href = new_url;
}

// 開始活動！

// 拿 api 進來 -> 讀取 todos (篩選狀態、個別內容)
// is_new_user 設定的值帶不出來，求解！
api_url = 'http://mentor-program.co/mtr04group6/v61265/week12/todo/api_get_todos.php?token=' + token;
pushAPI('GET', api_url, packageTodo(), (data) => {
  if (data.exit) {
    // 填入內容和狀態
    datas = JSON.parse(data.contents);
    todos = datas.content;
    $.map(todos, (todo) => {
      if (todo.status === 'done') {
        addTodoToDOM(todosDOM, todo.content, true, false);
        new_todo = $('.todos .todo:last-child');
        changeTodoStatus(new_todo);
      } else {
        addTodoToDOM(todosDOM, todo.content, false, false);
      }
    });

    // 選定 status
    const status_chosen = data.status_chosen;
    chooseStatus(status_chosen);
    is_new_user = false;
    countStatusNum();
  } else {
    const words = ['造一艘火箭', '跟木乃伊決鬥', '或攀登艾菲爾鐵塔'];
    words.forEach(word => addTodoToDOM(todosDOM, word, false, false));
    countStatusNum();
  }
}) 

// 新增 todo
$('.add-todo-form').submit((e) => {
  e.preventDefault();
  if (!$('input[name=content-input]').val()) {
    alert('請輸入內容！');
    return;
  }
  addTodoToDOM(todosDOM, $('input[name=content-input]').val(), false, true);
  $('input[name=content-input]').val("");
  countStatusNum();
})

// 刪除項目
todosDOM.on('click', '.delete-todo__btn', (e) => {
  $(e.target).parent().parent().remove();
  countStatusNum();
})

// 全部清空
$('.delete-all').click(() => {
  todosDOM.empty();
  countStatusNum();
})

// 編輯功能
todosDOM.on('click', '.edit-todo__btn', (e) => {
  let card = $(e.target).parent().parent();
  if (!card.hasClass('todo')) {
    card = card.parent();
  }

  // 先把內容帶過去
  if (card.hasClass('completed')) {
    const content = card.find('span').text().trim();
    card.find('.edit-todo__input').val(content);
  } else {
    const content = card.find('.edit-todo__input').val();
    card.find('span').text(content);
  }

  // 調整 class
  card.toggleClass('editing');
  card.toggleClass('completed');
  saveOK();
})

// 標記 -> 拿掉編輯 & 刪除線 & 顏色
todosDOM.on('click', '.form-check-input', (e) =>{
  const card = $(e.target).parents('.todo');
  changeTodoStatus(card);
})

// 抓到選擇的狀態 -> 傳給 function
$('.status__btn').on('click', 'button, span', (e) => {
  var target;
  if ($(e.target).hasClass('btn')) {
    target = $(e.target);
  } else {
    target = $(e.target).parent('.btn');
  }

  if (target.hasClass('btn-all')) {
    chooseStatus('all');
  } else if (target.hasClass('btn-done')) {
    chooseStatus('done');
  } else {
    chooseStatus('not-yet');
  }
})


// 如果有東西正在編輯 -> alert
$('.container').on('click', '.notOK', () => {
  alert('請確認所有東西都編輯完成再送出！');
})

// 儲存鍵 -> 偵測 token 是否存在 -> 分流 -> 這邊分的有點醜，但用個 boolean 值帶不出來 QQ
$('.container').on('click', '.saveOK', (e) => {
  api_url = 'http://mentor-program.co/mtr04group6/v61265/week12/todo/api_get_todos.php?token=' + token;
  pushAPI('POST', api_url, packageTodo(), (data) => {
    if (!data.exit) {
      api_url = 'http://mentor-program.co/mtr04group6/v61265/week12/todo/api_add_todos.php';
      pushAPI('POST', api_url, packageTodo(), (data) => {
        alert(data.message);
        toOtherPage(data.token);
      })
    } else {
      api_url = 'http://mentor-program.co/mtr04group6/v61265/week12/todo/api_update_todos.php?token=' + token;
      pushAPI('POST', api_url, packageTodo(), (data) => {
        alert(data.message);
      })
    }
  })   
})
