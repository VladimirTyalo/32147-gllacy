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

  function addModalCloseListener() {
    btnFeedbackClose.addEventListener("click", function (ev) {
      ev.preventDefault();
      toggleModal();
    });
  }


  function addListeners() {

    sliderLabel1.addEventListener("click", function (ev) {
      ev.preventDefault();
      body.classList.remove("index-color3");
      body.classList.remove("index-color2");
      body.classList.add("index-color1");
      sliderControl1.checked = true;
      sliderControl2.checked = false;
      sliderControl3.checked = false;
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
      toggleModal();
    });

    window.addEventListener("keydown", function (ev) {
      if (ev.keyCode === 27) {
        if(!feedbackModal.classList.contains("hidden")){
          toggleModal();
        }
      }
    });

  }

})();
