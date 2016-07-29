(function () {
  "use strict"

  var sliderLabel1 = document.getElementById("slider__label1");
  var sliderLabel2 = document.getElementById("slider__label2");
  var sliderLabel3 = document.getElementById("slider__label3");

  var sliderControl1 = document.getElementById("slider__controls1");
  var sliderControl2 = document.getElementById("slider__controls2");
  var sliderControl3 = document.getElementById("slider__controls3");

  var BODY_BG_1 = "#9db1a5";
  var BODY_BG_2 = "#508EA3";
  var BODY_BG_3 = "#D199B5";

  var USER_BLOCK_BG_1 = "#A7C2B4";
  var USER_BLOCK_BG_2 = "#66B7C6";
  var USER_BLOCK_BG_3 = "#EEC8DB";


  var login = document.getElementsByClassName("user-block__login")[0];
  var search = document.getElementsByClassName("user-block__search")[0];
  var basket = document.getElementsByClassName("user-block__basket")[0];
  var userBlock = [login, search, basket];

  var posts = document.getElementsByClassName("ice-cream-post");
  var body = document.body;

  addListeners();

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


})();
