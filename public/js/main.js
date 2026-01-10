import * as api from './api.js'

document.addEventListener('DOMContentLoaded', () => {


    // *********** CONSTANTS *************
    const loginForm = document.querySelector('#login-form');
    const logoutBtn = document.querySelector('#logout-button');







    // *********** AUTHENTICATION *************
    if(loginForm) {
        console.log(loginForm)
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const credentials = {
                email: loginForm.querySelector('#login-email').value.trim(),
                password: loginForm.querySelector('#login-password').value.trim()
            }

            try {
                const data = await api.loginAccount(credentials);
                localStorage.setItem('token', JSON.stringify(data.token));
                alert(`User ${data.user.username} successfully logged in.`);

                loginForm.reset();
                location.href = 'dashboard.html';
            } catch(err) {
                alert(`Error: ${err.message}`)
            }
        })
    }
    // (AUTH) LOGOUT
    if(logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if(confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('token');
                location.reload();
            }
        })
    }
    // (AUTH) Gatekeeper
    if(!(window.location.pathname.endsWith('index.html'))) {
        // TODO: create a api/controller that checks if the token is verified/valid and put it on else statement.

        if(!localStorage.getItem('token')) {
            alert('You must be logged in to view this page. Redirecting..')
            window.location.href = 'index.html'
        } else {

        }
    }
    if(window.location.pathname.endsWith('index.html') && localStorage.getItem('token')) {
        alert("You have an existing session. Logging in.");
        location.href = 'dashboard.html';
    }
})