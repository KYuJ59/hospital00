# 작업일지



### 로컬에서는 axios가 정상작동하는데 서버에서는 작동하지 않는 건에 대하여
- 상대경로->도메인주소 직접 연결로 해결

### a태그 위로 mousedown->mousemove순으로 이벤트를 잡을때 드래그되지않음
- e.preventDefault()

### mousemove 함수 내에 mouseup이벤트를 삽입했던 건
- mousemove가 실행되는동안 mouseup이벤트가 계속 재등록됨->메모리 누수
- mousedown함수 하위로 이동
- 버튼에게서도 mousedown->up 이벤트가 발생해 currentIndex 갱신이 겹치는거같음
- mousemove시 moveX가 일정거리 이상 이동시 isDragg상태를 부여하고 isDragg=true일때만 드래그 이벤트가 발생하도록 설정

### 이미지나 링크위로 mouse다운시 드래그슬라이드가 안됨......
- user-select:none이 아닌 다른 속성이 있는지 찾아봐야겠음.......

### 네비게이션의 서브메뉴bg가 아무런 이벤트 없이 혼자 block처리되어있는경우가 있음
- 원인이 뭔지 모르겠음......