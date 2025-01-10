const addCommentForm = document.querySelector('.add-comment-form');

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(addCommentForm);
  const data = Object.fromEntries(formData);

  fetch('http://localhost:8080/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  addCommentForm.reset();
};

const BASE_URL = 'http://localhost:8080';
const fetchComments = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  const data = await response.json();
  // console.log(data);
  data.forEach((comment) => console.log(comment));
};

fetchComments();

addCommentForm.addEventListener('submit', handleFormSubmit);
