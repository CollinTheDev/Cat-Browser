document.addEventListener('DOMContentLoaded', () => {
    const submitCodeButton = document.getElementById('submit-code');
    const accessCodeInput = document.getElementById('access-code');
    const codeMessage = document.getElementById('code-message');

    submitCodeButton.addEventListener('click', () => {
        const code = accessCodeInput.value.trim();
        if (code === 'staff6924' || code === 'prem9024') {
            codeMessage.textContent = 'Access granted!';
            codeMessage.style.color = 'green';
            codeMessage.classList.remove('hidden');
        } else {
            codeMessage.textContent = 'Invalid code. Please try again.';
            codeMessage.style.color = 'red';
            codeMessage.classList.remove('hidden');
        }
    });
});
