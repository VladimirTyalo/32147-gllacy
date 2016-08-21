(function () {
  "use strict";

  var blurArea = document.querySelector(".blur-area");


  var sliderLabel1 = document.getElementById("slider__label1");
  var sliderLabel2 = document.getElementById("slider__label2");
  var sliderLabel3 = document.getElementById("slider__label3");

  var sliderControl1 = document.getElementById("slider__controls1");
  var sliderControl2 = document.getElementById("slider__controls2");
  var sliderControl3 = document.getElementById("slider__controls3");

  var feedbackModal = document.querySelector(".feedback-modal");
  var feedbackWrapper = document.querySelector(".feedback-modal-wrapper");
  var btnFeedback = document.querySelector(".button--feedback-form");
  var btnFeedbackSubmit = document.querySelector(".button--feedback-submit");
  var btnFeedbackClose = document.querySelector(".feedback-modal__icon-close");

  var form = document.querySelector(".feedback-modal");
  var inputName = document.querySelector(".feedback-modal__name");
  var inputEmail = document.querySelector(".feedback-modal__email");
  var inputText = document.querySelector(".feedback-modal__text");


  var BODY_BG_1 = "#9db1a5";
  var BODY_BG_2 = "#508EA3";
  var BODY_BG_3 = "#D4C1B8";

  var USER_BLOCK_BG_1 = "#A7C2B4";
  var USER_BLOCK_BG_2 = "#66B7C6";
  var USER_BLOCK_BG_3 = "#D4C1B8";


  var login = document.getElementsByClassName("user-block__login")[0];
  var search = document.getElementsByClassName("user-block__search")[0];
  var basket = document.getElementsByClassName("user-block__basket")[0];
  var userBlock = [login, search, basket];

  var posts = document.getElementsByClassName("ice-cream-post");
  var body = document.body;


  addListeners();
  handleFeedbackModal();


  function changeBackground(element, color) {
    element.style.background = color;
  }

  function changeAllElementsBackgrond(elements, color) {
    for (var i = 0; i < elements.length; i++) {
      changeBackground(elements[i], color);
    }
  }

  function addPostsListenters(elements, color) {
    if (elements.length <= 0 || !elements) return;
    var baseColor = elements[0].style.background;
    // add listeners on mouseover
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.addEventListener("mouseover", function (ev) {
        ev.preventDefault();
        this.style.background = color;
      });
    }

    // removerlisteners on mouseout
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.addEventListener("mouseout", function (ev) {
        ev.preventDefault();
        this.style.background = baseColor;
      });
    }
  }

  function addFeedbackButtonListener() {
    btnFeedback.addEventListener("click", function (ev) {
      ev.preventDefault();
      toggleModal();
    });
  }

  function toggleModal() {
    feedbackModal.classList.toggle("hidden");
    feedbackModal.classList.toggle("bounce");
    feedbackWrapper.classList.toggle("hidden");
    blurArea.classList.toggle("blur");
  }

  function closeModal() {
    feedbackModal.classList.add("hidden");
    feedbackModal.classList.remove("bounce");
    feedbackWrapper.classList.add("hidden");
    blurArea.classList.remove("blur");
  }

  function addModalCloseListener() {
    btnFeedbackClose.addEventListener("click", function (ev) {
      ev.preventDefault();
      toggleModal();
    });
  }




  function addListeners() {
    if (!sliderControl1 || !sliderControl2 || !sliderControl3) return;
    sliderLabel1.addEventListener("click", function (ev) {
      ev.preventDefault();
      body.classList.add("index-color1");
      body.classList.remove("index-color3");
      body.classList.remove("index-color2");
      sliderControl2.checked = false;
      sliderControl3.checked = false;
      sliderControl1.checked = true;

      changeAllElementsBackgrond(userBlock, USER_BLOCK_BG_1);

      addPostsListenters(posts, BODY_BG_1);
    });

    sliderLabel2.addEventListener("click", function (ev) {
      ev.preventDefault();
      body.classList.remove("index-color1");
      body.classList.remove("index-color3");
      body.classList.add("index-color2");
      sliderControl2.checked = true;
      sliderControl1.checked = false;
      sliderControl3.checked = false;
      changeAllElementsBackgrond(userBlock, USER_BLOCK_BG_2);

      addPostsListenters(posts, BODY_BG_2);
    });

    sliderLabel3.addEventListener("click", function (ev) {
      ev.preventDefault();
      body.classList.remove("index-color1");
      body.classList.remove("index-color2");
      body.classList.add("index-color3");
      sliderControl3.checked = true;
      sliderControl1.checked = false;
      sliderControl2.checked = false;
      changeAllElementsBackgrond(userBlock, USER_BLOCK_BG_3);

      addPostsListenters(posts, BODY_BG_3);
    });
  }

  function handleFeedbackModal() {
    addFeedbackButtonListener();
    addModalCloseListener();

    feedbackWrapper.addEventListener("click", function (ev) {
      ev.preventDefault();
      closeModal();
    });

    window.addEventListener("keydown", function (ev) {
      if (ev.keyCode === 27) {
        if (!feedbackModal.classList.contains("hidden")) {
          closeModal();
        }
      }
    });

    btnFeedbackSubmit.addEventListener("click", function (ev) {
      ev.preventDefault();
      var name = inputName.value;
      var email = inputEmail.value;
      var text = inputText.value;
      var invalidEmail = document.querySelector(".feedback-modal__email:invalid");

      form.classList.remove("bounce");

      if (!name) {
        inputName.classList.add("invalid");
      }

      if (!email || invalidEmail) {
        inputEmail.classList.add("invalid");
      }

      if (!text) {
        inputText.classList.add("invalid");
      }

      if (name && email && text && !invalidEmail) {
        inputName.classList.remove("invalid");
        inputEmail.classList.remove("invalid");
        inputText.classList.remove("invalid");
        form.classList.remove("shake");
        form.submit();
      }
      else {
        form.classList.add("shake");
        setTimeout(function() {
          form.classList.remove("shake");
        }, 1000);
      }

    });

    addInputListener("change", inputName);
    addInputListener("change", inputEmail);
    addInputListener("change", inputText);

  }


  function addInputListener(event, input) {
    input.addEventListener(event, function (ev) {
      ev.preventDefault();
      form.classList.remove("shake");
      input.classList.remove("invalid");
    })
  }


})();
