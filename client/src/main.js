const addCommentForm = document.querySelector('.add-comment-form');
const commentContainer = document.querySelector('.comment-container');

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
  createComment(data);

  addCommentForm.reset();
};

const BASE_URL = 'http://localhost:8080';

const fetchComments = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  const data = await response.json();
  data.forEach((comment) => createComment(comment));
};

fetchComments();
addCommentForm.addEventListener('submit', handleFormSubmit);

// Make reusable function to create paragraph tag as it makes more sense than to keep using document.createElement for all three p tags
function createParagraph(className, text) {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  return p;
}

// Had to make this function because I need to create a comment for every item that is looped from the fetch, but also need to create a comment on a a submit so no point writing it twice
function createComment(comment) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';

  const username = createParagraph('username', comment.name);
  const commentText = createParagraph('description', comment.description);
  const commentDate = createParagraph('date', comment.created_at);

  commentDiv.appendChild(username);
  commentDiv.appendChild(commentText);
  commentDiv.appendChild(commentDate);

  commentContainer.appendChild(commentDiv);
}
