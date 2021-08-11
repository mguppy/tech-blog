const handlePostEdit = async (event) => {
    event.preventDefault();

    const postId = document.querySelector(".submit").value;
    console.log(postId);

    const comment = document.querySelector("#comment").value;

    console.log(comment);

    if (comment) {
        const responseApp = await fetch(`/editPost/${postId}`, {
            method: "PUT",
            body: JSON.stringify({
                comment: comment,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (responseApp.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to edit or add comment.");
        }
    }
};

document
    .querySelector(".editPostForm")
    .addEventListener("submit", handlePostEdit);