const addNotes = document.querySelector('.addNotes');
const popupForm = document.querySelector('.form-popup-card');
const popupCloseBtn = document.querySelector('.popup-close-btn');




const dateInput = document.getElementById('validationCustom04');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

addNotes.addEventListener('click', () => {
  popupForm.classList.add('show');
});


popupCloseBtn.addEventListener('click', () => {
  popupForm.classList.remove('show');
});

document.addEventListener('click', (e) => {
  if (
    popupForm.classList.contains('show') &&
    !popupForm.contains(e.target) &&
    !addNotes.contains(e.target)
  ) {
    popupForm.classList.remove('show');
  }
});

