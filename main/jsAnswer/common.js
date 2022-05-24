const url = 'https://www.seongong.me/'

window.addEventListener('load', () => {
  // 로컬스토리지에서 JWT 토큰 조회하기
  const token = localStorage.getItem('auth-token')

  // 토큰이 없으면 회원전용 컨텐츠는 감출 것
  if (!token) {
    const signedElements = document.querySelectorAll('.signed')
    signedElements.forEach(element => {
      element.classList.add('hide')
    })
  }
  // 토큰이 있다면 비회원 전용 컨텐츠는 감출 것
  else {
    const unsignedElements = document.querySelectorAll('.unsigned')
    unsignedElements.forEach(element => {
      element.classList.add('hide')
    })
  }
})
