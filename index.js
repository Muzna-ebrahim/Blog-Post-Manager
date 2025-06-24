const BASE_URL = ' http://localhost:3000/Posts';

// Run main after DOM loads
document.addEventListener('DOMContentLoaded', main);

function main() {
  displayPosts();
  addNewPostListener();
  setUpEditForm();
}

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-lists');
      postList.innerHTML = '<h2>BLOG POSTS</h2>';

      posts.forEach(post => {
        const div = document.createElement('div');
        div.textContent = post.title;
        div.classList.add('post-item');
        div.addEventListener('click', () => handlePostClick(post.id));
        postList.appendChild(div);
      });

      if (posts.length > 0) handlePostClick(posts[0].id);
    })
    .catch(err => console.error('Error loading posts:', err));
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const postDetails = document.getElementById('post-details');
      postDetails.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
         ${post.avatar ? `<img src="${post.avatar}" alt="Author Avatar" style="max-width: 150px; border-radius: 8px;" />` : ''}
        <p>${post.content}</p>
      `;

      const editForm = document.getElementById('edit-post-form');
      document.getElementById('edit-title').value = post.title;
      document.getElementById('edit-content').value = post.content;
      editForm.dataset.id = post.id;
      editForm.classList.remove('hidden');
    })
    .catch(err => console.error('Error fetching post:', err));
}

function addNewPostListener() {
  const form = document.getElementById('New-Post-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value,
      avatar:form.avatar.value
    };

    console.log('Attempting to add post:', newPost);

    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then(res => {
        console.log('POST response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('POST response data:', data);
        form.reset();
        displayPosts();
      })
      .catch(err => console.error('Error creating post:', err));
  });
}


function setUpEditForm() {
  const form = document.getElementById('edit-post-form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const id = form.dataset.id;
    const updatedPost = {
      title: document.getElementById('edit-title').value,
      content: document.getElementById('edit-content').value,
    };

    fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then(res => res.json())
      .then(() => {
        displayPosts();
        form.classList.add('hidden');
      })
      .catch(err => console.error('Error updating post:', err));
  });

  document.getElementById('cancel-edit').addEventListener('click', () => {
    form.classList.add('hidden');
  });
}
