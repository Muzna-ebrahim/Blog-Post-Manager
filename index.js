const BASE_URL = 'http://localhost:3000/posts';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  fetchAndDisplayPosts();
  setupNewPostForm();
  setupEditPostForm();
}

function fetchAndDisplayPosts() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((posts) => {
      renderPostList(posts);
      if (posts.length > 0) {
        loadPostDetails(posts[0].id);
      } else {
        clearPostDetails();
      }
    })
    .catch((err) => console.error('Failed to fetch posts:', err));
}

function renderPostList(posts) {
  const postList = document.getElementById('post-lists');
  postList.innerHTML = '<h2>Blog Posts</h2>'; // reset heading

  posts.forEach((post) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-item';
    postDiv.textContent = post.title;
    postDiv.setAttribute('tabindex', '0'); // accessible focus
    postDiv.addEventListener('click', () => loadPostDetails(post.id));
    postDiv.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadPostDetails(post.id);
      }
    });
    postList.appendChild(postDiv);
  });
}

function loadPostDetails(postId) {
  fetch(`${BASE_URL}/${postId}`)
    .then((res) => {
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    })
    .then((post) => {
      displayPostDetails(post);
      populateEditForm(post);
      showEditForm();
    })
    .catch((err) => console.error('Error loading post details:', err));
}

function displayPostDetails(post) {
  const detailsSection = document.getElementById('post-details');
  detailsSection.innerHTML = `
    <h2>${escapeHtml(post.title)}</h2>
    <p><strong>Author:</strong> ${escapeHtml(post.author)}</p>
    ${post.avatar ? `<img src="${escapeHtml(post.avatar)}" alt="Avatar of ${escapeHtml(post.author)}" class="author-avatar" />` : ''}
    <p>${escapeHtml(post.content)}</p>
  `;
}

function clearPostDetails() {
  const detailsSection = document.getElementById('post-details');
  detailsSection.innerHTML = '<p class="placeholder">Select a post to view its details</p>';
  hideEditForm();
}

function setupNewPostForm() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.value.trim(),
      content: form.content.value.trim(),
      author: form.author.value.trim(),
      avatar: form.avatar.value.trim() || null,
    };

    if (!newPost.title || !newPost.content || !newPost.author) {
      alert('Please fill in all required fields.');
      return;
    }

    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add post');
        return res.json();
      })
      .then(() => {
        form.reset();
        fetchAndDisplayPosts();
      })
      .catch((err) => {
        console.error('Error adding post:', err);
        alert('Failed to add post. Please try again.');
      });
  });
}

function setupEditPostForm() {
  const form = document.getElementById('edit-post-form');
  const cancelBtn = document.getElementById('cancel-edit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const postId = form.dataset.id;
    if (!postId) return;

    const updatedPost = {
      title: form['title'].value.trim(),
      content: form['content'].value.trim(),
    };

    if (!updatedPost.title || !updatedPost.content) {
      alert('Please fill in all required fields.');
      return;
    }

    fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update post');
        return res.json();
      })
      .then(() => {
        fetchAndDisplayPosts();
        hideEditForm();
      })
      .catch((err) => {
        console.error('Error updating post:', err);
        alert('Failed to update post. Please try again.');
      });
  });

  cancelBtn.addEventListener('click', () => {
    hideEditForm();
  });
}

function populateEditForm(post) {
  const form = document.getElementById('edit-post-form');
  form.dataset.id = post.id;
  form['title'].value = post.title;
  form['content'].value = post.content;
}

function showEditForm() {
  document.getElementById('edit-post-section').classList.remove('hidden');
}

function hideEditForm() {
  const section = document.getElementById('edit-post-section');
  section.classList.add('hidden');
  const form = document.getElementById('edit-post-form');
  form.dataset.id = '';
  form.reset();
}

// Helper to prevent XSS (escape HTML)
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

