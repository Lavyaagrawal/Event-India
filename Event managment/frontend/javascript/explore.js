// Explore Events Page Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Load events from localStorage
    const userEvents = JSON.parse(localStorage.getItem('events')) || [];
    const upcomingEventsGrid = document.querySelector('.upcoming-events-grid');
    const allEventsGrid = document.querySelector('.all-events-section .explore-events-grid');
    
    // Clear existing demo events
    upcomingEventsGrid.innerHTML = '';
    allEventsGrid.innerHTML = '';
    
    // Separate upcoming and all events
    const today = new Date();
    const upcomingEvents = userEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 10;
    });
    
    const otherEvents = userEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 10;
    });

    // Display upcoming events
    if (upcomingEvents.length > 0) {
        upcomingEvents.forEach(event => {
            const eventCard = createEventCard(event, true);
            upcomingEventsGrid.appendChild(eventCard);
        });
    } else {
        upcomingEventsGrid.innerHTML = `
            <div class="no-events-message">
                <p>No upcoming events in the next 10 days.</p>
            </div>
        `;
    }

    // Display all other events
    otherEvents.forEach(event => {
        const eventCard = createEventCard(event, false);
        allEventsGrid.appendChild(eventCard);
    });

    // Update event counts
    const upcomingHeader = document.querySelector('.upcoming-events-section .section-header h2');
    if (upcomingHeader) {
        upcomingHeader.textContent = `Upcoming Events (${upcomingEvents.length})`;
    }

    const allEventsHeader = document.querySelector('.all-events-section .explore-events-header h2');
    if (allEventsHeader) {
        allEventsHeader.textContent = `All Events (${otherEvents.length})`;
    }

    // --- CATEGORY & CITY FILTERING BASED ON URL PARAM ---
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const urlCategory = getQueryParam('category');
    const urlCity = getQueryParam('city');
    // Set filters from URL
    if (urlCategory) {
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value.toLowerCase() === urlCategory.toLowerCase();
        });
    }
    if (urlCity) {
        const citySelect = document.getElementById('city-select');
        if (citySelect) citySelect.value = urlCity;
    }
    // Filter event cards
    function filterEvents() {
        let visibleCount = 0;
        document.querySelectorAll('.featured-event-card').forEach(card => {
            let show = true;
            if (urlCategory) {
                const badge = card.querySelector('.badge-category');
                show = show && badge && badge.textContent.trim().toLowerCase() === urlCategory.toLowerCase();
            }
            if (urlCity) {
                const meta = card.querySelector('.event-location');
                // Only show if city matches exactly (case-insensitive, ignore state)
                show = show && meta && meta.textContent.toLowerCase().includes(urlCity.toLowerCase());
            }
            card.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });
        // Update event count
        const header = document.querySelector('.all-events-section .explore-events-header h2');
        if (header) header.textContent = `All Events (${visibleCount})`;
    }
    if (urlCategory || urlCity) filterEvents();

    // Event card click: redirect to event details page
    document.querySelectorAll('.featured-event-card').forEach(card => {
        card.addEventListener('click', function() {
            const eventId = card.getAttribute('data-event-id');
            if (eventId) {
                window.location.href = `event.html?id=${encodeURIComponent(eventId)}`;
            } else {
                alert('Event ID missing. Cannot open event details.');
            }
        });
    });

    // Search bar logic for category/city-aware filtering
    const searchBtn = document.querySelector('.explore-search-bar button');
    const searchInput = document.querySelector('.explore-search-bar input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
            }
        });
    }

    // Helper function to create event card
    function createEventCard(event, isUpcoming) {
        const card = document.createElement('div');
        card.className = 'featured-event-card';
        card.setAttribute('data-event-id', event.id);

        const date = new Date(event.startDate);
        const formattedDate = date.toISOString().split('T')[0];
        const time = new Date(`2000-01-01T${event.startTime}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        card.innerHTML = `
            <div class="featured-image-wrap" style="position:relative;">
                <span class="badge badge-category" style="position:absolute;top:12px;left:12px;z-index:2;">${event.category}</span>
                <span class="event-org-label" style="position:absolute;top:12px;right:12px;z-index:2;background:rgba(255,255,255,0.85);padding:2px 10px;border-radius:8px;font-size:0.85em;font-weight:600;color:#a09c9c;">${event.organizerUniversity || event.organizer || ''}</span>
                <img src="${event.mainImageUrl}" alt="${event.title}" style="width:100%;height:180px;object-fit:cover;border-top-left-radius:16px;border-top-right-radius:16px;">
            </div>
            <div class="featured-event-info" style="padding:18px 18px 12px 18px;display:flex;flex-direction:column;gap:8px;">
                <div class="event-title" style="font-weight:700;font-size:1.08rem;">${event.title}</div>
                <div class="event-desc" style="font-size:0.98rem;color:#444;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:38px;max-height:40px;">${event.description}</div>
                <div class="event-meta" style="display:flex;align-items:center;gap:16px;font-size:0.97rem;color:#888;">
                    <span class="event-location"><span style="color:#6c63ff;">&#128205;</span> ${event.city}, ${event.state}</span>
                    <span class="event-time"><span style="color:#6c63ff;">&#9200;</span> ${time}</span>
                </div>
                <div class="event-bottom" style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
                    <span class="event-price" style="font-weight:700;color:#6c63ff;font-size:1.08rem;">₹${event.price} <span style="color:#888;font-weight:400;font-size:0.98rem;">onwards</span></span>
                    <span class="event-date" style="color:#888;font-size:0.98rem;"><span style="color:#6c63ff;">&#128197;</span> ${formattedDate}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', function() {
            const eventId = card.getAttribute('data-event-id');
            if (eventId) {
                window.location.href = `event.html?id=${encodeURIComponent(eventId)}`;
            } else {
                alert('Event ID missing. Cannot open event details.');
            }
        });
        return card;
    }

    // Apply Filters button logic
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Gather selected filters
            const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(cb => cb.value.toLowerCase());
            const city = document.getElementById('city-select')?.value.toLowerCase();
            // Filter event cards
            let visibleCount = 0;
            document.querySelectorAll('.featured-event-card').forEach(card => {
                let show = true;
                // Category filter
                if (selectedCategories.length > 0) {
                    const badge = card.querySelector('.badge-category');
                    show = show && badge && selectedCategories.includes(badge.textContent.trim().toLowerCase());
                }
                // City filter (ignore 'All Cities')
                if (city && city !== 'all cities') {
                    const meta = card.querySelector('.event-location');
                    show = show && meta && meta.textContent.toLowerCase().includes(city);
                }
                card.style.display = show ? '' : 'none';
                if (show) visibleCount++;
            });
            // Update event count
            const header = document.querySelector('.all-events-section .explore-events-header h2');
            if (header) header.textContent = `All Events (${visibleCount})`;
        });
    }
}); 