const addNotes = document.querySelector(".addNotes");
const popupForm = document.querySelector(".form-popup-card");
const popupCloseBtn = document.querySelector(".popup-close-btn");
const threeDots = document.querySelector(".three-dots");

const dateInput = document.getElementById("validationCustom04");
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

addNotes.addEventListener("click", () => {
  popupForm.classList.add("show");
});

popupCloseBtn.addEventListener("click", () => {
  popupForm.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (
    popupForm.classList.contains("show") &&
    !popupForm.contains(e.target) &&
    !addNotes.contains(e.target)
  ) {
    popupForm.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const optionsHTML = `
    <div class="options-menu" style="
      position: absolute;
      top: 28px;
      right: 8px;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      border-radius: 8px;
      z-index: 998;
      min-width: 140px;
      font-size: 14px;
      max-height: 220px; 
      line-height: 1.4;
      overflow: hidden;
      cursor: pointer;
    ">
      <div class="option" data-action="bookmark" style="padding: 8px 12px; cursor: pointer;">Bookmark</div>
      <hr style="margin: 0; border: none; border-top: 1px solid #ccc;">
      <div class="option" data-action="edit" style="padding: 8px 12px; cursor: pointer;">Edit</div>
      <hr style="margin: 0; border: none; border-top: 1px solid #ccc;">
      <div class="option" data-action="delete" style="padding: 8px 12px; cursor: pointer;">Delete</div>
      <hr style="margin: 0; border: none; border-top: 1px solid #ccc;">
      <div class="option" data-action="share" style="padding: 8px 12px; cursor: pointer;">Share</div>
      <hr style="margin: 0; border: none; border-top: 1px solid #ccc;">
      <div class="option" data-action="archive" style="padding: 8px 12px; cursor: pointer;">Archive</div>
      <hr style="margin: 0; border: none; border-top: 1px solid #ccc;">
      <div class="option" data-action="duplicate" style="padding: 8px 12px; cursor: pointer;">Duplicate</div>
    </div>
  `;

  let activeMenu = null;

  document.querySelectorAll(".three-dots").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();

      if (activeMenu) {
        activeMenu.remove();
        if (activeMenu === dot.nextElementSibling) {
          activeMenu = null;
          return;
        }
      }

      const menuWrapper = document.createElement("div");
      menuWrapper.innerHTML = optionsHTML;
      const menu = menuWrapper.firstElementChild;

      dot.parentElement.appendChild(menu);
      activeMenu = menu;

      menu.querySelectorAll(".option").forEach((option) => {
        option.addEventListener("click", (event) => {
          event.stopPropagation();
          alert(`You clicked "${option.textContent.trim()}"`);
          menu.remove();
          activeMenu = null;
        });
      });
    });
  });

  document.addEventListener("click", () => {
    if (activeMenu) {
      activeMenu.remove();
      activeMenu = null;
    }
  });
});
