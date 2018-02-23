function switchFullscreenButton(isFullscreen) {
	if (isFullscreen == true) {
		addClassByID("hidden", "fs-button");
		removeClassByID("hidden", "fs-exit-button");
	}
	else {
		addClassByID("hidden", "fs-exit-button");
		removeClassByID("hidden", "fs-button");
	}
}

document.getElementById('fs-button').addEventListener('click', () => {
	if (screenfull.enabled) {
		screenfull.request();
		} else {
		// Ignore or do something else
	}
});

document.getElementById('fs-exit-button').addEventListener('click', () => {
	if (screenfull.enabled) {
		screenfull.exit();
		} else {
		// Ignore or do something else
	}
});

if (screenfull.enabled) {
	screenfull.on('change', () => {
		screenfull.isFullscreen ? switchFullscreenButton(true) : switchFullscreenButton(false);
	});
}

if (screenfull.enabled) {
	screenfull.on('error', event => {
		console.error('Failed to enable fullscreen', event);
	});
}


