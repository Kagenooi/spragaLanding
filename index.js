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
//   const scrollPosition = window.pageYOffset;
//
//   const parallaxSVGs = document.querySelectorAll(".parallax_svg");
//   parallaxSVGs.forEach((svg, index) => {
//     const scaleFactor = 0.005; // Adjust for sensitivity
//     const maxScale = 1; // Maximum size
//     const minScale = 0.7; // Minimum size
//     const maxLeft = 210; // Maximum left translation
//     const minLeft = 0; // Minimum left translation
//
//     const scale =
//       minScale +
//       ((maxScale - minScale) *
//         (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//         2;
//
//     const left =
//       minLeft +
//       ((maxLeft - minLeft) *
//         (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//         2;
//
//     // Combine scale and translateX in a single transform
//     svg.style.transform = `translateX(${left}px) scale(${scale})`;
//   });
// };
// const path = document.getElementById("path");
// const car = document.getElementById("car");
// const pathLength = path.getTotalLength(); // Get the total length of the path
// const speedFactor = 4;
// const pathWidth = path.getBoundingClientRect().width;
//
// // Throttle function to limit updates
// const throllate = (callback, delay) => {
//   let lastCall = 0;
//   return function (...args) {
//     const now = new Date().getTime();
//     if (now - lastCall >= delay) {
//       lastCall = now;
//       callback(...args);
//     }
//   };
// };
//
// const transform = (car, point, angle) => {
//   car.style.transform = `translate(${point.x - car.offsetWidth / 2 + window.innerWidth / 2 - pathWidth / 2}px, ${point.y - car.offsetHeight / 2}px) rotateY(${-angle}deg)`;
// };
//
// // Scroll event handler
// const updateCarPosition = () => {
//   const scrollPosition = window.pageYOffset;
//   const totalHeight = document.body.scrollHeight - window.innerHeight;
//   car.style.display = "block";
//
//   // Calculate the scroll ratio and multiply by speed factor
//   const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 1); // Ensure ratio is capped at 1
//
//   // Calculate the position on the path
//   const positionOnPath = Math.min(scrollRatio * pathLength, pathLength); // Ensure we don't exceed the path length
//
//   // Get the current point on the path
//   const point = path.getPointAtLength(positionOnPath);
//   console.log(point, "+++++");
//   // Ensure we don't go out of bounds when getting the next point
//   const nextPointPosition = Math.min(positionOnPath + 10, pathLength); // Increase step size for smoother angle
//   const nextPoint = path.getPointAtLength(nextPointPosition);
//
//   // Calculate the angle for rotation
//   const angle =
//     Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
//
//   // Apply the transformation using the throttled function
//   transform(car, point, angle);
// };
//
// // Apply throttling to scroll event
// window.addEventListener("scroll", throllate(updateCarPosition, 50));
// window.addEventListener("scroll", throllate(handleScroll, 50));
//
// car.style.transition = "transform 0.05s ease-out";

// window.addEventListener("scroll", () => {
//   const scrollPosition = window.pageYOffset;
//   const parallaxSVGs = document.querySelectorAll(".parallax_svg");
//
//   parallaxSVGs.forEach((svg, index) => {
//     // Oscillating scale factor using sine wave
//     const scaleFactor = 0.005; // Adjust for sensitivity
//     const maxScale = 1.3; // Maximum size
//     const minScale = 0.5; // Minimum size
//
//     const maxLeft = 300;
//     const minLeft = 0;
//
//     // Use Math.sin to create a smooth oscillation based on scroll
//     const scale =
//       minScale +
//       ((maxScale - minScale) *
//         (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//         2;
//
//     // Apply the scale transformation
//     svg.style.transform = `scale(${scale})`;
//
//     const left =
//       minLeft +
//       ((maxLeft - minLeft) *
//         (Math.sin(scrollPosition * scaleFactor + index) + 1)) /
//         2;
//
//     // Apply horizontal translation (translateX)
//     svg.style.transform = `translateX(${left}px)`;
//   });
// });

// function adaptive() {
//   const wrapper = document.querySelector("#adaptive");
//   let zoom = document.body.clientWidth / 19.2 / 100;
//   if (document.body.clientWidth > 981 && document.body.clientWidth < 1416) {
//     zoom = document.body.clientWidth / 14.4 / 100;
//   }
//   if (document.body.clientWidth > 520 && document.body.clientWidth < 980) {
//     zoom = document.body.clientWidth / 7.68 / 100;
//   }
//   if (document.body.clientWidth < 521) {
//     zoom = document.body.clientWidth / 3.7 / 100;
//   }
//   wrapper.style.zoom = zoom;
// }
//
// adaptive();
// window.addEventListener("resize", function () {
//   adaptive();
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
