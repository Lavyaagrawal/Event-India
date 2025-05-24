// DOM Elements
const profileNav = document.querySelector('.profile-nav');
const profileSections = document.querySelectorAll('.profile-content .profile-section');
const profileForms = document.querySelectorAll('.profile-form');
const changeAvatarBtn = document.querySelector('.change-avatar-btn');
const avatarInput = document.createElement('input');
avatarInput.type = 'file';
avatarInput.accept = 'image/*';

// Navigation
profileNav?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        // Update active nav link
        profileNav.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Show corresponding section
        profileSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    }
});

// Form Submissions
profileForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Changes saved successfully!';
        form.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
});

// Load profile data on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    // Fill profile header
    document.querySelector('.profile-name').textContent = currentUser.fullName || currentUser.username;
    document.querySelector('.profile-email').textContent = currentUser.email;
    document.querySelector('.profile-avatar img').src = currentUser.avatar || 'img/default-avatar.png';
    // Fill form fields
    document.getElementById('fullName').value = currentUser.fullName || '';
    document.getElementById('email').value = currentUser.email || '';
    document.getElementById('location').value = currentUser.location || '';
    document.getElementById('bio').value = currentUser.bio || '';
});

// Save profile changes
const personalInfoForm = document.getElementById('personalInfoForm');
personalInfoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    // Get updated values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const bio = document.getElementById('bio').value;
    // Update profile in localStorage
    let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    profiles[email] = {
        ...profiles[email],
        username: currentUser.username,
        email,
        fullName,
        location,
        bio,
        avatar: currentUser.avatar || 'img/default-avatar.png',
    };
    localStorage.setItem('profiles', JSON.stringify(profiles));
    // Update currentUser
    localStorage.setItem('currentUser', JSON.stringify({
        ...profiles[email],
        isLoggedIn: true
    }));
    // Update UI
    document.querySelector('.profile-name').textContent = fullName;
    document.querySelector('.profile-email').textContent = email;
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Changes saved successfully!';
    personalInfoForm.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
});

// Profile Picture Upload
changeAvatarBtn?.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarImg = document.querySelector('.profile-avatar img');
            avatarImg.src = e.target.result;
            // Also update the profile button image
            const profileBtnImg = document.querySelector('.profile-btn img');
            if (profileBtnImg) {
                profileBtnImg.src = e.target.result;
            }
            // Save avatar to profile
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
                profiles[currentUser.email] = {
                    ...profiles[currentUser.email],
                    avatar: e.target.result
                };
                localStorage.setItem('profiles', JSON.stringify(profiles));
                localStorage.setItem('currentUser', JSON.stringify({
                    ...profiles[currentUser.email],
                    isLoggedIn: true
                }));
            }
        };
        reader.readAsDataURL(file);
    }
});

// Notification Settings
const notificationSwitches = document.querySelectorAll('.notification-settings .switch input');
notificationSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', (e) => {
        const setting = e.target.closest('.notification-item').querySelector('h3').textContent;
        const enabled = e.target.checked;
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'setting-feedback';
        feedback.textContent = `${setting} ${enabled ? 'enabled' : 'disabled'}`;
        e.target.closest('.notification-item').appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    });
});

// Category Preferences
const categoryTags = document.querySelectorAll('.category-tag');
categoryTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        const checkbox = tag.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        tag.classList.toggle('selected');
    });
});

// Location Preferences
const locationInput = document.querySelector('.location-preferences input');
if (locationInput) {
    locationInput.addEventListener('change', (e) => {
        const locations = e.target.value.split(',').map(loc => loc.trim());
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'setting-feedback';
        feedback.textContent = 'Location preferences updated';
        e.target.parentElement.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    });
}

// Add some CSS for feedback messages
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: #28a745;
        color: white;
        padding: 0.75rem;
        border-radius: 4px;
        margin-top: 1rem;
    }
    
    .setting-feedback {
        background-color: #007bff;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
    
    .category-tag.selected {
        background-color: #007bff;
        color: white;
    }
    
    .category-tag.selected:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(style); 