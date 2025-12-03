const API_BASE = 'https://YOUR-BACKEND-NAME.onrender.com/api'; // 🔥 CHANGED: Replaced localhost with Render backend URL
let token = localStorage.getItem('token');

// Page load check
window.onload = () => {
    // Add loading animation to body
    document.body.classList.add('fade-in');

    if (token) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("registerBox").style.display = "none";
        document.getElementById("mainApp").style.display = "block";
        // Load data with a slight delay for smooth animation
        setTimeout(() => {
            displayPasswords();
            displayPins();
        }, 500);
    } else {
        document.getElementById("loginBox").style.display = "block";
    }
};

// Show register
function showRegister() {
    document.getElementById("loginBox").classList.add("slide-up");
    setTimeout(() => {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("registerBox").style.display = "block";
        document.getElementById("registerBox").classList.add("slide-up");
    }, 300);
}

// Show login
function showLogin() {
    document.getElementById("registerBox").classList.add("slide-up");
    setTimeout(() => {
        document.getElementById("registerBox").style.display = "none";
        document.getElementById("loginBox").style.display = "block";
        document.getElementById("loginBox").classList.add("slide-up");
    }, 300);
}

// Register
async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const button = document.querySelector("#registerBox button");

    if (!username || !password) {
        showError("Please fill all fields!");
        return;
    }

    if (password.length < 6) {
        showError("Password must be at least 6 characters!");
        return;
    }

    // Show loading
    button.classList.add("loading");
    button.textContent = "Registering...";

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            showSuccess("Registered successfully! Please login.");
            document.getElementById("regUsername").value = "";
            document.getElementById("regPassword").value = "";
            setTimeout(() => showLogin(), 1500);
        } else {
            showError(data.error || "Registration failed");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    } finally {
        button.classList.remove("loading");
        button.textContent = "Register";
    }
}

// Login
async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const button = document.querySelector("#loginBox button");

    if (!username || !password) {
        showError("Please fill all fields!");
        return;
    }

    // Show loading
    button.classList.add("loading");
    button.textContent = "Logging in...";

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            showSuccess("Login successful!");

            // Smooth transition to main app
            document.getElementById("loginBox").style.transform = "scale(0.95)";
            document.getElementById("loginBox").style.opacity = "0";

            setTimeout(() => {
                document.getElementById("loginBox").style.display = "none";
                document.getElementById("registerBox").style.display = "none";
                document.getElementById("mainApp").style.display = "block";
                document.getElementById("mainApp").classList.add("fade-in");
                displayPasswords();
                displayPins();
            }, 500);
        } else {
            showError(data.error || "Login failed");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    } finally {
        button.classList.remove("loading");
        button.textContent = "Login";
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
async function savePassword() {
    let site = document.getElementById("siteName").value;
    let user = document.getElementById("userName").value;
    let pass = document.getElementById("password").value;
    const button = document.querySelector("#passwordTab .input-box button");

    if (!site || !user || !pass) {
        showError("Please fill all fields!");
        return;
    }

    if (pass.length < 4) {
        showError("Password must be at least 4 characters!");
        return;
    }

    // Encrypt password
    const encryptedPass = CryptoJS.AES.encrypt(pass, token).toString();

    // Show loading
    button.classList.add("loading");
    button.textContent = "Saving...";

    try {
        const res = await fetch(`${API_BASE}/passwords`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ site, username: user, password: encryptedPass })
        });

        if (res.ok) {
            clearPasswordFields();
            displayPasswords();
            showSuccess("Password saved successfully!");
            // Add animation to new item
            setTimeout(() => {
                const items = document.querySelectorAll('.password-item');
                if (items.length > 0) {
                    items[items.length - 1].classList.add('fade-in');
                }
            }, 100);
        } else {
            const data = await res.json();
            showError(data.error || "Failed to save password");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    } finally {
        button.classList.remove("loading");
        button.textContent = "Save Password";
    }
}

function clearPasswordFields() {
    document.getElementById("siteName").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
}

