function funcOnStart() {
    func1();
    func2();
    func3();
    func4()
}

function func1() {
    document.getElementById("element_01").innerHTML = "<h1>ELEMENT 01</h1>";
}

function func2() {
    fetch("index/getElement_02", { method: "GET" })
        .then( response => response.text())
        .then( text => {
            document.getElementById("element_02").innerHTML = text;
        });
}

function func3() {
    fetch("index/getElement_03", { method: "GET" })
        .then( response => response.json())
        .then( user => {
            document.getElementById("element_03").innerHTML = "<h1>" + user.userName + " " + user.password + "</h1>";
        });
}

function func4() {
    fetch("index/getElement_04", { method: "GET" })
        .then( response => response.json())
        .then( list => {
            document.getElementById("element_04").innerHTML = listConstructor(list);
        } );
}

function listConstructor(list) {
    let doc = "";
    list.forEach(user => {
        doc += "<p>" + user.userName + " " + user.password + "</p>";
    })
    return doc;
}

async function func5() {

    let user = {
        userName: "NAME",
        password: "PASS"
    };

    console.log("func5!");

    fetch("index/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(() => funcOnStart());


}
