const commentFormHandler = async (event) => {
    event.preventDefault();
    let text = document.querySelector('#comments-form label #message').value;
    if (text) {
        const response = await fetch(`/api/post/${blogId}/comment`, {
            method: 'POST',
            body: JSON.stringify({
                text
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    text.value = "";
}

document
    .querySelector('#comments-form')
    .addEventListener('submit', commentFormHandler);