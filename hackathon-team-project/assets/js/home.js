// document.addEventListener("DOMContentLoaded", () => {
//     const marquee = document.querySelector(".marquee-inner");
//     const speed = 1; // Scrolling Speed
//     let scrollAmount = 0;
//     let isHovered = false;

//     // Duplicates the content
//     const marqueeContent = marquee.innerHTML;
//     marquee.innerHTML += marqueeContent;

//     const startScrolling = () => {
//         if (!isHovered) {
//             scrollAmount -= speed;
//             if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
//                 scrollAmount = 0;
//             }
//             marquee.style.transform = `translateX(${scrollAmount}px)`;
//         }
//         requestAnimationFrame(startScrolling);
//     };

//     marquee.addEventListener("mouseover", () => {
//         isHovered = true;
//     });

//     marquee.addEventListener("mouseout", () => {
//         isHovered = false;
//     });

//     startScrolling();
// });
document.addEventListener("DOMContentLoaded", () => {
    const marquee = document.querySelector(".marquee-inner");
    const speed = 1; // Scrolling Speed
    let scrollAmount = 4;
    let isHovered = false;

    // Duplicate content for infinite scrolling
    const marqueeContent = marquee.innerHTML;
    marquee.innerHTML += marqueeContent;

    // Responsive Speed Adjustment (Optional)
    const adjustScrollSpeed = () => {
        if (window.innerWidth < 768) {
            scrollAmount = 2; // Slow down for smaller screens
        } else if (window.innerWidth < 1024) {
            scrollAmount = 3; // Medium speed for tablets
        } else {
            scrollAmount = 4; // Default speed for larger screens
        }
    };

    adjustScrollSpeed(); // Set speed on load

    // Adjust speed on window resize
    window.addEventListener("resize", adjustScrollSpeed);

    const startScrolling = () => {
        if (!isHovered) {
            scrollAmount -= speed;
            if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
                scrollAmount = 0;
            }
            marquee.style.transform = `translateX(${scrollAmount}px)`;
        }
        requestAnimationFrame(startScrolling);
    };

    marquee.addEventListener("mouseover", () => {
        isHovered = true;
    });

    marquee.addEventListener("mouseout", () => {
        isHovered = false;
    });

    startScrolling();
});
