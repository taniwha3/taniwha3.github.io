        // Create scanline container and add multiple scanlines
        const scanlineContainer = document.createElement('div');
        scanlineContainer.style.position = 'fixed';
        scanlineContainer.style.top = '0';
        scanlineContainer.style.left = '0';
        scanlineContainer.style.width = '100%';
        scanlineContainer.style.height = '100%';
        scanlineContainer.style.zIndex = '0';
        scanlineContainer.style.overflow = 'hidden';
        scanlineContainer.style.pointerEvents = 'none';
        document.body.insertBefore(scanlineContainer, document.body.firstChild);
        
        // Create multiple scan lines with staggered start positions
        for (let i = 0; i < 8; i++) {
            const scanline = document.createElement('div');
            scanline.className = 'scanline';
            scanline.style.opacity = Math.random() * 0.3 + 0.1;  // Random opacity
            scanline.style.height = (Math.random() * 2 + 1) + 'px';  // Random height
            
            // Create longer animation duration for more realistic effect
            const duration = (Math.random() * 6 + 6) + 's';  // 6-12 seconds
            scanline.style.animationDuration = duration;
            
            // Start each scanline at a different position in the animation
            const delay = (Math.random() * -10) + 's';  // Random negative delay to stagger starting positions
            scanline.style.animationDelay = delay;
            
            scanlineContainer.appendChild(scanline);
        }
        
        // Add subtle pulsing animation to the sun logo
        const sunLogo = document.querySelector('.sun-logo');
        if (sunLogo) {
            let glowSize = 15;
            let increasing = true;
            
            setInterval(function() {
                // Smooth pulse effect
                if (increasing) {
                    glowSize += 0.5;
                    if (glowSize >= 25) increasing = false;
                } else {
                    glowSize -= 0.5;
                    if (glowSize <= 10) increasing = true;
                }
                
                sunLogo.style.boxShadow = "0 0 " + glowSize + "px var(--neon-pink)";
            }, 100); // Faster interval for smoother animation
        }
        
        // Add hover effects to table rows
        document.querySelectorAll('tr').forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'rgba(59, 0, 96, 0.3)';
            });
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
        
        // Animated scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    