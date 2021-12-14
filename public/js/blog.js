const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="Blog-title"]').value;
  const body = document.querySelector('textarea[name="Blog-body]').value;
  const likeBtn = document.querySelector();

  const token = await fetch(`/api/BlogPost`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (Response.ok) {
    document.location.replace('/');
  } else {
    alert(respone.statusText);
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
