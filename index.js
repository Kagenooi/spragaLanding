const scene = document.getElementById("scene");
new Parallax(scene);

const playButton = document.querySelector(".video_play_button");
const videoPlayer = document.querySelector(".video_player");
playButton.addEventListener("click", () => {
    videoPlayer.play();
    playButton.classList.add("display_none");
});

videoPlayer.addEventListener("click", () => {
    videoPlayer.pause();
    playButton.classList.remove("display_none");
});

// const handleScroll = () => {
//     const scrollPosition = window.pageYOffset;
//
//     const parallaxSVGs = document.querySelectorAll(".parallax_svg");
//     parallaxSVGs.forEach((svg, index) => {
//         const scaleFactor = 0.005; // Adjust sensitivity of the effect
//         const maxScale = 1; // Maximum scale size
//         const minScale = 0.8; // Minimum scale size
//         const maxLeft = 30; // Maximum translation on X-axis (in pixels)
//         const minLeft = 0; // Minimum translation on X-axis
//
//         const scrollEffect = Math.sin(scrollPosition * scaleFactor + index);
//
//         const scale = minScale + ((maxScale - minScale) * (scrollEffect + 1)) / 2;
//
//         const left = minLeft + ((maxLeft - minLeft) * (scrollEffect + 1)) / 2;
//
//         svg.style.transform = `translateX(${left}px) scale(${scale})`;
//     });
// };
// const throttle = (callback, delay) => {
//     let lastCall = 0;
//     return function (...args) {
//         const now = new Date().getTime();
//         if (now - lastCall >= delay) {
//             lastCall = now;
//             callback(...args);
//         }
//     };
// };


// Get references to the elements
const path = document.getElementById("path"); // Assuming this is the path SVG element
const car = document.getElementById("car");
const parallaxSVGs = document.querySelectorAll(".parallax_svg");

