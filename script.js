document.getElementById('fetchProfile').addEventListener('click', fetchProfile);
document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchProfile();
    }
})

function fetchProfile() {
    const username = document.getElementById('username').value;
    const profileInfo = document.getElementById('profileInfo');

    // Clear Info
    profileInfo.innerHTML = '';

    // Fetch Profile
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('User not found');
        }
        return response.json();
    })
    .then(data => {
        // Display Info
        profileInfo.innerHTML = `
            <h2>${data.name || "No Name"}</h2>
            <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="100px"">
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Profile URL:</strong> <a href="${data.html_url}"
            target="_blank">${data.html_url}</a></p>
            `;
    })

    // Error Handling
    .catch(error => {
        profileInfo.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;   
    });
}