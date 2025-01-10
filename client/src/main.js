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
  data.forEach((comment) => {
    // will destructure everything out the comment later to make it more readable
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    const username = document.createElement('p');
    username.textContent = comment.name;

    const commentText = document.createElement('p');
    commentText.textContent = comment.description;

    const commentDate = document.createElement('p');
    commentDate.textContent = comment.created_at;

    commentDiv.appendChild(username);
    commentDiv.appendChild(commentText);
    commentDiv.appendChild(commentDate);

    console.log(commentDiv);
  });
};

fetchComments();

addCommentForm.addEventListener('submit', handleFormSubmit);
