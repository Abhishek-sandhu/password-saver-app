const MASTER_KEY = "ps_master";

// Page load check
window.onload = () => {
    if (!localStorage.getItem(MASTER_KEY)) {
        document.getElementById("setupBox").style.display = "block";
    } else {
        document.getElementById("loginBox").style.display = "block";
    }
};

// --------- FIRST TIME MASTER SAVE ----------
function saveMaster() {
    let p1 = document.getElementById("newMaster1").value;
    let p2 = document.getElementById("newMaster2").value;

    if (!p1 || !p2) { alert("Please fill both fields!"); return; }
    if (p1 !== p2) { alert("Passwords do not match!"); return; }

    localStorage.setItem(MASTER_KEY, p1);
    showSuccess("Master Password Created!");
    location.reload();
}

// --------- LOGIN CHECK ----------
function checkMaster() {
    let stored = localStorage.getItem(MASTER_KEY);
    let input = document.getElementById("masterInput").value;

    if (input === stored) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainApp").style.display = "block";
        displayPasswords();
        displayPins();
    } else {
        alert("Wrong Master Password!");
    }
}

// --------- TABS ----------
function showTab(tab) {
    const passwordTab = document.getElementById("passwordTab");
    const pinTab = document.getElementById("pinTab");
    const passwordBtn = document.getElementById("passwordTabBtn");
    const pinBtn = document.getElementById("pinTabBtn");

    if(tab === "password") {
        passwordTab.style.display = "block";
        pinTab.style.display = "none";
        passwordBtn.classList.add("active");
        pinBtn.classList.remove("active");
    } else {
        passwordTab.style.display = "none";
        pinTab.style.display = "block";
        pinBtn.classList.add("active");
        passwordBtn.classList.remove("active");
    }
}

// --------- SAVE PASSWORD ----------
function savePassword() {
    let site = document.getElementById("siteName").value;
    let user = document.getElementById("userName").value;
    let pass = document.getElementById("password").value;

    if (!site || !user || !pass) { alert("Please fill all fields!"); return; }

    let item = { site, user, pass };
    let data = JSON.parse(localStorage.getItem("passwords")) || [];
    data.push(item);
    localStorage.setItem("passwords", JSON.stringify(data));

    clearPasswordFields();
    displayPasswords();
    showSuccess("Password Saved!");
}

function clearPasswordFields() {
    document.getElementById("siteName").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
}

// --------- DISPLAY PASSWORDS ----------
function displayPasswords() {
    let data = JSON.parse(localStorage.getItem("passwords")) || [];
    let search = document.getElementById("searchPassword").value?.toLowerCase() || "";
    let container = document.getElementById("passwordList");

    container.innerHTML = "";
    data.filter(x => x.site.toLowerCase().includes(search) || x.user.toLowerCase().includes(search))
        .forEach((item,index) => {
        container.innerHTML += `
            <div class="password-item">
                <p><strong>Site:</strong> ${item.site}</p>
                <p><strong>User:</strong> ${item.user}</p>
                <p><strong>Password:</strong> ${item.pass}</p>
                <div class="actions">
                    <button onclick="copyText('${item.pass}')">Copy</button>
                    <button onclick="editPassword(${index})">Edit</button>
                    <button onclick="deletePassword(${index})">Delete</button>
                </div>
            </div>
        `;
    });
}

// --------- SAVE PIN ----------
function savePin() {
    let category = document.getElementById("pinCategory").value;
    let pin = document.getElementById("pinValue").value;
    let sessionOnly = document.getElementById("pinSession").checked;

    if(!category || !pin){ alert("Please fill both fields!"); return; }

    let item = { category, pin };
    if(sessionOnly){
        let data = JSON.parse(sessionStorage.getItem("pins")) || [];
        data.push(item);
        sessionStorage.setItem("pins", JSON.stringify(data));
    } else {
        let data = JSON.parse(localStorage.getItem("pins")) || [];
        data.push(item);
        localStorage.setItem("pins", JSON.stringify(data));
    }

    clearPinFields();
    displayPins();
    showSuccess("PIN Saved!");
}

