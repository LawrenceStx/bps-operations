

export function renderManageUsers(contentDiv, data) {
    contentDiv.innerHTML = ''

    let content = '';

    // mock table
    // const data = [
    //     {
    //         id: 1,
    //         username: "mark",
    //         email: "marklawrence@gmail.com",
    //         role_id: 2,
    //         created_at: "12-05-25"
    //     },
    //     {
    //         id: 2,
    //         username: "ryan",
    //         email: "ryanterrado@gmail.com",
    //         role_id: 2,
    //         created_at: "12-05-25"
    //     }
    // ]
    console.log(data)
    data.forEach(item => {
        content += `
            <tr data-id=${item.id}>
                <td>${item.id}</td>
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role_id}</td>
                <td>${item.created_at}</td>
                <td>
                    <div class="action-buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </td>
            </tr>
        `
    })

    contentDiv.innerHTML = `
        <h1>Manage Users</h1>

        <button id="add-user">Add New</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role ID</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${content}
            </tbody>
        </table>
    `
}

export function renderDashboard(contentDiv) {
    contentDiv.innerHTML = '';

    contentDiv.innerHTML = `
        <h1>Dashboard</h1>

        yo
    `
}