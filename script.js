document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('wallpaperCanvas');
	const ctx = canvas.getContext('2d');
	const downloadStaticBtn = document.getElementById('downloadStaticBtn');
	const downloadLiveBtn = document.getElementById('downloadLiveBtn');

	let stars = [];
	let comet = { x: 0, y: 0, size: 0 };

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		initializeStars();
		initializeComet();
	}

	function initializeStars() {
		const starCount = Math.floor((canvas.width * canvas.height) / 1000);
		stars = [];
		for (let i = 0; i < starCount; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				radius: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.5 + 0.5,
			});
		}
	}

	function initializeComet() {
		comet = {
			x: -100,
			y: Math.random() * canvas.height * 0.5,
			size: Math.min(canvas.width, canvas.height) * 0.01,
		};
	}

	function drawBackground() {
		const gradient = ctx.createLinearGradient(
			0,
			0,
			canvas.width,
			canvas.height
		);
		gradient.addColorStop(0, '#0f0d1f');
		gradient.addColorStop(0.25, '#2c1b25');
		gradient.addColorStop(0.5, '#5c4646');
		gradient.addColorStop(0.75, '#8c7355');
		gradient.addColorStop(1, '#92683b');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function drawStars() {
		stars.forEach((star) => {
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
			ctx.fill();
		});
	}

	function drawMoon() {
		const moonSize = Math.min(canvas.width, canvas.height) * 0.2;
		const x = canvas.width * 0.7;
		const y = canvas.height * 0.35;

		ctx.beginPath();
		ctx.arc(x, y, moonSize, 0, Math.PI * 2);
		ctx.fillStyle = '#b18463';
		ctx.fill();

		ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
		ctx.shadowBlur = 50;
		ctx.fill();
		ctx.shadowBlur = 0;
	}

	function drawMountains() {
		const isSmallScreen = window.innerWidth <= 768;

		// Back mountains
		ctx.beginPath();
		ctx.moveTo(0, canvas.height);
		ctx.lineTo(
			canvas.width * 0.2,
			isSmallScreen ? canvas.height * 0.55 : canvas.height * 0.6
		);
		ctx.lineTo(
			canvas.width * 0.4,
			isSmallScreen ? canvas.height * 0.75 : canvas.height * 0.8
		);
		ctx.lineTo(
			canvas.width * 0.6,
			isSmallScreen ? canvas.height * 0.35 : canvas.height * 0.4
		);
		ctx.lineTo(
			canvas.width * 0.8,
			isSmallScreen ? canvas.height * 0.6 : canvas.height * 0.7
		);
		ctx.lineTo(
			canvas.width,
			isSmallScreen ? canvas.height * 0.45 : canvas.height * 0.5
		);
		ctx.lineTo(canvas.width, canvas.height);
		ctx.fillStyle = '#3d2633';
		ctx.fill();

		// Front mountains
		ctx.beginPath();
		ctx.moveTo(0, canvas.height);
		ctx.lineTo(
			canvas.width * 0.15,
			isSmallScreen ? canvas.height * 0.65 : canvas.height * 0.7
		);
		ctx.lineTo(
			canvas.width * 0.3,
			isSmallScreen ? canvas.height * 0.75 : canvas.height * 0.8
		);
		ctx.lineTo(
			canvas.width * 0.5,
			isSmallScreen ? canvas.height * 0.55 : canvas.height * 0.6
		);
		ctx.lineTo(
			canvas.width * 0.7,
			isSmallScreen ? canvas.height * 0.7 : canvas.height * 0.75
		);
		ctx.lineTo(
			canvas.width * 0.85,
			isSmallScreen ? canvas.height * 0.5 : canvas.height * 0.55
		);
		ctx.lineTo(
			canvas.width,
			isSmallScreen ? canvas.height * 0.65 : canvas.height * 0.7
		);
		ctx.lineTo(canvas.width, canvas.height);
		ctx.fillStyle = '#2a1c22';
		ctx.fill();
	}

	function drawComet() {
		ctx.beginPath();
		ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();

		const gradient = ctx.createLinearGradient(
			comet.x - comet.size * 15,
			comet.y,
			comet.x,
			comet.y
		);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

		ctx.beginPath();
		ctx.moveTo(comet.x, comet.y);
		ctx.lineTo(comet.x - comet.size * 15, comet.y - comet.size * 0.5);
		ctx.lineTo(comet.x - comet.size * 15, comet.y + comet.size * 0.5);
		ctx.closePath();
		ctx.fillStyle = gradient;
		ctx.fill();
	}

	function updateComet() {
		comet.x += 5;
		if (comet.x > canvas.width + 100) {
			initializeComet();
		}
	}

	function drawScene() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
		drawStars();
		drawMoon();
		drawMountains();
		drawComet();
	}

	function animate() {
		drawScene();
		updateComet();
		requestAnimationFrame(animate);
	}

	function downloadStaticWallpaper() {
		const link = document.createElement('a');
		link.download = 'starry-night-wallpaper.png';
		link.href = canvas.toDataURL();
		link.click();
	}

	function downloadLiveWallpaper() {
		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Starry Night Live Wallpaper</title>
    <style>
        ${document.querySelector('style').innerHTML}
    </style>
</head>
<body>
    <div id="container">
        <canvas id="wallpaperCanvas"></canvas>
    </div>
    <script>
        ${document.querySelector('script').innerHTML}
    </script>
</body>
</html>`;

		const blob = new Blob([html], { type: 'text/html' });
		const link = document.createElement('a');
		link.download = 'starry-night-live-wallpaper.html';
		link.href = URL.createObjectURL(blob);
		link.click();
	}

	window.addEventListener('resize', resizeCanvas);
	downloadStaticBtn.addEventListener('click', downloadStaticWallpaper);
	downloadLiveBtn.addEventListener('click', downloadLiveWallpaper);

	resizeCanvas();
	animate();
});
