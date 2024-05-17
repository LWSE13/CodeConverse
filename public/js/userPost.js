let updateForm = document.querySelector('#update-form');
let deleteButton = document.querySelector('#delete-button');

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

if (deleteButton) {
    console.log('deleteButton');
    deleteButton.addEventListener('click', async (click) => {
        click.preventDefault();

        let id= document.querySelector('#update-form').dataset.id;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    })
}