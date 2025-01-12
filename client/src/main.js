const addCommentForm = document.querySelector('.add-comment-form');
const commentContainer = document.querySelector('.comment-container');
const toggleFormButton = document.querySelector('.toggle-form');
const chooseTheme = document.querySelector('.theme-toggler');
let darkMode = localStorage.getItem('dark-mode');

// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://week4-assignment-mqdw.onrender.com';

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(addCommentForm);
  const data = Object.fromEntries(formData);

  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  try {
    if (response.ok) {
      await fetchComments();
      const sound = new Audio('sounds/quick-swhooshing-noise-80898.mp3');
      sound.play();
    } else {
      console.log("Couldn't get comments");
    }
  } catch (error) {
    console.log('Error:', error);
  }

  addCommentForm.reset();
};

addCommentForm.addEventListener('submit', handleFormSubmit);

const fetchComments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/comments`);
    if (response.ok) {
      const data = await response.json();
      commentContainer.innerHTML = '';

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
// async function fetchCommentById() {
//   const commentDiv = this.closest('div');
//   const id = commentDiv.dataset.id;
//   console.log(id);
//   try {
//     const response = await fetch(`${BASE_URL}/comments/${id}`);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {}
// }

async function handleDeleteComment() {
  // Joe gave me the idea for getting id from setting a dataset to comment
  const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;

  // this is a rework of this https://medium.com/@tejasshahade5/how-to-post-data-to-the-server-using-fetch-method-b961ae18d6fb
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
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

function createButton(className, text) {
  const button = document.createElement('i');
  button.className = className;
  button.title = text;
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
  const deleteButton = createButton(
    'fa-solid fa-xmark delete-btn',
    'delete comment'
  );

  deleteButton.addEventListener('click', handleDeleteComment);

  commentDiv.appendChild(username);
  commentDiv.appendChild(commentText);
  commentDiv.appendChild(commentDate);
  commentDiv.appendChild(deleteButton);

  commentContainer.appendChild(commentDiv);
}

// This is a modified version of week 2 assignment
addCommentForm.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    const nameInput = addCommentForm.querySelector('input');
    const description = addCommentForm.querySelector('textarea');

    if (nameInput.value === '' || description.value === '') {
      alert('Fields can NOT be left empty');
      return;
    }

    if (description.value.length < 20) {
      alert('Minimum of 20 characters please');
      return;
    }

    handleFormSubmit(e);
  }
});

toggleFormButton.addEventListener('click', () => {
  if (addCommentForm.classList.contains('hide')) {
    toggleFormButton.textContent = 'Hide form';
    addCommentForm.classList.remove('hide');
  } else {
    toggleFormButton.textContent = 'Show form';
    addCommentForm.classList.add('hide');
  }
});

// Dark mode
const body = document.querySelector('body');

const enableLightMode = () => {
  body.classList.add('light');
  chooseTheme.style.backgroundColor = 'black';
  chooseTheme.textContent = '🌕';
  chooseTheme.style.fontSize = '25px';

  localStorage.setItem('dark-mode', 'enabled');
};

const disableLightMode = () => {
  body.classList.remove('light');
  chooseTheme.style.backgroundColor = 'white';
  chooseTheme.textContent = '☀️';
  chooseTheme.style.fontSize = '25px';
  localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
  enableLightMode(); // set state of darkMode on page load
}

chooseTheme.addEventListener('click', (e) => {
  darkMode = localStorage.getItem('dark-mode'); // update darkMode when clicked
  if (darkMode === 'disabled') {
    enableLightMode();
  } else {
    disableLightMode();
  }
});
