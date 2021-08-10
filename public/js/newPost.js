const newPostFormHandler = async (event) => {
    event.preventDefault();

    // Using this template, need to grab the user input values from the application section of newApp
    const title = document.querySelector('#inputTitle').value.trim();
    const content = document.querySelector('#inputContent').value.trim();

    console.log(title);
    console.log(content);

    if (title && content) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to add new application.');
        }
    };
};
    document
        .querySelector('.newAppForm')
        .addEventListener('submit', newPostFormHandler);