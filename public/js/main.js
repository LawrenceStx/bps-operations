import * as render from './render.js'
import * as api from './api.js'

document.addEventListener('DOMContentLoaded', () => {

    // CONSTANTS
    const loginForm = document.querySelector('#login-form')
    const navigationBar = document.querySelector('.nav-wrapper')
    const contentDiv = document.querySelector('#content')

    // GENERAL VARIABLES



    // (NAVIGATION)
    // Pag may new page
    // 1. Set yung event dito
    if(navigationBar) {
        navigationBar.addEventListener('click', async (e) => {
            e.preventDefault()

            const target = e.target
            
            if(target.id === 'nav-accounts') {
                const token = JSON.parse(localStorage.getItem('token'))
                let data = await api.getAllUsers(token)
                render.renderManageUsers(contentDiv, data);
            } else if(target.id === 'nav-dashboard') {
                render.renderDashboard(contentDiv);
            }

            activePage(target.id)
        })
    }


    // (HELPERS)
    function activePage(id) {
        localStorage.setItem('activePage', JSON.stringify(id))
    }
    function renderActive() {
        const savedActive = JSON.parse(localStorage.getItem('activePage')) || null;
        if(savedActive !== null) {
            navigateTo(savedActive)
        } else {
            navigateTo("nav-dashboard")
        }
    }
    renderActive();
    // 2. Set ng endpoint dito
    // END
    function navigateTo(savedActive) {
        if(savedActive === "nav-accounts") {
            render.renderManageUsers(contentDiv);
        } else if(savedActive === "nav-dashboard") {
            render.renderDashboard(contentDiv);
        } 
    }

    async function renderAlways() {
        try {
            if(JSON.parse(localStorage.getItem('activePage')) === 'nav-accounts'){
                const token = JSON.parse(localStorage.getItem('token'))
                let data = await api.getAllUsers(token)
                render.renderManageUsers(contentDiv, data);
            }
        } catch(err) {
            console.error(err)
        }
    }
    renderAlways()






	

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