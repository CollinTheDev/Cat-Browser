document.addEventListener('DOMContentLoaded', () => {
    const submitCodeButton = document.getElementById('submit-code');
    const accessCodeInput = document.getElementById('access-code');
    const codeMessage = document.getElementById('code-message');
    const themeSelection = document.getElementById('theme-selection');
    const themeButtons = document.querySelectorAll('.theme-button');
    const userId = 'defaultUser';  // Replace with actual user management if needed

    // Show theme selection if access code is valid
    submitCodeButton.addEventListener('click', () => {
        const code = accessCodeInput.value.trim();
        if (code === 'staff6924' || code === 'prem9024') {
            codeMessage.textContent = 'Access granted!';
            codeMessage.classList.remove('hidden');
            themeSelection.classList.remove('hidden');
        } else {
            codeMessage.textContent = 'Invalid code.';
            codeMessage.classList.remove('hidden');
            themeSelection.classList.add('hidden');
        }
    });

    // Apply selected theme and save to Firestore
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.getElementById('theme-link').href = theme;
            db.collection('users').doc(userId).set({
                theme: theme
            }, { merge: true });
        });
    });

    // Load and apply saved theme
    db.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.theme) {
                document.getElementById('theme-link').href = data.theme;
            }
        }
    });
});
