const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value;
  const post = document.querySelector('#blog-text').value;
  

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (Response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
