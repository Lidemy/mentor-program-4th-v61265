/* eslint-disable */

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let hasEmpty = false;
  let output = '請確認資訊：\n';
  const required = document.querySelectorAll('.required');
  for (const answer of required) {
    const text = answer.querySelector('input[type=text]');
    const radios = answer.querySelectorAll('input[type=radio]');
    if (text) {
      if (!text.value) {
        hasEmpty = true;
        answer.classList.remove('hidden');
      } else {
        answer.classList.add('hidden');
        const title = answer.querySelector('.ques__desc').innerText;
        output += `${title}：${text.value}\n`;
      }
    } else if (radios.length) {
      const hasCheck = [...radios].some(radio => radio.checked);
      if (!hasCheck) {
        hasEmpty = true;
        answer.classList.remove('hidden');
      } else {
        answer.classList.add('hidden');
        const title = answer.querySelector('.ques__desc').innerText;
        const value = answer.querySelector('input[type=radio]:checked').parentNode.innerText;
        output += `${title}：${value}\n`;
      }
    }
  }

  if (hasEmpty) {
    alert('資料填寫不完整，請確認');
  } else {
    alert(output);
  }
});


/*
  //測試 text 是否都有填寫
  const input = document.querySelectorAll('.required input[type="text"]')
  for (let ans of input) {
    let parent = ans.parentNode
    if (!ans.value) {
      hasEmpty = true
      parent.classList.remove('hidden')
    } else {
      parent.classList.add('hidden') //已經有的話好像就不會再加一次ㄌ
      let title = parent.querySelector('.ques__desc').innerText
      output += `${title}：${ans.value}\n`
    }
  }
  //測試 radio >> 先選取上層再選 type=radio 才會有一組一組
  const required = document.querySelectorAll('.required')
  for(let ques of required) {
    let radios = ques.querySelectorAll('input[type=radio]')
    if (!radios.length) continue
    let hasCheck = [...radios].some(radio => radio.checked)
    if (!hasCheck) {
      hasEmpty = true
      ques.classList.remove('hidden')
    } else {
      ques.classList.add('hidden') //已經有的話好像就不會再加一次ㄌ
      let title = ques.querySelector('.ques__desc').innerText
      let value = ques.querySelector('input[type=radio]:checked').parentNode.innerText
      output += `${title}：${value}\n`
    }
  }


})
*/

/*

自己試試看

const warn = document.createElement('div')
warn.classList.add('warn')
warn.innerText = '*這是必填問題*'

document.querySelector('.submit').addEventListener('click', function(e) {
  const answers = document.querySelectorAll('.input__ques input')
  let ans = ''
  for (let i = 0; i < answers.length - 1; i += 1) {
    let parent = answers[i].closest('div')
    if (!(answers[i].value)) {
      e.preventDefault()
      parent.appendChild(warn)
      continue;
    }
    name = document.querySelector('parent .ques__desc')
    value = answers[i].value
    ans += `${name}：${value}`
  }
  alert(ans)
})

遇到的問題：
1. 單選無法辨識
2. 提示字只在最後一個
3. 無法選到題目
*/

/*
看完影片後歸納出的邏輯
1. 提示字直接放在裡面
2. 送出只要得到name就好不用內容物
3. 檢查單選用其他方法
*/
