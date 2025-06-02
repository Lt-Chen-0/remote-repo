document.addEventListener('DOMContentLoaded', () => {
    const sunIndicator = document.getElementById('sunIndicator');
    const sunTrackPath = document.getElementById('sunTrackPath');
    const sunProgressContainer = document.getElementById('sunProgressContainer');
    const svgElement = document.getElementById('sunTrackSvg'); // Get the SVG element

    if (!sunIndicator || !sunTrackPath || !sunProgressContainer || !svgElement) {
        console.error("Required elements for sun progress bar not found.");
        return;
    }

    const pathLength = sunTrackPath.getTotalLength();

    // Get viewBox dimensions (assuming it's set and won't change)
    const viewBox = svgElement.viewBox.baseVal;
    const VBW = viewBox.width;   // ViewBox Width (e.g., 1000)
    const VBH = viewBox.height;  // ViewBox Height (e.g., 250)

    function updateSunPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollableHeight = docHeight - clientHeight;

        let progress = 0;
        if (scrollableHeight > 0) {
            progress = scrollTop / scrollableHeight;
        }
        progress = Math.min(Math.max(progress, 0), 1);

        const pointOnPath = pathLength * progress;
        const point = sunTrackPath.getPointAtLength(pointOnPath); // point.x, point.y are in viewBox units

        // --- Calculate sun's position ---
        // The SVG is positioned absolutely within sunProgressContainer.
        // sunIndicator is also positioned absolutely within sunProgressContainer.

        const svgRect = svgElement.getBoundingClientRect(); // Current screen pixels of SVG
        const containerRect = sunProgressContainer.getBoundingClientRect(); // Current screen pixels of container (should be viewport)

        // Scale point.x and point.y from viewBox units to current SVG pixel units
        const scaledPointX = point.x * (svgRect.width / VBW);
        const scaledPointY = point.y * (svgRect.height / VBH);

        // Calculate sun's left/top relative to the sunProgressContainer's top-left corner
        const sunX = (svgRect.left - containerRect.left) + scaledPointX;
        const sunY = (svgRect.top - containerRect.top) + scaledPointY;

        sunIndicator.style.left = `${sunX}px`;
        sunIndicator.style.top = `${sunY}px`;

        updateTheme(progress);
    }

    let currentTheme = '';
    function updateTheme(progress) {
        let newTheme = 'theme-night';

        if (progress <= 0.05 || progress >= 0.95) {
            newTheme = 'theme-night';
        } else if (progress > 0.05 && progress <= 0.25) {
            newTheme = 'theme-dawn';
        } else if (progress > 0.25 && progress <= 0.75) {
            newTheme = 'theme-day';
        } else if (progress > 0.75 && progress < 0.95) {
            newTheme = 'theme-dusk';
        }

        if (newTheme !== currentTheme) {
            sunProgressContainer.classList.remove('theme-dawn', 'theme-day', 'theme-dusk', 'theme-night');
            sunProgressContainer.classList.add(newTheme);
            currentTheme = newTheme;
        }
    }

    updateSunPosition(); // Initial call

    window.addEventListener('scroll', updateSunPosition, { passive: true });
    window.addEventListener('resize', () => {
        // Path length and viewBox don't change on resize, but SVG dimensions do.
        // Recalculating position is good.
        updateSunPosition();
    }, { passive: true });
});