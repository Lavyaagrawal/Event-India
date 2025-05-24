// Test credentials
const TEST_PHONE = '9876543210';
const TEST_OTP = '123456';

// DOM Elements
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const profileSection = document.getElementById('profileSection');
const closeModal = document.querySelector('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const logoutBtn = document.getElementById('logoutBtn');

// Create test user if it doesn't exist
function createTestUser() {
    console.log('Creating test user...');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Current users in localStorage:', users);
    
    const testUser = users.find(u => u.email === 'test@example.com');
    console.log('Found test user:', testUser);
    
    if (!testUser) {
        console.log('Test user not found, creating new test user...');
        const newTestUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'test123'
        };
        users.push(newTestUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Updated users in localStorage:', JSON.parse(localStorage.getItem('users')));
        
        // Create test user profile
        let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        profiles['test@example.com'] = {
            username: 'testuser',
            email: 'test@example.com',
            fullName: 'Test User',
            location: 'Mumbai, India',
            bio: 'This is a test account for EventIndia',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        localStorage.setItem('profiles', JSON.stringify(profiles));
        console.log('Created test user profile:', profiles['test@example.com']);
    } else {
        console.log('Test user already exists');
    }
}

// Show/Hide Modal
loginBtn?.addEventListener('click', () => {
    console.log('Login button clicked');
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable background scroll
});

closeModal?.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Tab Switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}Tab`).classList.add('active');
    });
});

// Profile Dropdown Toggle
profileBtn?.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-section')) {
        profileDropdown?.classList.remove('show');
    }
});

function getInitials(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function setProfileBtnAvatar(profile) {
    const profileBtn = document.querySelector('.profile-btn');
    if (!profileBtn) return;
    let img = profileBtn.querySelector('img');
    let initialsSpan = profileBtn.querySelector('.profile-initials');
    if (profile.avatar && profile.avatar !== 'img/default-avatar.png') {
        if (!img) {
            img = document.createElement('img');
            profileBtn.prepend(img);
        }
        img.src = profile.avatar;
        img.alt = 'Profile';
        if (initialsSpan) initialsSpan.remove();
    } else {
        if (img) img.remove();
        if (!initialsSpan) {
            initialsSpan = document.createElement('span');
            initialsSpan.className = 'profile-initials';
            profileBtn.prepend(initialsSpan);
        }
        initialsSpan.textContent = getInitials(profile.fullName || profile.username);
    }
}

// Login Form Handler
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', { identifier, password });

    // Remove any previous error
    let errorMsg = loginForm.querySelector('.auth-error');
    if (errorMsg) errorMsg.remove();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Available users:', users);
    const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
    console.log('Found user:', user);

    if (user) {
        console.log('Login successful');
        // Load user profile
        let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        let profile = profiles[user.email] || {
            username: user.username,
            email: user.email,
            fullName: user.username,
            location: '',
            bio: '',
            avatar: 'img/default-avatar.png',
        };
        console.log('Loaded user profile:', profile);
        
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            ...profile,
            isLoggedIn: true
        }));
        console.log('Stored current user:', JSON.parse(localStorage.getItem('currentUser')));
        
        // Update UI
        authModal.style.display = 'none';
        loginBtn.style.display = 'none';
        profileSection.style.display = 'block';
        setProfileBtnAvatar(profile);
        window.location.reload(); // Refresh the page to update UI
    } else {
        console.log('Login failed: Invalid credentials');
        // Show error below form
        errorMsg = document.createElement('div');
        errorMsg.className = 'auth-error';
        errorMsg.textContent = 'Invalid credentials';
        loginForm.appendChild(errorMsg);
    }
});

// Signup Form Handler
signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const fullName = document.getElementById('signupFullName').value;

    // Remove any previous error
    let errorMsg = signupForm.querySelector('.auth-error');
    if (errorMsg) errorMsg.remove();

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Check if user already exists
    if (users.some(u => u.email === email || u.username === username)) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'auth-error';
        errorMsg.textContent = 'User already exists';
        signupForm.appendChild(errorMsg);
        return;
    }
    // Add new user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Create user profile with provided fields
    const userProfile = {
        username,
        email,
        fullName,
        avatar: 'img/default-avatar.png',
    };
    let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    profiles[email] = userProfile;
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Switch to login tab
    document.querySelector('[data-tab="login"]').click();
    // Clear signup form
    signupForm.reset();
});

// Logout Handler
logoutBtn?.addEventListener('click', () => {
    // Clear current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Update UI
    loginBtn.style.display = 'block';
    profileSection.style.display = 'none';
    
    // Redirect to home page if not already there
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        window.location.href = 'index.html';
    } else {
        window.location.reload(); // Refresh the page to update UI
    }
});

// Create test user on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    createTestUser();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current user:', user);
    if (user?.isLoggedIn) {
        console.log('User is logged in, updating UI');
        loginBtn.style.display = 'none';
        profileSection.style.display = 'block';
        setProfileBtnAvatar(user);
    }
});

function startOtpTimer(timerId) {
    let timeLeft = 30;
    const timerElement = document.getElementById(timerId);
    
    const timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = '30';
        }
    }, 1000);
}

// Add some CSS for error messages
const style = document.createElement('style');
style.textContent = `
.auth-error {
    color: #d32f2f;
    background: #fff0f0;
    border: 1px solid #d32f2f;
    border-radius: 4px;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    font-size: 0.95em;
    text-align: left;
}
`;
document.head.appendChild(style);

// Add some CSS for profile initials
const initialsStyle = document.createElement('style');
initialsStyle.textContent = `
.profile-btn img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0;
}
.profile-initials {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #6c63ff;
    color: #fff;
    font-weight: 700;
    font-size: 1.1em;
    margin-right: 0;
    user-select: none;
}
.profile-name { display: none !important; }
`;
document.head.appendChild(initialsStyle); 