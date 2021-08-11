// Delete the clicked post along with the attached interviews and tests
const handlePostDelete = async (event) => {
    event.preventDefault();

const postId = event.target.value;
console.log(postId);

if (postId) {
    const responseApp = await fetch(`/dashboard/${postId}`, {
      method: "DELETE",
    //   body: JSON.stringify({
    //     applicationId: applicationId,
    //   }),
      headers: { "Content-Type": "application/json" },
    });
    if (responseApp.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post.");
      }
    }
};

document.querySelectorAll(".delete").forEach(btn =>{
btn.addEventListener("click", handlePostDelete)
});