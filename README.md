# 배포 링크
[✨dev-note](https://dev-note-two.vercel.app/)</br>
</br>

## Dev-Note
 이 웹사이트는 많은 개발자들이 개발한 다양한 프로젝트를 소개하는 공간입니다.</br>
 기술적 역량과 창의성을 발휘한 결과물을 웹사이트에서 공유합니다.</br>
 프로젝트에 사용한 기술 스택을 등록하고, 프로젝트 기간을 설정하며, 각 프로젝트에 대한 상세한 설명을 공유할 수 있습니다.</br>
 </br>
 ![image](https://github.com/user-attachments/assets/fbd2e9ed-053d-4978-98d2-5849b47e58d0)
 </br>

</br>

## 주제 선정 계기
단순 학습용도가 아니라 실생활에서 활용해보고 싶다는 생각에서 시작했습니다.

내일배움캠프에서 여러 프로젝트들을 진행하면서 발표에 참관하지 못하는 다른 팀들의 프로젝트들도 궁금했고, 제 프로젝트들을 한눈에 모아보는 필요성도 느꼈습니다.

</br>

## 구현기능
- 회원관리
  - 로그인 : 유효성 검사로 입력 양식 검증, supabase에 저장된 사용자의 정보와 일치하면 로그인처리
  - 회원가입 : 유효성 검사로 입력 양식 검증, supabase에 입력받은 정보를 저장
  - 정보 수정 : 사용자의 기본키값인 id로 로그인 한 사용자의 정보를 입력받은 값으로 수정
  - 로그아웃 : 사용자가 로그아웃하면 Supabase는 새로 고침 토큰을 취소하고 클라이언트 측에서 JWT를 삭제
  - Context API로 user를 전역 상태 관리
- 게시판
  - 작성 : 썸네일 이미지, 제목, 내용, 기술스택, 진행 기간 등 정보를 입력받아 DB에 저장
  - 수정 : 게시글에서도 작성한 사용자의 id를 가지고 있기 때문에 사용자의 id를 비교해서 작성자만 수정하고 싶은 값 입력하고 수정가능
  - 삭제 : 해당 게시글의 id로 게시글을 식별하고 DB에서 삭제
  - Context API로 posts를 전역 상태 관리
- 메인(home)
  - DB에 저장된 모든 게시물을 불러와서 화면에 뿌리고 게시글 하나하나를 card로 보여줌
  - header와 footer가 존재하고 header는 navBar의 용도로 로그인,회원가입이나 마이페이지로 간단하게 이동 가능
- 게시글 상세
  - 해당 게시글의 id로 한개의 게시글을 가져와 DB에 저장된 column들을 레이아웃과 UI에 맞게 화면에 뿌려줌
  - 이미지 클릭 시 이미지 Enlarge(크게보기) 기능
  - 댓글 등록, 삭제 기능 (작성자만 삭제 가능, 공백만 입력하지 못하게 유효성 검사)
  - 작성자만 게시글 삭제, 수정 버튼이 보이고 클릭 시 이동
- 마이 페이지
  - 상단에 사용자의 정보를 보여주는 UI가 위치하고 아래로는 본인이 작성한 게시글을 월별로 필터링해서 보여줌
</br>

## 팀원 소개
|장성현|김민영|김서연|이정곤|이지영|
|------|---|---|---|---|
| <div align="center">팀장</div> | <div align="center">팀원</div> | <div align="center">팀원</div> | <div align="center">팀원</div> | <div align="center">팀원</div> |
|<img src = "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?t=st=1725346218~exp=1725349818~hmac=72b3e4c11bc115378cf884c168746d11daf33ec1c06c207f61dcda0b1d7f4b5a&w=740" width="100px">|<img src = "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?t=st=1725346402~exp=1725350002~hmac=88febe53a06e89c759a76742c809b0eaf936e9445553f4aea28505ca43af82a4&w=740" width="100px">|<img src = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg?t=st=1725346475~exp=1725350075~hmac=64684866c5006dfdcb2fa2e991dd74c74779712c3b9daa59d608b6989e577f51&w=740" width="100px">|<img src = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611740.jpg?ga=GA1.1.1333528693.1725114102&semt=ais_hybrid" width="100px">|<img src = "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?t=st=1725346567~exp=1725350167~hmac=4d85cfc47889823eedb425a963635dc0e82f09ea2d8783d8151f0f2c0895350e&w=740" width="100px">|

</br>

## 담당 기능
- 장성현 : 로그인, 회원가입, 로그아웃, 회원정보 수정 등 회원관리
- 이정곤 : 마이 페이지 프로필, 개인 게시물 리스트 간략한 정보 표시
- 김민영 : 게시글 작성, 게시글 상세 페이지에서 수정 등 CRUD
- 이지영 : 메인 페이지 전체적인 레이아웃 설정 및 게시글 card 제작
- 김서연 : 게시글 상세 페이지 레이아웃 및 게시글 삭제, 댓글 작성, 삭제

</br>

## 기술 스택
|라이브러리|전역상태관리|DB|
|------|---|---|
| <div align="center">REACT</div> | <div align="center">CONTEXT API</div> | <div align="center">SUPABASE</div> |

|협업도구|개발도구|개발환경|
|------|---|---|
| <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/figma-E51050?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> | <img src="https://img.shields.io/badge/vsCode-147EFB?style=for-the-badge&logo=vsCode&logoColor=white"> | <div align="center"><img src="https://img.shields.io/badge/window-4381C3?style=for-the-badge&logo=window&logoColor=white">,<img src="https://img.shields.io/badge/mac-334455?style=for-the-badge&logo=Mac&logoColor=white"></div> |

</br>

## 주요기능
- 로그인
</br><img src="https://github.com/user-attachments/assets/8f5a4934-4259-4c0e-b29d-6487b1034e88" width="300" height="200"/>

- 로그인 유효성 검사
</br><img src="https://github.com/user-attachments/assets/726e45e4-4b42-4c23-a328-03b5c7cda64e" width="300" height="200"/>

- 회원가입
</br><img src="https://github.com/user-attachments/assets/e1604510-993f-457e-bf0b-a191db7dee03" width="300" height="300"/>

- 회원가입 유효성 검사
</br><img src="https://github.com/user-attachments/assets/a381425a-9449-4a6e-82df-49a381aad5b7" width="300" height="300"/>

- 회원정보
</br><img src="https://github.com/user-attachments/assets/157a9d90-7815-420a-b8f3-97262f1111da" width="300" height="350"/>

- 회원정보수정
</br><img src="https://github.com/user-attachments/assets/0fa8b01a-6b83-4172-9652-14e4ce365157" width="300" height="350"/>

- 메인 페이지
</br> ![메인](https://github.com/user-attachments/assets/fbd2e9ed-053d-4978-98d2-5849b47e58d0)

- 디테일 페이지
  </br> 🔽 Post 삭제, 수정 페이지로의 navigate, 수정사항 반영 기능
</br> ![DevNote-수정삭제기능](https://github.com/user-attachments/assets/f28a3d3a-026b-42be-821a-c43ea53d633f)
  </br> 🔽 댓글 등록 삭제 기능
</br> ![DevNote-댓글 등록 삭제 기능](https://github.com/user-attachments/assets/cc17627a-fca3-405d-9cef-45acd290194f)
 </br> 🔽 비회원일경우 게시물 렌더링 & 댓글 입력 유효성 검사
 </br>![비회원일경우 게시물 렌더링   댓글 입력 유효성 검사](https://github.com/user-attachments/assets/5e059050-b128-4c5d-8b6c-9f5979a707f6)



- 글 등록/수정 페이지
</br> ![스크린샷 2024-09-04 오전 12 46 52](https://github.com/user-attachments/assets/827a76e3-996d-41d9-a663-5f220eaacc03)

</br> ![ImageInput](https://github.com/user-attachments/assets/f645efc9-08aa-45be-9ad5-bf08a4cd4e40)

</br>

- 글 등록 페이지 유효성 검사
</br> ![유효성검사](https://github.com/user-attachments/assets/c798b38e-db62-494f-be82-d91dcd6bb502)

- 마이페이지
</br> <img src="https://github.com/user-attachments/assets/2c61878b-4945-464b-9b38-524b829bf5cf" width="600" height="500"/>
</br> <img src="https://github.com/user-attachments/assets/6edb721d-6e54-48f3-bc65-52b3283dae89" width="600" height="500"/>

</br>

## 팀원 소감
- 김민영 : 도전과제를 많이 하지 못해 아쉽지만 그만큼 다음 프로젝트 때 더 욕심나는 부분이 생긴 것 같다. 여러 컴포넌트에서 공용으로 사용할 수 있는 util성 함수들이나 공용 컴포넌트들을 더 가독성있고 유지보수가 용이하게 만들어보고싶다.
- 김서연 : 대댓글 기능을 구현하지 못한것이 아쉽지만 팀원들과의 코드 공유가 깔끔하고 기능별 분배가 좋았다.
- 이지영 : 쉬운 부분을 구현하기보다 어려운 부분을 맡아서 힘들더라도 공부가 되는것이 낫다고 느꼈다. git 에러를 해결하는 시간이 줄어들어 뿌듯하다.
- 이정곤 : 기능구현에 있어 효율적인 기능을 구현하지 못한것이 아쉬웠지만 이번 협업을 통해 여러가지 경험을 할수 있어 좋았다.
- 장성현 : 성능 개선을 위한 작업이 부족해서 아쉽고, 팀원들끼리 컨벤션이나 git을 통한 협업이 잘 이루어져서 좋았다.


</br>

  ## 🔗협업 링크
  [✨ NOTION](https://www.notion.so/teamsparta/2-2-fbcbe36868a04569a5536a6b5bf3dd62)
  [✨ FIGMA](https)
