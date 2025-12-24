import * as render from './render.js'
import * as api from './api.js'

document.addEventListener('DOMContentLoaded', () => {

    // CONSTANTS
    const loginForm = document.querySelector('#login-form')
	

    // (AUTH) Login
	if(loginForm) {
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			
			const credentials = {
				username: document.querySelector('#account-username').value.trim(),
				password: document.querySelector('#account-password').value.trim()
			}
			
			try {
				const data = await api.login(credentials)
				alert('Logged in successfully!')
				
                localStorage.setItem('token', JSON.stringify(data.token));
				loginForm.reset()
                location.href = "dashboard.html"
			}
			catch(err) {
				console.error(err)
			} 
		})
	}

    // (AUTH) Gatekeeper
    if(!(window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('login.html')) && !localStorage.getItem('token')) {
        alert('You must be logged in to view this page. Redirecting..')
        window.location.href = 'index.html'
    }
})