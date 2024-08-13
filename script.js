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

            `;
    })
}