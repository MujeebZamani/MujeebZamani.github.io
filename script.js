// When a user clicks one of the tsdiv* containers, hide the inner content
// of the other containers but keep each container's first h3.tracklist visible.
document.addEventListener('DOMContentLoaded', () => {
	const containers = Array.from(document.querySelectorAll('.tsdivr, .tsdivem, .tsdivp'));
	if (!containers.length) return;

	function showOnly(clicked) {
		containers.forEach(container => {
			if (container === clicked) {
				// show all children of the clicked container
				Array.from(container.children).forEach(child => {
					child.style.display = '';
				});
			} else {
				// keep the first h3.tracklist visible; hide other children
				Array.from(container.children).forEach(child => {
					if (child.matches && child.matches('h3.tracklist')) {
						child.style.display = '';
					} else {
						child.style.display = 'none';
					}
				});
			}
		});
	}

	// Make containers clickable + keyboard accessible
	containers.forEach(c => {
		c.style.cursor = 'pointer';
		if (!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0');

		c.addEventListener('click', () => showOnly(c));
		c.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				showOnly(c);
			}
		});
	});

	// Default: show `.tsdivr` fully (if present)
	const defaultDiv = document.querySelector('.tsdivr') || containers[0];
	showOnly(defaultDiv);
});

// Show the `#tracked` section when the Track button is clicked.
// This is appended so it does not modify the existing panel logic.
document.addEventListener('DOMContentLoaded', () => {
	const btn = document.getElementById('tsbtn');
	const tracked = document.getElementById('tracked');
	if (!btn || !tracked) return;

	btn.addEventListener('click', (e) => {
		// reveal the tracked section (inline/block depends on layout); use block as a safe default
		tracked.style.display = 'block';
		// ensure it's visible to keyboard/screenreader users
		tracked.setAttribute('aria-hidden', 'false');
		// scroll into view for convenience
		tracked.scrollIntoView({ behavior: 'smooth', block: 'start' });
		// focus the tracked container so users can continue with keyboard
		tracked.setAttribute('tabindex', '-1');
		tracked.focus({ preventScroll: true });
	});
});


