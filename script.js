// script.js
(() => {
  const IMG_URL = "https://raw.githubusercontent.com/mrdeeppatel/D7360.github.io/refs/heads/main/panoramas/FrontGateLeftSideFinal.jpg";

  // Year in footer
  document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  // Wait until View360 global is ready
  window.addEventListener("load", () => {
    const container = "#viewer";
    const loadingEl = document.getElementById("loading");

    // Guard for CDN loading
    if (!window.View360) {
      if (loadingEl) loadingEl.innerHTML = "<span class='loading-text'>Failed to load viewer. Check your connection.</span>";
      return;
    }

    // Create viewer with equirectangular projection (panorama image)
    const viewer = new View360.View360(container, {
      projection: new View360.EquirectProjection({
        src: IMG_URL,
      }),
      wheelGesture: true,
      gyro: true, // enable device motion on mobile
      autoplay: false,
    });

    // Hide loader when ready
    viewer.once("ready", () => {
      loadingEl?.remove();
    });

    // Handle image load errors
    viewer.on("error", (e) => {
      if (loadingEl) {
        loadingEl.innerHTML = "<span class='loading-text'>Could not load the panorama image.</span>";
      }
      console.error(e);
    });

    // Reset camera button
    const resetBtn = document.getElementById("resetBtn");
    resetBtn?.addEventListener("click", () => {
      // Smoothly move back to yaw=0, pitch=0, fov default
      viewer.lookAt({ yaw: 0, pitch: 0 }, { duration: 600, easing: t => 1 - Math.pow(1 - t, 3) });
    });

    // Example: hotspot for future linking (currently placeholder)
    // You can place clickable overlays relative to the container.
    // When you have another pano ready, replace '#' with its page or update the projection.src dynamically.
    createHotspot({
      left: "72%",
      top: "56%",
      label: "Go inside (coming soon)",
      href: "#",
      disabled: true
    });

    function createHotspot({ left, top, label, href, disabled = false }) {
      const el = document.createElement("a");
      el.className = "hotspot" + (disabled ? " is-disabled" : "");
      el.href = disabled ? "javascript:void(0)" : href;
      el.textContent = label;
      Object.assign(el.style, { left, top });
      document.querySelector(container)?.appendChild(el);
    }
  });
})();
