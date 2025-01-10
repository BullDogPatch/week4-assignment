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
  }).then(() => fetchComments());
  // createComment(data);

  addCommentForm.reset();
};
addCommentForm.addEventListener('submit', handleFormSubmit);

const BASE_URL = 'http://localhost:8080';

// const fetchComments = async () => {
//   const response = await fetch(`${BASE_URL}/comments`);
//   const data = await response.json();
//   // console.log(data);
//   commentContainer.innerHTML = '';
//   data
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .forEach((comment) => createComment(comment));
// };

const fetchComments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/comments`);
    if (response.ok) {
      const data = await response.json();
      commentContainer.innerHTML = ''; // Clear existing comments

      // Sort the comments and render them
      data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .forEach((comment) => createComment(comment));
    } else {
      console.error('Failed to fetch comments');
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

fetchComments();

async function handleDeleteComment() {
  // Joe gave me the idea for getting id from setting a dataset to comment
  const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;

  // this is a rework of this https://medium.com/@tejasshahade5/how-to-post-data-to-the-server-using-fetch-method-b961ae18d6fb
  try {
    const response = await fetch(
      'https://week4-assignment-mqdw.onrender.com/comments',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }
    );

    if (response.ok) {
      await fetchComments();
    }
  } catch (error) {
    console.error('Error during delete request:', error);
  }
}

// Make reusable function to create paragraph tag as it makes more sense than to keep using document.createElement for all three p tags
function createParagraph(className, text) {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  return p;
}

function createButton(className, text) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = text;
  return button;
}

// Had to make this function because I need to create a comment for every item that is looped from the fetch, but also need to create a comment on a a submit so no point writing it twice
function createComment(comment) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.dataset.id = comment.id;

  const username = createParagraph('username', comment.name);
  const commentText = createParagraph('description', comment.description);
  const commentDate = createParagraph('date', comment.created_at);
  const deleteButton = createButton('delete-btn', 'Delete');

  deleteButton.addEventListener('click', handleDeleteComment);

  commentDiv.appendChild(username);
  commentDiv.appendChild(commentText);
  commentDiv.appendChild(commentDate);
  commentDiv.appendChild(deleteButton);

  commentContainer.appendChild(commentDiv);
}
