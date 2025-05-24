// Example: Add interactivity for the search buttons

document.getElementById('find-events-btn').addEventListener('click', function() {
    const query = document.getElementById('main-search').value.trim().toLowerCase();
    // List of categories (add more as needed)
    const categories = [
        "music", "tech", "technology", "business", "food", "food & drink", "cultural", "workshop", "sports", "art", "health & wellness", "education"
    ];
    // List of cities (add more as needed)
    const cities = [
        "mumbai", "delhi", "bangalore", "hyderabad", "chennai", "kolkata", "pune", "ahmedabad"
    ];
    // Find a matching category (case-insensitive, allow synonyms)
    let matchedCategory = categories.find(cat => query === cat.toLowerCase());
    let matchedCity = cities.find(city => query === city.toLowerCase());
    // Map synonyms to canonical category names
    if (matchedCategory === "tech") matchedCategory = "Technology";
    else if (matchedCategory === "food") matchedCategory = "Food & Drink";
    else if (matchedCategory) matchedCategory = matchedCategory.charAt(0).toUpperCase() + matchedCategory.slice(1);
    if (matchedCity) matchedCity = matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1);
    if (matchedCategory) {
        window.location.href = `explore.html?category=${encodeURIComponent(matchedCategory)}`;
    } else if (matchedCity) {
        window.location.href = `explore.html?city=${encodeURIComponent(matchedCity)}`;
    } else {
        window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
    }
});

// You can add more JS for actual search/filter logic as needed

// Featured Events interactivity

function renderFeaturedEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const grid = document.querySelector('.featured-events-grid');
    if (!grid) return;
    grid.innerHTML = '';
    events.slice(0, 3).forEach((event, idx) => {
        const card = document.createElement('div');
        card.className = 'featured-event-card' + (idx === 0 ? ' large' : '');
        card.innerHTML = `
            <div class="featured-image-wrap">
                <span class="badge badge-featured">Featured</span>
                <img src="${event.mainImageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}" alt="${event.title}">
            </div>
            <div class="featured-event-info">
                <span class="badge badge-category ${event.category ? event.category.toLowerCase().replace(/[^a-z]/g,'') : ''}">${event.category || ''}</span>
                <h3 class="event-name">${event.title}</h3>
                <p class="event-desc">${event.description ? event.description.substring(0, 80) + (event.description.length > 80 ? '...' : '') : ''}</p>
                <div class="event-meta">
                    <span class="event-location">${event.city || ''}, ${event.state || ''}</span>
                    <span class="event-time">${event.startTime || ''}</span>
                </div>
                <div class="event-bottom">
                    <span class="event-price">₹${event.price || ''} <span class="onwards">onwards</span></span>
                    <span class="event-date">${event.startDate || ''}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', function() {
            const eventId = event.id;
            if (eventId) {
                window.location.href = `event.html?id=${encodeURIComponent(eventId)}`;
            } else {
                alert('Event ID missing. Cannot open event details.');
            }
        });
        grid.appendChild(card);
    });
}

function renderUpcomingEventsHome() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const today = new Date();
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.startDate);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 10;
    });
    const grid = document.querySelector('.upcoming-events-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (upcomingEvents.length === 0) {
        grid.innerHTML = '<div style="padding:32px;text-align:center;color:#888;">No upcoming events in the next 10 days.</div>';
        return;
    }
    upcomingEvents.forEach(event => {
        // Use the same card HTML as in explore.js
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
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedEvents();
    renderUpcomingEventsHome();
    // Dynamically update category counts and hide cards with 0 events
    const events = JSON.parse(localStorage.getItem('events')) || [];
    document.querySelectorAll('.category-card[data-category]').forEach(card => {
        const category = card.getAttribute('data-category');
        const count = events.filter(e => e.category === category).length;
        const countElem = card.querySelector('.category-count');
        if (countElem) {
            countElem.textContent = `${count} event${count === 1 ? '' : 's'}`;
        }
        card.style.display = count > 0 ? '' : 'none';
        // Always set up click handler
        card.style.cursor = 'pointer';
        card.onclick = function() {
            window.location.href = `explore.html?category=${encodeURIComponent(category)}`;
        };
    });

    // --- Popular Cities: update event counts and click logic ---
    document.querySelectorAll('.city-card[data-city]').forEach(card => {
        const city = card.getAttribute('data-city');
        const count = events.filter(e => (e.city || '').toLowerCase() === city.toLowerCase()).length;
        const infoSpans = card.querySelectorAll('.city-info span');
        if (infoSpans.length > 1) {
            infoSpans[1].textContent = `${count} event${count === 1 ? '' : 's'}`;
        }
        card.style.cursor = 'pointer';
        card.onclick = function() {
            window.location.href = `explore.html?city=${encodeURIComponent(city)}`;
        };
    });
});

const featuredViewAll = document.querySelector('.featured-view-all');
if (featuredViewAll) {
    featuredViewAll.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'explore.html';
    });
}

// Popular Cities interactivity

document.querySelectorAll('.city-card').forEach(card => {
    card.addEventListener('click', function() {
        const cityName = card.querySelector('.city-info span')?.textContent || 'City';
        // Directly navigate to explore.html with city param
        window.location.href = `explore.html?city=${encodeURIComponent(cityName)}`;
    });
});

// City card interactivity for redirecting to explore.html with city

document.querySelectorAll('.city-card[data-city]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
        const city = card.getAttribute('data-city');
        if (city) {
            window.location.href = `explore.html?city=${encodeURIComponent(city)}`;
        }
    });
});

// Upcoming Events interactivity

document.querySelectorAll('.upcoming-event-card').forEach(card => {
    card.addEventListener('click', function() {
        const eventName = card.querySelector('.event-name')?.textContent || 'Event';
        // Navigate to event details page
        window.location.href = `event.html?event=${encodeURIComponent(eventName)}`;
    });
});

const upcomingViewAll = document.querySelector('.upcoming-view-all');
if (upcomingViewAll) {
    upcomingViewAll.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Show all upcoming events (implement your logic here)');
        // You can add navigation logic here
    });
}

// Category card interactivity for redirecting to explore.html with category

document.querySelectorAll('.category-card[data-category]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
        const category = card.getAttribute('data-category');
        if (category) {
            window.location.href = `explore.html?category=${encodeURIComponent(category)}`;
        }
    });
});