function clearPinFields(){
    document.getElementById("pinCategory").value = "";
    document.getElementById("pinValue").value = "";
    document.getElementById("pinSession").checked = false;
}

// --------- DISPLAY PINS ----------
function displayPins(){
    let localPins = JSON.parse(localStorage.getItem("pins")) || [];
    let sessionPins = JSON.parse(sessionStorage.getItem("pins")) || [];
    let allPins = [...localPins, ...sessionPins];

    let search = document.getElementById("searchPin").value?.toLowerCase() || "";
    let container = document.getElementById("pinList");

    container.innerHTML = "";
    allPins.filter(x => x.category.toLowerCase().includes(search))
        .forEach((item,index) => {
        container.innerHTML += `
            <div class="password-item">
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>PIN:</strong> ${item.pin}</p>
                <div class="actions">
                    <button onclick="copyText('${item.pin}')">Copy</button>
                    <button onclick="editPin(${index})">Edit</button>
                    <button onclick="deletePin(${index})">Delete</button>
                </div>
            </div>
        `;
    });
}

// --------- COPY ----------
function copyText(text){
    navigator.clipboard.writeText(text);
    showSuccess("Copied to Clipboard!");
}

// --------- DELETE ----------
function deletePassword(index){
    let data = JSON.parse(localStorage.getItem("passwords")) || [];
    data.splice(index,1);
    localStorage.setItem("passwords", JSON.stringify(data));
    displayPasswords();
}

function deletePin(index){
    let localPins = JSON.parse(localStorage.getItem("pins")) || [];
    let sessionPins = JSON.parse(sessionStorage.getItem("pins")) || [];
    let allPins = [...localPins, ...sessionPins];

    allPins.splice(index,1);

    // Separate session & local
    let updatedLocal = allPins.filter(p=>!sessionPins.includes(p));
    let updatedSession = allPins.filter(p=>sessionPins.includes(p));

    localStorage.setItem("pins", JSON.stringify(updatedLocal));
    sessionStorage.setItem("pins", JSON.stringify(updatedSession));
    displayPins();
}

// --------- EDIT ----------
function editPassword(index){
    let data = JSON.parse(localStorage.getItem("passwords")) || [];
    let newSite = prompt("Edit Site:", data[index].site);
    let newUser = prompt("Edit Username:", data[index].user);
    let newPass = prompt("Edit Password:", data[index].pass);

    if(newSite && newUser && newPass){
        data[index] = {site:newSite,user:newUser,pass:newPass};
        localStorage.setItem("passwords", JSON.stringify(data));
        displayPasswords();
        showSuccess("Password Updated!");
    }
}

function editPin(index){
    let localPins = JSON.parse(localStorage.getItem("pins")) || [];
    let sessionPins = JSON.parse(sessionStorage.getItem("pins")) || [];
    let allPins = [...localPins, ...sessionPins];

    let newCategory = prompt("Edit Category:", allPins[index].category);
    let newPin = prompt("Edit PIN:", allPins[index].pin);

    if(newCategory && newPin){
        allPins[index] = {category:newCategory,pin:newPin};

        // Re-split session/local
        let updatedLocal = allPins.filter(p=>!sessionPins.includes(p));
        let updatedSession = allPins.filter(p=>sessionPins.includes(p));

        localStorage.setItem("pins", JSON.stringify(updatedLocal));
        sessionStorage.setItem("pins", JSON.stringify(updatedSession));
        displayPins();
        showSuccess("PIN Updated!");
    }
}

// --------- THEME ----------
function toggleTheme(){
    document.body.classList.toggle("light-theme");
}

// --------- RESET WHOLE APP ----------
function resetApp(){
    if(confirm("This will remove all passwords, pins and master password. Continue?")){
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
}

// --------- SUCCESS ALERT ----------
function showSuccess(msg){
    let alertBox = document.getElementById("successAlert");
    alertBox.innerText = msg;
    alertBox.classList.add("show");
    setTimeout(()=>{alertBox.classList.remove("show");},2000);
}