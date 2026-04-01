document.addEventListener("DOMContentLoaded", ()=>{
  const callRequestButtons = document.querySelectorAll("[data-call-request-btn]");
  const callRequestMenu = document.getElementById("call-request-menu");
  if(!callRequestButtons || !callRequestMenu) return;

  const menu = document.getElementById("menu");
  const searchMenu = document.getElementById("search-menu");
  const filterSelects = document.getElementById("filter__selects");


  function closeAllMenus() {
    if (menu) menu.classList.remove("_active");
    if (searchMenu) searchMenu.classList.remove("_active");
    if (callRequestMenu) callRequestMenu.classList.remove("_active");
    if (filterSelects) filterSelects.classList.remove("_active");

    document.body.classList.add("_lock");
  }


  callRequestButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      closeAllMenus();

      // если нужны data-атрибуты
      const source = button.dataset.source;
      if (source) {
        callRequestMenu.setAttribute("data-source", source);
      }

      callRequestMenu.classList.add("_active");
    });
  });
})