// --------- DISPLAY PASSWORDS ----------
async function displayPasswords() {
    let search = document.getElementById("searchPassword").value?.toLowerCase() || "";
    let container = document.getElementById("passwordList");

    // Show loading spinner
    container.innerHTML = '<div class="spinner"></div>';

    try {
        const res = await fetch(`${API_BASE}/passwords`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
            container.innerHTML = "";
            const filteredData = data.filter(x =>
                x.site.toLowerCase().includes(search) ||
                x.username.toLowerCase().includes(search)
            );

            if (filteredData.length === 0 && data.length > 0) {
                container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No passwords match your search.</p>';
                return;
            }

            filteredData.forEach((item, index) => {
                // Decrypt password
                const decryptedPass = CryptoJS.AES.decrypt(item.password, token).toString(CryptoJS.enc.Utf8);
                const itemDiv = document.createElement('div');
                itemDiv.className = 'password-item';
                itemDiv.style.animationDelay = `${index * 0.1}s`;
                itemDiv.innerHTML = `
                    <p><strong>Site:</strong> ${item.site}</p>
                    <p><strong>User:</strong> ${item.username}</p>
                    <p><strong>Password:</strong> ${decryptedPass}</p>
                    <div class="actions">
                        <button onclick="copyText('${decryptedPass}')">Copy</button>
                        <button onclick="editPassword('${item._id}', '${item.site}', '${item.username}', '${decryptedPass}')">Edit</button>
                        <button onclick="deletePassword('${item._id}')">Delete</button>
                    </div>
                `;
                container.appendChild(itemDiv);
            });

            if (data.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No passwords saved yet. Add your first password above!</p>';
            }
        } else {
            container.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">Failed to load passwords. Please try again.</p>';
        }
    } catch (err) {
        container.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">Network error. Please check your connection.</p>';
    }
}

// --------- SAVE PIN ----------
async function savePin() {
    let category = document.getElementById("pinCategory").value;
    let pin = document.getElementById("pinValue").value;
    let sessionOnly = document.getElementById("pinSession").checked;
    const button = document.querySelector("#pinTab .input-box button");

    if(!category || !pin){
        showError("Please fill both fields!");
        return;
    }

    if (pin.length < 4) {
        showError("PIN must be at least 4 characters!");
        return;
    }

    // Encrypt pin
    const encryptedPin = CryptoJS.AES.encrypt(pin, token).toString();

    // Show loading
    button.classList.add("loading");
    button.textContent = "Saving...";

    try {
        const res = await fetch(`${API_BASE}/pins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category, pin: encryptedPin, sessionOnly })
        });

        if (res.ok) {
            clearPinFields();
            displayPins();
            showSuccess("PIN saved successfully!");
            // Add animation to new item
            setTimeout(() => {
                const items = document.querySelectorAll('#pinList .password-item');
                if (items.length > 0) {
                    items[items.length - 1].classList.add('fade-in');
                }
            }, 100);
        } else {
            const data = await res.json();
            showError(data.error || "Failed to save PIN");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    } finally {
        button.classList.remove("loading");
        button.textContent = "Save PIN";
    }
}

function clearPinFields(){
    document.getElementById("pinCategory").value = "";
    document.getElementById("pinValue").value = "";
    document.getElementById("pinSession").checked = false;
}

// --------- DISPLAY PINS ----------
async function displayPins(){
    let search = document.getElementById("searchPin").value?.toLowerCase() || "";
    let container = document.getElementById("pinList");

    // Show loading spinner
    container.innerHTML = '<div class="spinner"></div>';

    try {
        const res = await fetch(`${API_BASE}/pins`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
            container.innerHTML = "";
            const filteredData = data.filter(x => x.category.toLowerCase().includes(search));

            if (filteredData.length === 0 && data.length > 0) {
                container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No PINs match your search.</p>';
                return;
            }

            filteredData.forEach((item, index) => {
                // Decrypt pin
                const decryptedPin = CryptoJS.AES.decrypt(item.pin, token).toString(CryptoJS.enc.Utf8);
                const itemDiv = document.createElement('div');
                itemDiv.className = 'password-item';
                itemDiv.style.animationDelay = `${index * 0.1}s`;
                itemDiv.innerHTML = `
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>PIN:</strong> ${decryptedPin}</p>
                    <div class="actions">
                        <button onclick="copyText('${decryptedPin}')">Copy</button>
                        <button onclick="editPin('${item._id}', '${item.category}', '${decryptedPin}', ${item.sessionOnly})">Edit</button>
                        <button onclick="deletePin('${item._id}')">Delete</button>
                    </div>
                `;
                container.appendChild(itemDiv);
            });

            if (data.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No PINs saved yet. Add your first PIN above!</p>';
            }
        } else {
            container.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">Failed to load PINs. Please try again.</p>';
        }
    } catch (err) {
        container.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">Network error. Please check your connection.</p>';
    }
}

// --------- COPY ----------
async function copyText(text){
    try {
        await navigator.clipboard.writeText(text);
        showSuccess("Copied to clipboard!");
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccess("Copied to clipboard!");
    }
}

// --------- DELETE ----------
async function deletePassword(id){
    if (!confirm("Are you sure you want to delete this password?")) return;

    try {
        const res = await fetch(`${API_BASE}/passwords/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            displayPasswords();
            showSuccess("Password deleted successfully!");
        } else {
            showError("Failed to delete password");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    }
}

async function deletePin(id){
    if (!confirm("Are you sure you want to delete this PIN?")) return;

    try {
        const res = await fetch(`${API_BASE}/pins/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            displayPins();
            showSuccess("PIN deleted successfully!");
        } else {
            showError("Failed to delete PIN");
        }
    } catch (err) {
        showError("Network error. Please try again.");
    }
}

// --------- EDIT ----------
async function editPassword(id, site, username, password){
    let newSite = prompt("Edit Site:", site);
    let newUser = prompt("Edit Username:", username);
    let newPass = prompt("Edit Password:", password);

    if(newSite && newUser && newPass){
        const encryptedPass = CryptoJS.AES.encrypt(newPass, token).toString();
        try {
            const res = await fetch(`${API_BASE}/passwords/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ site: newSite, username: newUser, password: encryptedPass })
            });
            if (res.ok) {
                displayPasswords();
                showSuccess("Password Updated!");
            } else {
                alert("Error updating password");
            }
        } catch (err) {
            alert("Error updating password");
        }
    }
}

