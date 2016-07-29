(function () {
    "use strict"

    alert("hello");

    var sliderLabel1 = document.getElementById("slider__label1");
    var sliderLabel2 = document.getElementById("slider__label2");
    var sliderLabel3 = document.getElementById("slider__label3");


    var sliderControl1 = document.getElementById("slider__controls1");
    var sliderControl2 = document.getElementById("slider__controls2");
    var sliderControl3 = document.getElementById("slider__controls3");

    var body = document.body;


    addListeners();


    function addListeners() {
      console.log("add listener");
      sliderLabel1.addEventListener("click", function(ev) {
        ev.preventDefault();
        body.classList.remove("index--color3");
        body.classList.remove("index--color2");
        sliderControl1.checked = true;
        sliderControl2.checked = false;
        sliderControl3.checked = false;
      });

      sliderLabel2.addEventListener("click", function(ev) {
        ev.preventDefault();
        body.classList.remove("index--color3");
        body.classList.add("index--color1");
        sliderControl2.checked = true;
        sliderControl1.checked = false;
        sliderControl3.checked = false;
      });

      sliderLabel3.addEventListener("click", function(ev) {
        ev.preventDefault();
        body.classList.remove("index--color2");
        body.classList.add("index--color3");
        sliderControl3.checked = true;
        sliderControl1.checked = false;
        sliderControl2.checked = false;
      })
    }


})();
