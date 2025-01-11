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

// LEAVE THIS FOR NOW< NEED TO RESEARCH MORE (easier if this is React)
async function fetchCommentById() {
  const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;
  console.log(id);
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

async function handleDeleteComment() {
  // Joe gave me the idea for getting id from setting a dataset to comment
  const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;

  // this is a rework of this https://medium.com/@tejasshahade5/how-to-post-data-to-the-server-using-fetch-method-b961ae18d6fb
  try {
    const response = await fetch('http://localhost:8080/comments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

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

function createButton(className) {
  const button = document.createElement('i');
  button.className = className;
  return button;
}

// Had to make this function because I need to create a comment for every item that is looped from the fetch, but also need to create a comment on a a submit so no point writing it twice
function createComment(comment) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.dataset.id = comment.id;

  const username = createParagraph('username', comment.name);
  const commentText = createParagraph('description', comment.description);

  const formattedDate = new Intl.DateTimeFormat('en-GB').format(
    new Date(comment.created_at)
  );

  // https://stackoverflow.com/questions/60672126/how-to-format-a-javascript-date-object-using-intl-datetimeformat
  const commentDate = createParagraph('date', formattedDate);
  const deleteButton = createButton('fa-solid fa-xmark delete-btn');

  deleteButton.addEventListener('click', handleDeleteComment);

  commentDiv.appendChild(username);
  commentDiv.appendChild(commentText);
  commentDiv.appendChild(commentDate);
  commentDiv.appendChild(deleteButton);

  commentContainer.appendChild(commentDiv);
}
