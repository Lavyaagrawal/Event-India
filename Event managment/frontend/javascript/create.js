// Create Event Page Interactivity

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createEventForm');
    const cancelBtn = document.querySelector('.cancel-btn');
    const mainImageInput = document.getElementById('event-main-image');
    const additionalImagesInput = document.getElementById('event-additional-images');
    const mainImageLabel = document.querySelector('.main-image-upload .image-upload-label');
    const additionalImagesLabel = document.querySelector('.additional-images-upload .image-upload-label');
    const qrImageInput = document.getElementById('event-qr-image');
    const qrImagePreview = document.getElementById('qr-image-preview');

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const eventData = {
            title: formData.get('event-title'),
            category: formData.get('event-category'),
            description: formData.get('event-description'),
            startDate: formData.get('event-start-date'),
            endDate: formData.get('event-end-date'),
            startTime: formData.get('event-start-time'),
            endTime: formData.get('event-end-time'),
            isVirtual: formData.get('event-timezone') === 'on',
            venue: formData.get('event-venue'),
            city: formData.get('event-city'),
            state: formData.get('event-state'),
            address: formData.get('event-address'),
            capacity: parseInt(formData.get('event-capacity')),
            price: parseFloat(formData.get('event-price')),
            tags: formData.get('event-tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            organizer: formData.get('event-organizer'),
            contact: formData.get('event-contact'),
            website: formData.get('event-website'),
            mainImage: mainImageInput.files[0],
            additionalImages: Array.from(additionalImagesInput.files),
            qrImage: qrImageInput.files[0]
        };

        // Get ticket types from form
        const tickets = [
            {
                type: formData.get('ticket1-name'),
                desc: formData.get('ticket1-desc'),
                price: parseFloat(formData.get('ticket1-price'))
            },
            {
                type: formData.get('ticket2-name'),
                desc: formData.get('ticket2-desc'),
                price: parseFloat(formData.get('ticket2-price'))
            },
            {
                type: formData.get('ticket3-name'),
                desc: formData.get('ticket3-desc'),
                price: parseFloat(formData.get('ticket3-price'))
            }
        ];
        eventData.tickets = tickets;

        try {
            // Show loading state
            const createBtn = form.querySelector('.create-btn');
            const originalBtnText = createBtn.textContent;
            createBtn.textContent = 'Creating Event...';
            createBtn.disabled = true;

            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                throw new Error('Please login to create an event');
            }

            // Add user info to event data
            eventData.organizerEmail = currentUser.email;
            eventData.createdAt = new Date().toISOString();

            // Get existing events
            let events = JSON.parse(localStorage.getItem('events')) || [];

            // Generate unique ID for the event
            eventData.id = 'event_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);

            // Handle image uploads
            if (eventData.mainImage) {
                eventData.mainImageUrl = await readFileAsDataURL(eventData.mainImage);
            }
            if (eventData.additionalImages.length > 0) {
                eventData.additionalImageUrls = await Promise.all(
                    eventData.additionalImages.map(img => readFileAsDataURL(img))
                );
            }
            // Handle QR image upload
            if (eventData.qrImage) {
                eventData.qrImg = await readFileAsDataURL(eventData.qrImage);
            } else {
                alert('Please upload a UPI QR code image.');
                return;
            }

            // Remove file objects before storing
            delete eventData.mainImage;
            delete eventData.additionalImages;
            delete eventData.qrImage;

            // Add new event to the beginning of the array
            events.unshift(eventData);

            // Save updated events
            localStorage.setItem('events', JSON.stringify(events));

            // Show success message
            alert('Event created successfully!');
            
            // Redirect to explore page
            window.location.href = 'explore.html';

        } catch (error) {
            alert(error.message || 'Failed to create event. Please try again.');
        } finally {
            // Reset button state
            const createBtn = form.querySelector('.create-btn');
            createBtn.textContent = 'Create Event';
            createBtn.disabled = false;
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            window.location.href = 'explore.html';
        }
    });

    // Handle main image upload
    mainImageInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Image size should be less than 5MB');
                this.value = '';
                return;
            }
            updateImagePreview(mainImageLabel, file);
        }
    });

    // Handle additional images upload
    additionalImagesInput.addEventListener('change', function(e) {
        if (this.files) {
            const files = Array.from(this.files);
            if (files.length > 5) {
                alert('You can only upload up to 5 additional images');
                this.value = '';
                return;
            }
            // Check file sizes
            const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
            if (oversizedFiles.length > 0) {
                alert('Some images exceed the 5MB size limit');
                this.value = '';
                return;
            }
            updateAdditionalImagesPreview(additionalImagesLabel, files);
        }
    });

    // Handle QR image upload and preview
    qrImageInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('QR image size should be less than 5MB');
                this.value = '';
                qrImagePreview.innerHTML = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(ev) {
                qrImagePreview.innerHTML = `<img src="${ev.target.result}" alt="QR Preview" style="max-width:160px;max-height:160px;border-radius:10px;border:1.5px solid #ececec;">`;
            };
            reader.readAsDataURL(file);
        } else {
            qrImagePreview.innerHTML = '';
        }
    });

    // Helper function to read file as data URL
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Helper function to update image preview
    function updateImagePreview(label, file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            label.innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
                <span style="margin-top: 8px;">Change Image</span>
            `;
        };
        reader.readAsDataURL(file);
    }

    // Helper function to update additional images preview
    function updateAdditionalImagesPreview(label, files) {
        const previews = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resolve(`
                        <div style="position: relative; margin-bottom: 8px;">
                            <img src="${e.target.result}" alt="Preview" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px;">
                        </div>
                    `);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(html => {
            label.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                    ${html.join('')}
                </div>
                <span style="margin-top: 8px;">Change Images</span>
            `;
        });
    }

    // Set minimum date for date inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('event-start-date').min = today;
    document.getElementById('event-end-date').min = today;

    // Validate end date is after start date
    document.getElementById('event-start-date').addEventListener('change', function() {
        document.getElementById('event-end-date').min = this.value;
    });
});
