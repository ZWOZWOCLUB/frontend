       // #btn-modal, #modal, .modal-overlay, .close-area

       const modal = document.getElementById("modal") //modal1 창을 가져옴

       function modalOn() { // modal1 창이 보이게 - 바뀜
           modal.style.display = "flex"
       }
       function isModalOn() { // modal1 창이 보이게 - 바뀜
           return modal.style.display === "flex"
       }
       function modalOff() { // modal1 창이 안보이게 - 바뀜
           modal.style.display = "none"
       }

       const btnModal = document.getElementById("btn-modal") //모달버튼1 을 가져옴

       btnModal.addEventListener("click", e => { //모달버튼1 이 클릭되면 modal1 창이 보이게
           modalOn()
       })

       const closeBtn = modal.querySelector(".close-area") // X글자1 가져옴

       closeBtn.addEventListener("click", e => { // X글자1이 클릭되면 modal1 창이 안보이게
           modalOff()
       })
       modal.addEventListener("click", e => { //modal1 창이 클릭되면
           const evTarget = e.target //만약 이 영역이
           if (evTarget.classNameList.contains("modal-overlay")) { //modal-overlay를 포함하고 있다면
               modalOff() // modal1 창이 안보이게
           }
       })
       window.addEventListener("keyup", e => { //ESC 버튼이 눌리면 modal1창을 안보이게
           if (isModalOn() && e.key === "Escape") {
               modalOff()
           }
       })