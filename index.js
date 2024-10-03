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


const parallaxSVGs = document.querySelectorAll(".parallax_svg");

// Function to handle parallax effect
const handleScroll = () => {

    // if (window.innerWidth < 1024) {
        return;
    // }
    const scrollPosition = window.pageYOffset; // Get the current scroll position

    parallaxSVGs.forEach((svg, index) => {
        // Oscillating scale factor using sine wave
        const scaleFactor = 0.005; // Adjust for sensitivity
        const maxScale = 1; // Maximum size
        const minScale = 0.8; // Minimum size

        const maxLeft = 50;
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

};



window.addEventListener("scroll", handleScroll);

const path = document.getElementById("path");
const path2 = document.getElementById("path2");
const car = document.getElementById("car");
const pathLength = path.getTotalLength();
const path2Length = path2.getTotalLength();
const speedFactor = 4;          // Speed for the first path
const path2SpeedFactor = 6;     // Speed for the second path
const myDiv = document.getElementById("positionScroll");

const transformPath1 = (car, point, angle, scaleFactor = 1) => {
    const offsetX = car.offsetWidth / 2;
    const offsetY = car.offsetHeight / 2;
    car.style.transform = `translate(${point.x + 25 - offsetX - 5}px, ${point.y - 40 - offsetY}px) rotate(${angle}deg) scale(${scaleFactor})`;
};

const transformPath2 = (car, point, angle, scaleFactor = 1) => {
    const offsetX = car.offsetWidth / 2;
    const offsetY = car.offsetHeight / 2;
    car.style.transform = `translate(${point.x + 25 - offsetX - 5}px, ${point.y - 90 - offsetY}px) rotate(${angle}deg) scale(${scaleFactor})`;
};

const updateCarPositionOnPath1 = (scrollRatio) => {

    let positionOnPath = scrollRatio * pathLength;
    let point = path.getPointAtLength(positionOnPath);
    const nextPointPosition = Math.min(positionOnPath + 1, pathLength);
    const nextPoint = path.getPointAtLength(nextPointPosition);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    transformPath1(car, point, angle);
};

const updateCarPositionOnPath2 = (scrollRatio) => {
    let path2ScrollRatio = (scrollRatio - 1) * path2SpeedFactor; // Apply higher speed on path2
    let positionOnPath = Math.min(path2ScrollRatio * path2Length, path2Length-200);
    let point = path2.getPointAtLength(positionOnPath);
    const nextPointPosition = Math.min(positionOnPath + 1, path2Length);
    const nextPoint = path2.getPointAtLength(nextPointPosition);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

    transformPath2(car, point, angle);
};
const updateCarPosition = () => {
    // if (window.innerWidth < 1024) {
        return;
    // }
    car.style.display = "block";
    const scrollPosition = window.pageYOffset-2800-(window.innerHeight/2);
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 2); // Cap at 2 to cover both paths
    if (scrollRatio <= 1) {
        updateCarPositionOnPath1(scrollRatio);
    } else {
        updateCarPositionOnPath2(scrollRatio);
    }
};

window.addEventListener("scroll", updateCarPosition);