async function editPin(id, category, pin, sessionOnly){
    let newCategory = prompt("Edit Category:", category);
    let newPin = prompt("Edit PIN:", pin);

    if(newCategory && newPin){
        const encryptedPin = CryptoJS.AES.encrypt(newPin, token).toString();
        try {
            const res = await fetch(`${API_BASE}/pins/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ category: newCategory, pin: encryptedPin, sessionOnly })
            });
            if (res.ok) {
                displayPins();
                showSuccess("PIN Updated!");
            } else {
                alert("Error updating PIN");
            }
        } catch (err) {
            alert("Error updating PIN");
        }
    }
}

// --------- THEME ----------
function toggleTheme(){
    document.body.classList.toggle("light-theme");
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.style.transform = 'rotate(180deg) scale(1.2)';

    setTimeout(() => {
        themeBtn.style.transform = '';
    }, 300);

    // Save theme preference
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    showSuccess(`Switched to ${isLight ? 'light' : 'dark'} theme!`);
}

// --------- PASSWORD STRENGTH INDICATOR ----------
document.getElementById('regPassword').addEventListener('input', function() {
    const password = this.value;
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (password.length === 0) {
        strengthIndicator.style.display = 'none';
        return;
    }

    strengthIndicator.style.display = 'block';

    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Lowercase letter');

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Uppercase letter');

    // Number check
    if (/\d/.test(password)) strength += 1;
    else feedback.push('Number');

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedback.push('Special character');

    // Remove previous classes
    strengthBar.className = '';

    if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ff4757';
    } else if (strength <= 4) {
        strengthBar.classList.add('strength-medium');
        strengthText.textContent = 'Medium strength';
        strengthText.style.color = '#ffa500';
    } else {
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = 'Strong password!';
        strengthText.style.color = '#2ed573';
    }
});

// --------- LOGOUT ----------
function resetApp(){
    if(confirm("Are you sure you want to logout? All unsaved changes will be lost.")){
        localStorage.removeItem('token');
        showSuccess("Logged out successfully!");
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// --------- KEYBOARD SHORTCUTS ----------
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to save in active tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab.id === 'passwordTabBtn') {
            savePassword();
        } else if (activeTab.id === 'pinTabBtn') {
            savePin();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        document.getElementById('searchPassword').value = '';
        document.getElementById('searchPin').value = '';
        displayPasswords();
        displayPins();
    }
});

// --------- AUTO-SAVE SEARCH ----------
let searchTimeout;
function debounceSearch(func, wait) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(func, wait);
}

document.getElementById('searchPassword').addEventListener('input', () => {
    debounceSearch(displayPasswords, 300);
});

document.getElementById('searchPin').addEventListener('input', () => {
    debounceSearch(displayPins, 300);
});

// --------- SUCCESS ALERT ----------
function showSuccess(msg){
    let alertBox = document.getElementById("successAlert");
    alertBox.innerText = msg;
    alertBox.classList.add("show");
    setTimeout(()=>{alertBox.classList.remove("show");},3000);
}

// --------- ERROR ALERT ----------
function showError(msg){
    let alertBox = document.getElementById("errorAlert");
    alertBox.innerText = msg;
    alertBox.classList.add("show");
    setTimeout(()=>{alertBox.classList.remove("show");},4000);
}