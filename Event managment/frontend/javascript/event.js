// Event Details Page Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // --- Static Event Data ---
    const demoEvents = [
        {
            name: 'TechCon India 2025',
            category: 'Technology',
            organizer: 'Rahul Sharma',
            organizerImg: 'https://randomuser.me/api/portraits/men/32.jpg',
            organizerEmail: 'rahul.sharma@email.com',
            organizerPhone: '+91 98765 43210',
            date: 'Sat, Jun 7, 2025 - Tue, Jun 10, 2025',
            time: '09:00 AM',
            location: 'Bangalore International Exhibition Centre, Bangalore',
            venue: 'Bangalore International Exhibition Centre, 10th Mile, Tumkur Road, Madavara Post, Dasanapura Hobli, Bangalore, Karnataka 562123',
            mainImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            thumbnails: [
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            ],
            description: `Join us for the biggest tech conference in India! TechCon brings together the brightest minds in technology for three days of learning, networking, and inspiration.\nFeatured speakers include CTOs from major tech companies, renowned developers, and emerging startups. Topics will cover AI, machine learning, blockchain, cloud computing, and more.\nThe conference will include hands-on workshops, panel discussions, product demos, and networking events. Perfect for developers, engineers, product managers, and tech enthusiasts...`,
            tags: ['tech', 'conference', 'networking', 'AI', 'machine learning'],
            tickets: [
                { type: 'Early Bird', desc: 'Limited early bird tickets at a discounted rate', price: '₹4999' },
                { type: 'Regular', desc: 'Full conference access for all three days', price: '₹7999' },
                { type: 'VIP', desc: 'Premium access with exclusive networking events and VIP lounge', price: '₹14999' }
            ]
        },
        {
            name: 'Delhi Music Festival',
            category: 'Music',
            organizer: 'Ananya Verma',
            organizerImg: 'https://randomuser.me/api/portraits/women/44.jpg',
            organizerEmail: 'ananya.verma@email.com',
            organizerPhone: '+91 91234 56789',
            date: 'Fri, May 23, 2025 - Sun, May 25, 2025',
            time: '04:00 PM',
            location: 'Jawaharlal Nehru Stadium, New Delhi',
            venue: 'Jawaharlal Nehru Stadium, Pragati Vihar, New Delhi, Delhi 110003',
            mainImg: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
            thumbnails: [
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80'
            ],
            description: `Three days of diverse musical performances from across India and globally.\nEnjoy live bands, solo artists, and fusion acts. Food stalls, art installations, and workshops included.\nA must-attend for music lovers and festival goers!`,
            tags: ['music', 'festival', 'live', 'bands', 'Delhi'],
            tickets: [
                { type: 'General', desc: 'Access to all performances and festival areas', price: '₹1499' },
                { type: 'VIP', desc: 'VIP seating and backstage access', price: '₹3999' }
            ]
        },
        {
            name: 'Mumbai Food Festival',
            category: 'Food & Drink',
            organizer: 'Siddharth Mehra',
            organizerImg: 'https://randomuser.me/api/portraits/men/54.jpg',
            organizerEmail: 'siddharth.mehra@email.com',
            organizerPhone: '+91 99887 66554',
            date: 'Wed, May 28, 2025',
            time: '11:00 AM',
            location: 'MMRDA Grounds, Mumbai',
            venue: 'MMRDA Grounds, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
            mainImg: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
            thumbnails: [
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            ],
            description: `A culinary celebration featuring diverse cuisines, chef demonstrations, and tastings.\nMeet celebrity chefs, enjoy live cooking shows, and sample food from all over India.\nPerfect for foodies and families!`,
            tags: ['food', 'festival', 'Mumbai', 'cuisine', 'chefs'],
            tickets: [
                { type: 'Entry Pass', desc: 'Access to all food stalls and demos', price: '₹299' },
                { type: 'VIP', desc: 'VIP lounge and meet & greet with chefs', price: '₹999' }
            ]
        },
        {
            name: 'Heritage Walk: Old Delhi',
            category: 'Cultural',
            organizer: 'Priya Singh',
            organizerImg: 'https://randomuser.me/api/portraits/women/68.jpg',
            organizerEmail: 'priya.singh@email.com',
            organizerPhone: '+91 90000 12345',
            date: 'Tue, May 13, 2025',
            time: '09:00 AM',
            location: 'Old Delhi, Delhi',
            venue: 'Red Fort Entrance, Netaji Subhash Marg, Chandni Chowk, Delhi 110006',
            mainImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            thumbnails: [
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
            ],
            description: `Explore the historical treasures of Old Delhi on a guided walking tour.\nDiscover hidden gems, ancient architecture, and vibrant markets.\nPerfect for history buffs and culture lovers!`,
            tags: ['heritage', 'walk', 'Delhi', 'culture', 'history'],
            tickets: [
                { type: 'Standard', desc: 'Guided tour with refreshments', price: '₹599' }
            ]
        },
        {
            name: 'Digital Marketing Masterclass',
            category: 'Workshop',
            organizer: 'Amit Patel',
            organizerImg: 'https://randomuser.me/api/portraits/men/76.jpg',
            organizerEmail: 'amit.patel@email.com',
            organizerPhone: '+91 91111 22222',
            date: 'Tue, May 20, 2025',
            time: '10:00 AM',
            location: 'Online Event',
            venue: 'Virtual (Zoom link will be shared after registration)',
            mainImg: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
            thumbnails: [
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
            ],
            description: `Comprehensive virtual workshop on digital marketing strategies and techniques.\nLearn SEO, social media, content marketing, and analytics from industry experts.\nIncludes live Q&A and downloadable resources.`,
            tags: ['digital', 'marketing', 'workshop', 'virtual', 'SEO'],
            tickets: [
                { type: 'General', desc: 'Workshop access + resources', price: '₹799' }
            ]
        }
    ];

    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    let event = null;
    if (eventId) {
        // Try to find event in localStorage
        const userEvents = JSON.parse(localStorage.getItem('events')) || [];
        event = userEvents.find(e => String(e.id) === String(eventId));
    }
    if (!event) {
        // Fallback: try to find by name in demo events (for old links)
        const eventName = urlParams.get('event');
        event = demoEvents.find(e => e.name.toLowerCase() === (eventName || '').toLowerCase());
        // Or by ID if demo events have IDs
        if (!event && eventId) {
            event = demoEvents.find(e => String(e.id) === String(eventId));
        }
    }
    if (!event) {
        document.querySelector('main').innerHTML = `<div class='event-card' style='text-align:center; margin: 60px auto;'><h2>Event Not Found</h2><p>The event you are looking for does not exist.</p><a href='explore.html' class='select-ticket-btn' style='display:inline-block;max-width:220px;'>Back to Explore</a></div>`;
        return;
    }

    // Update page title
    document.title = `${event.name} | EventIndia`;

    // Helper: Get value or fallback
    function safe(val, fallback = '') {
        return (val !== undefined && val !== null && val !== '') ? val : fallback;
    }

    // Helper: Format date
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Helper: Format time
    function formatTime(timeStr) {
        if (!timeStr) return '';
        return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // Helper: Render tags
    function renderTags(tags) {
        if (!tags || !tags.length) return '';
        return `<div class="event-tags">${tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}</div>`;
    }

    // Helper: Render gallery
    function renderGallery(mainImg, additionalImgs) {
        let html = `<img src="${safe(mainImg, 'img/default-event.jpg')}" alt="Event Main Image" class="event-main-img">`;
        if (additionalImgs && additionalImgs.length) {
            html += '<div class="event-thumbnails">';
            additionalImgs.forEach((src, i) => {
                html += `<img src="${src}" alt="Thumb ${i+1}">`;
            });
            html += '</div>';
        }
        return `<div class="event-gallery">${html}</div>`;
    }

    // Helper: Render tickets
    function renderTickets(tickets) {
        if (!tickets || !tickets.length) return '<div>No tickets available.</div>';
        return tickets.map(t => `
            <div class="ticket-card ticket-option" data-type="${safe(t.type, 'General')}" data-price="${parseInt(String(t.price).replace(/[^0-9]/g, ''))}">
                <div><b>${safe(t.type, 'General')}</b><br><span>${safe(t.desc, '')}</span></div>
                <div class="ticket-price">₹${safe(t.price, '0')}</div>
            </div>
        `).join('');
    }

    // Helper: Render organizer
    function renderOrganizer(org, orgImg, orgEmail, orgPhone) {
        return `
            <div class="event-organizer">
                <img src="${safe(orgImg, 'img/default-avatar.png')}" alt="${safe(org)}" class="organizer-avatar">
                <span>By <b>${safe(org, 'Organizer')}</b></span>
                <span class="organizer-contact">${orgEmail ? `<a href="mailto:${orgEmail}">${orgEmail}</a>` : ''} ${orgPhone ? `| <a href="tel:${orgPhone}">${orgPhone}</a>` : ''}</span>
            </div>
        `;
    }

    // Main rendering logic
    function renderEventDetails(event) {
        // Hero Section
        document.querySelector('.event-title').textContent = safe(event.title || event.name, 'Event Title');
        document.querySelector('.event-date').textContent = `${formatDate(event.startDate || event.date)}${event.endDate ? ' - ' + formatDate(event.endDate) : ''}`;
        document.querySelector('.event-time').textContent = formatTime(event.startTime || event.time);
        document.querySelector('.event-location').textContent = `${safe(event.venue, '')}${event.city ? ', ' + event.city : ''}`;
        document.querySelector('.badge-category').textContent = safe(event.category, 'General');
        document.querySelector('.badge-category').className = `badge badge-category ${safe(event.category, 'general').toLowerCase().replace(/[^a-z]/g,'')}`;

        // Organizer
        const organizerHTML = renderOrganizer(event.organizer, event.organizerImg || event.avatar, event.organizerEmail, event.organizerPhone || event.contact);
        document.querySelector('.event-organizer').outerHTML = organizerHTML;

        // Gallery
        const mainImg = event.mainImageUrl || event.mainImg || event.mainImage || event.mainImgUrl || 'img/default-event.jpg';
        const additionalImgs = event.additionalImageUrls || event.thumbnails || [];
        document.querySelector('.event-gallery').outerHTML = renderGallery(mainImg, additionalImgs);

        // Tabs
        document.getElementById('tab-details').innerHTML = `
            <h3>About This Event</h3>
            <p>${safe(event.description, 'No description provided.').replace(/\n/g, '<br>')}</p>
            <a href="#" class="read-more">Read more</a>
            ${renderTags(event.tags)}
        `;
        document.getElementById('tab-venue').innerHTML = `
            <h3>Venue & Location</h3>
            <p>${safe(event.venue, 'Venue details not available.')}</p>
        `;
        document.getElementById('tab-organizer').innerHTML = `
            <h3>Organizer</h3>
            <p>${safe(event.organizer, 'Organizer')}<br>${event.organizerEmail ? 'Email: ' + event.organizerEmail + '<br>' : ''}${event.organizerPhone ? 'Phone: ' + event.organizerPhone : ''}</p>
        `;

        // Tickets
        const ticketsDiv = document.querySelector('.event-tickets');
        ticketsDiv.innerHTML = `<h3>Tickets & Registration</h3>
            ${renderTickets(event.tickets)}
            <div id="ticket-order-summary"></div>
            <div class="ticket-links">
                <a href="#" class="ticket-link">Refund Policy</a>
                <a href="#" class="ticket-link">Contact Organizer</a>
            </div>`;

        // UPI QR code (if available)
        if (event.qrImg) {
            const qrDiv = document.createElement('div');
            qrDiv.className = 'event-qr-section';
            qrDiv.innerHTML = `<h4>Pay via UPI QR Code</h4><img src="${event.qrImg}" alt="UPI QR Code" class="event-qr-img">`;
            ticketsDiv.appendChild(qrDiv);
        }
    }

    // After event is loaded/found:
    if (event) {
        renderEventDetails(event);
    }

    // Tab switching functionality
    const tabs = document.querySelectorAll('.event-tab');
    const tabContents = document.querySelectorAll('.event-tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(content => content.style.display = 'none');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).style.display = 'block';
        });
    });

    // Save event functionality
    const saveBtn = document.querySelector('.event-action-btn:first-child');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            this.classList.toggle('saved');
            const isSaved = this.classList.contains('saved');
            this.innerHTML = isSaved ? '&#10003; Saved' : '&#9825; Save';
        });
    }

    // Share event functionality
    const shareBtn = document.querySelector('.event-action-btn:last-child');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Event link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // Ticket selection functionality
    const selectTicketBtn = document.querySelector('.select-ticket-btn');
    if (selectTicketBtn) {
        selectTicketBtn.addEventListener('click', function() {
            alert('Ticket selection functionality will be implemented here');
        });
    }

    // --- Ticket selection, quantity, and order summary ---
    function renderOrderSummary(type, price, qty) {
        const summaryDiv = document.getElementById('ticket-order-summary');
        let total = 0;
        let disabled = true;
        if (type && price && qty) {
            total = price * qty;
            disabled = false;
        }
        summaryDiv.innerHTML = `
            <hr style="margin: 24px 0 16px 0; border: none; border-top: 1.5px solid #ececec;">
            <div class="order-summary-title">Order Summary</div>
            <div class="order-summary-row">${type ? `<span>${type} x ${qty}</span><span>₹${price} x ${qty}</span>` : '<span>No ticket selected</span>'}</div>
            <div class="order-summary-total">Total <span class="order-summary-total-amount">₹${total}</span></div>
            <button class="proceed-checkout-btn" ${disabled ? 'disabled' : ''}><span>&#128179;</span> Proceed to Checkout <b>₹${total}</b></button>
        `;
        // Add handler for Proceed to Checkout
        const proceedBtn = summaryDiv.querySelector('.proceed-checkout-btn');
        if (proceedBtn) {
            proceedBtn.addEventListener('click', function() {
                if (disabled) return;
                console.log('[DEBUG] Proceed to Checkout button clicked');
                // Gather all necessary info
                const eventName = document.querySelector('.event-title')?.textContent || '';
                const eventDate = document.querySelector('.event-date')?.textContent || '';
                const ticketType = type;
                const ticketPrice = price;
                const quantity = qty;
                // Get the QR image for this event (assuming it's stored as event.qrImg)
                const qrImg = event.qrImg || '';
                // Save to localStorage
                localStorage.setItem('checkoutEvent', JSON.stringify({
                    eventName,
                    eventDate,
                    ticketType,
                    ticketPrice,
                    quantity,
                    qrImg
                }));
                // Redirect to checkout page
                window.location.href = 'checkout.html';
            });
        }
    }
    // Initial render: show button disabled
    renderOrderSummary(null, 0, 0);
    let selectedTicket = null;
    let selectedQty = 1;
    document.querySelectorAll('.ticket-card.ticket-option').forEach(card => {
        card.addEventListener('click', function(e) {
            console.log('[DEBUG] Ticket card clicked:', card);
            document.querySelectorAll('.ticket-card.ticket-option').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedTicket = this;
            selectedQty = 1;
            document.querySelectorAll('.ticket-quantity').forEach(q => q.remove());
            const qtyDiv = document.createElement('div');
            qtyDiv.className = 'ticket-quantity';
            qtyDiv.innerHTML = `
                <label>Quantity:</label>
                <button class="ticket-quantity-btn" type="button">-</button>
                <span class="ticket-quantity-value">1</span>
                <button class="ticket-quantity-btn" type="button">+</button>
            `;
            this.appendChild(qtyDiv);
            const minusBtn = qtyDiv.querySelectorAll('.ticket-quantity-btn')[0];
            const plusBtn = qtyDiv.querySelectorAll('.ticket-quantity-btn')[1];
            const qtyVal = qtyDiv.querySelector('.ticket-quantity-value');
            minusBtn.onclick = function(ev) {
                ev.stopPropagation();
                if (selectedQty > 1) {
                    selectedQty--;
                    qtyVal.textContent = selectedQty;
                    renderOrderSummary(card.getAttribute('data-type'), parseInt(card.getAttribute('data-price')), selectedQty);
                }
                console.log('[DEBUG] Minus button clicked. Qty:', selectedQty);
            };
            plusBtn.onclick = function(ev) {
                ev.stopPropagation();
                selectedQty++;
                qtyVal.textContent = selectedQty;
                renderOrderSummary(card.getAttribute('data-type'), parseInt(card.getAttribute('data-price')), selectedQty);
                console.log('[DEBUG] Plus button clicked. Qty:', selectedQty);
            };
            renderOrderSummary(card.getAttribute('data-type'), parseInt(card.getAttribute('data-price')), selectedQty);
        });
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.ticket-card.ticket-option') && !e.target.closest('#ticket-order-summary')) {
            document.querySelectorAll('.ticket-card.ticket-option').forEach(c => c.classList.remove('selected'));
            document.querySelectorAll('.ticket-quantity').forEach(q => q.remove());
            renderOrderSummary(null, 0, 0);
        }
    });

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isTestUser = currentUser?.email === 'test@example.com'; // Test user email

    // Add delete button if user has permission
    const eventActions = document.querySelector('.event-actions');
    if (eventActions && event && (isTestUser || (currentUser && currentUser.email === event.organizerEmail))) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'event-action-btn delete-btn';
        deleteBtn.innerHTML = '&#128465; Delete';
        deleteBtn.style.color = '#ff4444';
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
                // Get all events
                const events = JSON.parse(localStorage.getItem('events')) || [];
                // Remove the event
                const updatedEvents = events.filter(e => String(e.id) !== String(eventId));
                // Save updated events
                localStorage.setItem('events', JSON.stringify(updatedEvents));
                // Redirect to explore page
                window.location.href = 'explore.html';
            }
        });
        eventActions.appendChild(deleteBtn);
    }
}); 