// Function to handle parallax effect
const handleScroll = () => {
    const scrollPosition = window.pageYOffset; // Get the current scroll position

    parallaxSVGs.forEach((svg, index) => {
        // Oscillating scale factor using sine wave
        const scaleFactor = 0.005; // Adjust for sensitivity
        const maxScale = 2; // Maximum size
        const minScale = .8; // Minimum size

        const maxLeft = 20; // Maximum left translation
        const minLeft = 0; // Minimum left translation

        // Use Math.sin to create a smooth oscillation based on scroll
        const scale =
            minScale +
            ((maxScale - minScale) *
                (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
            2;

        const left =
            minLeft +
            ((maxLeft - minLeft) *
                (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
            2;

        // Combine scale and translateX in a single transform
        svg.style.transform = `translateX(${left}px) scale(${scale})`;
    });

    // Call autoScroll after handling parallax effects
    autoScroll();
};

// Function to auto-scroll the car along the path
const autoScroll = () => {
    const pathLength = path.getTotalLength(); // Get the total length of the path
    const speedFactor = 4;
    const scrollPosition = window.pageYOffset - 3000; // Adjust as needed
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    // Calculate the scroll ratio and multiply by speed factor
    const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 1); // Ensure ratio is capped at 1

    // Calculate the position on the path
    const positionOnPath = scrollRatio * pathLength; // Get a point on the path based on the scroll position

    // Get the current point on the path
    const point = path.getPointAtLength(positionOnPath);

    // Get the next point to calculate the angle
    const nextPointPosition = Math.min(positionOnPath + 1, pathLength); // Prevent going out of bounds
    const nextPoint = path.getPointAtLength(nextPointPosition);

    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    console.log(scrollPosition, ".....")
    // Update the car's position and rotation
    // car.style.transform = `translate(${point.x + 190}px, ${point.y - 50}px) rotate(${angle}deg) `;

    car.style.transform = `translate(${point.x + 190}px, ${point.y - 50}px) rotateY(${angle}deg) `;

};

window.addEventListener("scroll", handleScroll);


// const throttle = (callback, delay) => {
//     let lastCall = 0;
//     return function (...args) {
//         const now = new Date().getTime();
//         if (now - lastCall >= delay) {
//             lastCall = now;
//             callback(...args);
//         }
//     };
// };
//
// const transform = (car, point, angle) => {
//     car.style.transform = `translate(${point.x - car.offsetWidth / 2 + window.innerWidth / 2 - pathWidth / 2}px, ${point.y - car.offsetHeight / 2}px) rotate(${angle}deg)`;
// };
// const updateCarPosition = () => {
//     const scrollPosition = window.pageYOffset;
//     const totalHeight = document.body.scrollHeight - window.innerHeight;
//     car.style.display = "block";
//
//
//     const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 1); // Ensure ratio is capped at 1
//
//     // Calculate the position on the path
//     const positionOnPath = Math.min(scrollRatio * pathLength, pathLength); // Ensure we don't exceed the path length
//
//     // Get the current point on the path
//     const point = path.getPointAtLength(positionOnPath);
//
//     // Ensure we don't go out of bounds when getting the next point
//     const nextPointPosition = Math.min(positionOnPath + 10, pathLength); // Increase step size for smoother angle
//     const nextPoint = path.getPointAtLength(nextPointPosition);
//
//     // Calculate the angle for rotation
//     const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
//
//     // Apply the transformation using the throttled function
//     transform(car, point, angle);
// };
//
// // Apply throttling to scroll event
// window.addEventListener("scroll", throttle(updateCarPosition, 50));
//
// // Optional: Add CSS for smooth transition
// car.style.transition = "transform 0.05s ease-out";


// const path = document.getElementById("path");
// const car = document.getElementById("car");
// const pathLength = path.getTotalLength(); // Get the total length of the path
// const speedFactor = 4;
// const pathWidth = path.getBoundingClientRect().width;

// Throttle function to limit updates

//
// const transform = (car, point, angle) => {
//     car.style.transform = `translate(${point.x - car.offsetWidth / 2 + window.innerWidth / 2 - pathWidth / 2}px, ${point.y - car.offsetHeight / 2}px) rotateY(${-angle}deg)`;
// };
// //
// // // Scroll event handler
// const updateCarPosition = () => {
//     const scrollPosition = window.pageYOffset;
//     const totalHeight = document.body.scrollHeight - window.innerHeight;
//     car.style.display = "block";
//
//     // Calculate the scroll ratio and multiply by speed factor
//     const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 1); // Ensure ratio is capped at 1
//
//     // Calculate the position on the path
//     const positionOnPath = Math.min(scrollRatio * pathLength, pathLength); // Ensure we don't exceed the path length
//
//     // Get the current point on the path
//     const point = map.getPointAtLength(positionOnPath);
//     console.log(point, "+++++");
//     // Ensure we don't go out of bounds when getting the next point
//     const nextPointPosition = Math.min(positionOnPath + 10, pathLength); // Increase step size for smoother angle
//     const nextPoint = map.getPointAtLength(nextPointPosition);
//
//     // Calculate the angle for rotation
//     const angle =
//         Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
//
//     // Apply the transformation using the throttled function
//     transform(car, point, angle);
// };
// //
// // Apply throttling to scroll event
// window.addEventListener("scroll", throllate(updateCarPosition, 50));
// window.addEventListener("scroll", throllate(handleScroll, 50));
//
// car.style.transition = "transform 0.05s ease-out";
//
// window.addEventListener("scroll", () => {
//     const scrollPosition = window.pageYOffset;
//     const parallaxSVGs = document.querySelectorAll(".parallax_svg");
//
//     parallaxSVGs.forEach((svg, index) => {
//         // Oscillating scale factor using sine wave
//         const scaleFactor = 0.005; // Adjust for sensitivity
//         const maxScale = 1.3; // Maximum size
//         const minScale = 0.5; // Minimum size
//
//         const maxLeft = 300;
//         const minLeft = 0;
//
//         // Use Math.sin to create a smooth oscillation based on scroll
//         const scale =
//             minScale +
//             ((maxScale - minScale) *
//                 (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//             2;
//
//         // Apply the scale transformation
//         svg.style.transform = `scale(${scale})`;
//
//         const left =
//             minLeft +
//             ((maxLeft - minLeft) *
//                 (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//             2;
//
//         // Apply horizontal translation (translateX)
//         svg.style.transform = `translateX(${left}px)`;
//     });
// });

// function adaptive() {
//     const wrapper = document.querySelector("#adaptive");
//     let zoom = document.body.clientWidth / 19.2 / 100;
//     if (document.body.clientWidth > 981 && document.body.clientWidth < 1416) {
//         zoom = document.body.clientWidth / 14.4 / 100;
//     }
//     if (document.body.clientWidth > 520 && document.body.clientWidth < 980) {
//         zoom = document.body.clientWidth / 7.68 / 100;
//     }
//     if (document.body.clientWidth < 521) {
//         zoom = document.body.clientWidth / 3.7 / 100;
//     }
//     wrapper.style.zoom = zoom;
// }
//
// adaptive();
// window.addEventListener("resize", function () {
//     adaptive();
// });

// function scaleBody() {
//   const width = window.innerWidth;
//   const wrapper = document.querySelector("#adaptive");
//   // Adjust scale based on window width
//   if (width < 600) {
//     wrapper.style.transform = "scale(0.8)";
//   } else if (width >= 600 && width < 1200) {
//     wrapper.style.transform = "scale(0.9)";
//   } else {
//     wrapper.style.transform = "scale(1)";
//   }
//
//   // Set the transform origin to prevent content from shifting awkwardly
//   wrapper.style.transformOrigin = "top left";
// }
//
// // Add event listener to window resize
// window.addEventListener("resize", scaleBody);
//
// // Call it once initially to set the correct scale when the page loads
// scaleBody();


// const handleScroll = () => {
//     const path = document.getElementById("path");
//     const car = document.getElementById("car");
//
//     if (!path || !car) {
//         console.warn("Path or car element not found.");
//         return;
//     }
//
//     const pathLength = path.getTotalLength();
//     const speedFactor = 4;
//     const pathWidth = path.getBoundingClientRect().width;
//     const scrollPosition = window.pageYOffset - 3000; // Adjusted to start at 0
//     const totalHeight = document.body.scrollHeight - window.innerHeight;
//
//     // Calculate scroll ratio (between 0 and 1)
//     const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 1);
//
//     // Get the position along the path
//     const positionOnPath = scrollRatio * pathLength;
//
//     // Get the current point on the path
//     const point = path.getPointAtLength(positionOnPath);
//
//     // Get the next point to calculate angle
//     const nextPointPosition = Math.min(positionOnPath + 10, pathLength); // Step size adjusted for smoother angle calculation
//     const nextPoint = path.getPointAtLength(nextPointPosition);
//
//     // Calculate the angle for rotation
//     const angle =
//         Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
//
//     // Adjust the car's position to the right side of the path (assume car should stay 20px away from the path line)
//     const offsetFromPath = 20;
//     const carOffsetX = point.x + offsetFromPath;
//
//     // Translate the car to the right of the path and rotate it
//     car.style.transform = `translate(${point.x + 350}px, ${point.y}px) rotate(${angle}deg)`;
// };
//
// window.addEventListener("scroll", throttle(handleScroll, 20));
