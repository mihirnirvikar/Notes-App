const addNotes = document.querySelector('.addNotes');
const popupForm = document.querySelector('.form-popup-card');
const popupCloseBtn = document.querySelector('.popup-close-btn');



const dateInput = document.getElementById('validationCustom04');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

addNotes.addEventListener('click', () => {
    popupForm.style.display = 'block';
})

popupCloseBtn.addEventListener('click', (e) => {
    popupForm.style.display = 'none';
})

document.addEventListener('click', (e) => {
  if (
    popupForm.style.display === 'block' &&
    !popupForm.contains(e.target) &&
    !addNotes.contains(e.target)
  ) {
    popupForm.style.display = 'none';
  }
});
