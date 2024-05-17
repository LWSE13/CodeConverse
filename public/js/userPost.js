let updateForm = document.querySelector('#update-form');

if (updateForm) {
    updateForm.addEventListener('submit', async (click) => {
        click.preventDefault();

        let updatedPost = {
            title: document.querySelector('#title').value,
            content: document.querySelector('#content').value,
            id: document.querySelector('#update-form').dataset.id
        };

        try {
            const response = await fetch(`/api/posts/${updatedPost.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedPost),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    });
}