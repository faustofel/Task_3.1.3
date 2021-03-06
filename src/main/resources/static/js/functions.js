var listOfallRoles;

function refreshAdminPage() {
    refreshCurrentUser();
    refreshUsersTable();
}

function refreshCurrentUser() {
    fetch("rest/currentUser", { method: "GET" })
        .then(response => response.json())
        .then(currentUser => {
            document.getElementById("currentUserName").innerText = " " + currentUser.userName + " ";
            let roles = "";
            currentUser.roleSet.forEach(role => {
                roles += " " + role.roleName;
            })
            document.getElementById("currentUserRole").innerText = roles;
            if(document.URL.endsWith("user")) {
                document.getElementById("USERNAME").innerText = currentUser.userName;
                document.getElementById("EMAIL").innerText = currentUser.email;
                document.getElementById("NAME").innerText = currentUser.name;
                document.getElementById("LASTNAME").innerText = currentUser.lastname;
                document.getElementById("ROLES").innerText = roles;
            }
        })
}

function refreshUsersTable() {
    
    fetch("rest/roles")
        .then(response => response.json())
        .then(roles => {
            listOfallRoles = roles; // это уже совсем костыль
            fetch("rest/users", { method: "GET" })
                .then(response => response.json())
                .then(users => buildTable(users, roles));
        });

    function buildTable(users, roles){
        let doc = "";
        let index = 0;
        users.forEach(user => doc+=buildRow(user, roles, ++index));
        doc += buttonCreate(roles)
        document.getElementById("tableUsers").innerHTML = doc;
        document.getElementById("createUser").addEventListener("submit", event => createUser(event));
        users.forEach(user => document.getElementById("edtiModal" + user.id).addEventListener("submit", event => updateUser(event)));
    }

    function buildRow(user, roles, index){
        let userRoles = "";
        user.roleSet.forEach(role=>{
            userRoles += " " + role.roleName;
        });
        let row = ` <tr>
                        <th>${index}</th>
                        <td>${user.id}</td>
                        <td>${user.userName}</td>
                        <td> * * * </td>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td>${user.lastname}</td>
                        <td>${userRoles}</td>
                        <td>${buttonEdit(user, roles)}</td>
                        <td>${buttonDelete(user)}</td>
                    </tr>`;
        row += "</tr>";
        return row;
    }

    function buttonCreate(roles) {
        let roleList = "";
        roles.forEach(role => roleList += `<option name="${role.roleName}" value="${role.id}" label="${role.roleName}"></option>`);
        let button = `<td colspan="10">`;
        //BUTTON
        button += `<button  type="button"
                            class="btn btn-success col-12"
                            data-bs-toggle="modal"
                            data-bs-target="#createModal">CREATE NEW USER</button>`
        //MODAL
        button += `<div  class="modal fade"
                         id="createModal"
                         tabindex="-1"
                         aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">CREATE NEW USER</h5>
                                </div>
                                <form id="createUser">
                                    <div class="modal-body">
                                        <table class="table">
                                            <form id="userForm">
                                                <tr>
                                                    <th class="text-end">USERNAME</th>
                                                    <td><input class="form-control" type="text" name="userName" placeholder="USERNAME" required/></td>
                                                </tr>
                                                <tr>
                                                    <th class="text-end">PASSWORD</th>
                                                    <td><input class="form-control" type="text" name="password" placeholder="Password1!" required/></td>
                                                </tr>
                                                <tr>
                                                    <th class="text-end">E-MAIL</th>
                                                    <td><input class="form-control" type="text" name="email" placeholder="user@email.srv"/></td>
                                                </tr>
                                                <tr>
                                                    <th class="text-end">NAME</th>
                                                    <td><input class="form-control" type="text" name="name" placeholder="NAME"/></td>
                                                </tr>
                                                <tr>
                                                    <th class="text-end">LASTNAME</th>
                                                    <td><input class="form-control" type="text" name="lastname" placeholder="LASTNAME"/></td>
                                                </tr>
                                                <tr>
                                                    <th class="text-end">ROLES :</th>
                                                    <td>
                                                        <select name="roleId"  class="form-select" multiple>
                                                            ${roleList}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </form>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">CREATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>`
        //END MODAL
        button +=`</td>`;

        return button;
    }

    function buttonEdit(user) {
        let roleList = "";
        listOfallRoles.forEach(role => {
            let selected = "";
            user.roleSet.forEach( rl => {if(rl.id == role.id) selected = "selected=true";})
            roleList += `<option name="${role.roleName}" value="${role.id}" label="${role.roleName}" ${selected}></option>`;
        });
        //BUTTON
        let button = `<button   type="button"
                                class="btn btn-warning col-12"
                                data-bs-toggle="modal"
                                data-bs-target="#edtiModal${user.id}">EDIT</button>`
        //MODAL
        button += `<div  class="modal fade"
                         id="edtiModal${user.id}"
                         tabindex="-1"
                         aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">EDIT USER ${user.userName}</h5>
                                </div>
                                <form id="updateUser">
                                    <div class="modal-body">
                                        <table class="table">
                                            <tr>
                                                <th class="text-end">ID</th>
                                                <input class="form-control" type="text" name="id" value="${user.id}" hidden/>
                                                <td>${user.id}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">USERNAME</th>
                                                <td><input class="form-control" type="text" name="userName" value="${user.userName}" required/></td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">PASSWORD</th>
                                                <td><input class="form-control" type="text" name="password" /></td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">E-MAIL</th>
                                                <td><input class="form-control" type="text" name="email" value="${user.email}" required/></td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">NAME</th>
                                                <td><input class="form-control" type="text" name="name" value="${user.name}" required/></td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">LASTNAME</th>
                                                <td><input class="form-control" type="text" name="lastname" value="${user.lastname}" required/></td>
                                            </tr>
                                            <tr>
                                                <th class="text-end">ROLES :</th>
                                                <td>
                                                    <select name="roleId"  class="form-select" multiple>
                                                        ${roleList}
                                                    </select>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>`
        //END MODAL
        button +=`</td>`;

        return button;
    }

    function buttonDelete(user) {
        //BUTTON
        let button = `<button   type="button" 
                                class="btn btn-danger col-12" 
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal${user.id}">DELETE</button>`;
        //MODAL
        button += `<div class="modal fade" id="deleteModal${user.id}" tabindex="-1" aria-hidden="true">
                       <div class="modal-dialog"><div class="modal-content">
                           <div class="modal-header"><h5 class="modal-title">DELETE USER</h5></div>
                               <div class="modal-body">DO YOU WANT TO DELETE USER : ${user.userName}</div>
                               <div class="modal-footer">
                                    <button type="button" 
                                            class="btn btn-secondary" 
                                            data-bs-dismiss="modal">Close</button>
                                    <button type="button" 
                                            class="btn btn-primary" 
                                            data-bs-dismiss="modal"  
                                            onclick="deleteUser(${user.id})">DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        //END MODAL

        return button;
    }
}

function deleteUser(id) {
    fetch(`rest/deleteUser/${id}`, {method: "DELETE"}).then(() => refreshAdminPage());
}

function createUser(event) {

    event.preventDefault();

    let user = {}
    let roleSet = new Array();
    let formData = new FormData(event.target);

    formData.getAll("roleId").forEach( id => listOfallRoles.forEach(role=> {if(id==role.id)roleSet.push(role)}));
    formData.forEach((value, key) => {if(key!="roleId") user[key] = value});
    user.roleSet = roleSet;

    fetch(`rest/createUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(() => refreshAdminPage());
}

function updateUser(event) {

    event.preventDefault();

    let user = {}
    let roleSet = new Array();
    let formData = new FormData(event.target);

    formData.getAll("roleId").forEach( id => listOfallRoles.forEach(role=> {if(id==role.id)roleSet.push(role)}));
    formData.forEach((value, key) => {if(key!="roleId") user[key] = value});
    user.roleSet = roleSet;

    Object.keys(user).forEach(key => console.log(key + " " + user[key]));

    fetch(`rest/updateUser`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(() => refreshAdminPage());
}

