(function () {
  "use strict";

  var priceRange = document.querySelector(".form__option--price-range");
  var priceStick = document.querySelector(".form__price-range");
  var leftBall   = document.querySelector(".form__left-bound");
  var rightBall  = document.querySelector(".form__right-bound");
  var bound      = document.querySelector(".form__bound");

  var minPriceLabel = document.querySelector(".form__min-price");
  var maxPriceLabel = document.querySelector(".form__max-price");

  var MIN_PRICE = 20;
  var MAX_PRICE = 1000;


  var pressedBall;



  priceStick.addEventListener("click", priceRangeHandler);
  bound.addEventListener("click", priceRangeHandler);

  priceRange.addEventListener("mousedown", priceRangeDownHandler);

  window.addEventListener("mouseup", priceRangeMouseUpHandler, false);



  function priceRangeHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.target.id !== priceStick.id && ev.target.id !== bound.id)return;
    var cursor_x    = ev.clientX;
    var leftCenter  = leftBall.getBoundingClientRect().left + leftBall.offsetWidth * 0.5;
    var rightCenter = rightBall.getBoundingClientRect().left + rightBall.offsetWidth * 0.5;
    var corner      = priceRange.getBoundingClientRect();
    var nearestBall = (Math.abs(cursor_x - leftCenter) < (Math.abs(cursor_x - rightCenter))) ? leftBall : rightBall;

    var deltaWidth = (nearestBall.id === "form__left-bound")? - 1.2 * rightBall.offsetWidth : -1.2 * rightBall.offsetWidth;

    nearestBall.style.left = cursor_x - corner.left + deltaWidth + "px";

    fillBound();
    setPriceLabels();
  }

  function setPriceLabels() {
    var scale = ((MAX_PRICE - MIN_PRICE) / (priceRange.offsetWidth)) ^ 0;
    minPriceLabel.innerHTML = MIN_PRICE + scale * Number.parseInt(leftBall.style.left) || 100;
    maxPriceLabel.innerHTML = MIN_PRICE + scale * Number.parseInt(rightBall.style.left) + rightBall.offsetWidth || 500;
  }


  function priceRangeDownHandler(ev) {
    ev.preventDefault();
    if (ev.target.id !== "form__left-bound" && ev.target.id !== "form__right-bound") return;
    ev.stopPropagation();
    pressedBall = ev.target;
    pressedBall.style.cursor = "grab";
    window.addEventListener("mousemove", priceRangeMoveHandler, false);
  }

  function priceRangeMoveHandler(ev) {
    ev.preventDefault();
    if (!pressedBall) return;
    rangeBounds(priceRange, pressedBall, ev);
  }


  function rangeBounds(priceRange, elem, ev) {
    var corner = priceRange.getBoundingClientRect();

    var rightBound = (elem.id === "form__right-bound") ? corner.right - elem.offsetWidth : rightBall.getBoundingClientRect().left - 0.5 * elem.offsetWidth;

    var leftBound = (elem.id === "form__left-bound") ? corner.left + elem.offsetWidth : leftBall.getBoundingClientRect().right + 0.5 * elem.offsetWidth;

    if (ev.clientX > leftBound && ev.clientX < rightBound) {
      elem.style.left = ev.clientX - corner.left - 1.2 * elem.offsetWidth + "px";
    }

    fillBound();
    setPriceLabels();
  }

  function fillBound() {
    bound.style.left  = leftBall.style.left;
    bound.style.right = Number.parseInt(priceRange.offsetWidth) - Number.parseInt(rightBall.style.left) - 2 * rightBall.offsetWidth + "px";
  }

  function priceRangeMouseUpHandler(ev) {
    ev.preventDefault();
    pressedBall = undefined;
    ev.stopPropagation();
    window.removeEventListener("mousemove", priceRangeMoveHandler);
  }

})();
