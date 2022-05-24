window.addEventListener('load', () => {
  setUserHeader() // 헤더설정

  // 로그아웃
  const buttonSignOut = document.getElementById('sign-out')
  buttonSignOut.addEventListener('click', signOut)

  // 정보 수정
  const buttonEditProfile = document.getElementById('edit-profile')
  buttonEditProfile.addEventListener('click', editProfile)

  // TODO READ
  setTodo()

  // TODO CUD
  const todoListContainer = document.querySelector('div.todo-list-container')
  todoListContainer.addEventListener('click', todoEventController)
  todoListContainer.addEventListener('keypress', todoEventController)
})

function setUserHeader() {
  // 토큰이 존재하면 헤더 설정
  const token = localStorage.getItem('auth-token')
  if (!token) {
    return
  }

  const config = {
    method: 'get',
    url: url + 'jwt',
    headers: {
      'x-access-token': token,
    },
  }

  axios(config)
    .then(res => {
      const nickname = res.data.result.nickname
      document.getElementById('nickname').innerText = nickname
    })
    .catch(err => {
      console.log(err)
    })
}

// TODO Read 이벤트
function setTodo(type) {
  const token = localStorage.getItem('auth-token')
  if (!token) {
    return
  }

  const config = {
    method: 'get',
    url: url + 'todos',
    headers: {
      'x-access-token': token,
    },
  }

  axios(config)
    .then(res => {
      const code = res.data.code
      if (code !== 200) {
        return alert('조회 실패')
      }

      // todo 데이터
      const todos = res.data.result.todos

      // **************** type이 주어져있지 않은 경우 (모든 섹션을 set)
      if (!type) {
        // DOM 추가
        for (todoSection in todos) {
          // ul태그 불어오기
          const container = document.getElementById(todoSection)
          // 각 섹션에 맞는 todo 데이터
          const todoArrayForEachSection = todos[todoSection]
          let result = ''
          // 각 섹션에 맞게 DOM 추가
          for (index in todoArrayForEachSection) {
            const todoElement = todoArrayForEachSection[index]
            const li = getLI(todoElement.todoIdx, todoElement.contents)
            result += li
          }
          container.innerHTML = result
        }
        return
      }
      // ************** type에 해당하는 것만 setTodo하는 작업 *************//
      const container = document.getElementById(type)
      const todoArray = todos[type]
      let result = ''
      for (index in todoArray) {
        const todoElement = todoArray[index]
        const li = getLI(todoElement.todoIdx, todoElement.contents)
        result += li
      }
      container.innerHTML = result
    })
    .catch(err => {
      console.log(err)
    })
}

function getLI(todoIdx, contents) {
  const template = `
    <li class="todo-item" id=${todoIdx}>
      <div class="done-text-container">
        <input type="checkbox" class="todo-done" />
        <p class="todo-text">
          ${contents}
        </p>
      </div>
      <div class="update-delete-container">
        <i class="todo-update fas fa-pencil-alt"></i>
        <i class="todo-delete fas fa-trash-alt"></i>
      </div>
    </li>
    `
  return template
}

// 로그아웃
function signOut(event) {
  localStorage.removeItem('auth-token')
  location.reload()
}

// 정보 수정
function editProfile(event) {
  alert('🛠 개발 중입니다. 🛠')
}

// TODO CUD 이벤트 컨트롤
function todoEventController(event) {
  const token = localStorage.getItem('auth-token')
  if (!token) {
    alert('로그인 후 이용하실 수 있습니다.')
    // location.href = "signin.html";
    return
  }

  const target = event.target
  const eventType = event.type
  const key = event.key
  const tagName = target.tagName

  // create event 처리
  if (tagName === 'INPUT' && key === 'Enter') {
    const contents = event.target.value
    const type = target.closest('div.ul-container').children[1].id
    createTodo(contents, type, token)
    event.target.value = ''
  }

  // update-delete event 처리
  if (tagName === 'I' && eventType === 'click') {
    const className = target.className.split(' ')[0]
    const todoIdx = target.closest('li').id
    const type = target.closest('ul').id

    switch (className) {
      case 'todo-update':
        updateTodo(todoIdx, type, token)
        break
      case 'todo-delete':
        deleteTodo(todoIdx, type, token)
        break
    }
  }

  return
}

function createTodo(contents, type, token) {
  if (!contents) {
    alert('내용을 입력해주세요.')
    return false
  }

  const config = {
    method: 'post',
    url: url + 'todo',
    headers: { 'x-access-token': token },
    data: {
      contents: contents,
      type: type,
    },
  }

  axios(config)
    .then(res => {
      const code = res.data.code
      if (code !== 200) {
        alert('생성 실패')
        return false
      }
      // DOM 업데이트
      setTodo(type)
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

function updateTodo(todoIdx, type, token) {
  const contents = prompt('수정 내용을 입력해주세요.')

  const config = {
    method: 'patch',
    url: url + 'todo',
    headers: { 'x-access-token': token },
    data: {
      todoIdx: todoIdx,
      contents: contents,
    },
  }

  axios(config)
    .then(res => {
      const code = res.data.code
      if (code !== 200) {
        return alert('생성 실패')
      }
      // DOM 업데이트
      setTodo(type)
    })
    .catch(err => {
      console.log(err)
    })
}

function deleteTodo(todoIdx, type, token) {
  const doubleCheck = confirm('삭제할까요? 삭제 후엔 복구가 어렵습니다.')
  if (!doubleCheck) {
    return
  }

  const config = {
    method: 'delete',
    url: url + 'todo/' + todoIdx,
    headers: { 'x-access-token': token },
  }

  axios(config)
    .then(res => {
      const code = res.data.code
      if (code !== 200) {
        return alert('생성 실패')
      }
      // DOM 업데이트
      setTodo(type)
    })
    .catch(err => {
      console.log(err)
    })
}
