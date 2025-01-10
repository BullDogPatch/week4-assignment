const addCommentForm = document.querySelector('.add-comment-form');

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(addCommentForm);
  const data = Object.fromEntries(formData);
  console.log(data);
};

addCommentForm.addEventListener('submit', handleFormSubmit);
