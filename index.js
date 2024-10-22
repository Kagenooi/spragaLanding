const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

window.onscroll = function () {
    const header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

const body = document.querySelector("body");
const menuButton = document.querySelector(".menu_button");
const closeButton = document.querySelector(".mobile_menu_close");
const menu = document.querySelector(".mobile_menu");
const mobileNavBarItems = document.querySelectorAll(".mobile_nav_bar_item");

mobileNavBarItems.forEach((item) => {
    item.addEventListener("click", () => {
        menu.classList.remove("mobile_menu_show");
        body.classList.remove("overflow_hidden");
    });
});

menuButton.addEventListener("click", () => {
    menu.classList.add("mobile_menu_show");
    body.classList.add("overflow_hidden");
});

closeButton.addEventListener("click", () => {
    menu.classList.remove("mobile_menu_show");
    body.classList.remove("overflow_hidden");
});

const generalTerms = document.querySelector(".general_terms_link");
const privacyPolicy = document.querySelector(".privacy_policy_link");
const paths = window.location.pathname;
const page = paths.split("/").pop(); // Gets the last part of the path


if (page === "privacy_policy.html") {
    console.log("You are on the index page.");
    privacyPolicy.style.color = "#E29723";

} else if (page === "general_terms.html") {
    generalTerms.style.color = "#E29723";
} else {
    console.log("You are on a different page.");
}
let parallaxInstance;

const checkParallax = () => {
    const scene = document.getElementById("scene");

    if (window.innerWidth > 1024) {
        if (!parallaxInstance) {
            parallaxInstance = new Parallax(scene);
        }
    } else {
        if (parallaxInstance) {
            parallaxInstance.destroy();
            parallaxInstance = null;
        }
    }
};

checkParallax();

window.addEventListener("resize", checkParallax);




const playButton = document.querySelector(".video_play_button");
const videoPlayer = document.querySelector(".video_player");
playButton?.addEventListener("click", () => {
    videoPlayer.play();
    playButton.classList.add("display_none");
});

videoPlayer?.addEventListener("click", () => {
    videoPlayer.pause();
    playButton.classList.remove("display_none");
});


const parallaxSVGs = document.querySelectorAll(".parallax_svg");

const handleScroll = () => {

    if (window.innerWidth < 1024) {
        return;
    }
    const scrollPosition = window.pageYOffset;

    parallaxSVGs.forEach((svg, index) => {

        const scaleFactor = 0.005;
        const maxScale = 1;
        const minScale = 0.8;

        const maxLeft = 50;
        const minLeft = 0;

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

        svg.style.transform = `translateX(${left}px) scale(${scale})`;
    });

};



window.addEventListener("scroll", handleScroll);

const path = document.getElementById("path");
const path2 = document.getElementById("path2");
const car = document.getElementById("car");
const pathLength = path.getTotalLength();
const path2Length = path2.getTotalLength();
const speedFactor = 4;
const path2SpeedFactor = 6;

const translatePositions = [
    { scrollPosition: 0, translateX: 0, translateY: -30 },
    { scrollPosition: 0.15, translateX: 38, translateY: 55 },
    { scrollPosition: 0.33, translateX: 50, translateY: 0 },
    { scrollPosition: 0.45, translateX: 15, translateY: -30 },
    { scrollPosition: 0.6, translateX: 30, translateY: -27 },
    { scrollPosition: 0.75, translateX: -10, translateY: 20 },
    { scrollPosition: 0.9, translateX: 13, translateY: 14 },
    { scrollPosition: 1, translateX: 10, translateY: 20 },
];

const interpolate = (start, end, t) => {
    return start + (end - start) * t;
};

const getTranslateValues = (scrollRatio) => {
    let translateX = 0;
    let translateY = 0;
    for (let i = 0; i < translatePositions.length - 1; i++) {
        const start = translatePositions[i];
        const end = translatePositions[i + 1];

        if (scrollRatio >= start.scrollPosition && scrollRatio < end.scrollPosition) {
            const t = (scrollRatio - start.scrollPosition) / (end.scrollPosition - start.scrollPosition);
            translateX = interpolate(start.translateX, end.translateX, t);
            translateY = interpolate(start.translateY, end.translateY, t);
            break;
        }
    }
    return { translateX, translateY };
};

const updateCarPositionOnPath1 = (scrollRatio) => {
    const positionOnPath = scrollRatio * pathLength;
    const point = path.getPointAtLength(positionOnPath);
    const nextPointPosition = Math.min(positionOnPath + 1, pathLength);
    const nextPoint = path.getPointAtLength(nextPointPosition);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    const { translateX, translateY } = getTranslateValues(scrollRatio);

    anime({
        targets: car,
        translateX: point.x + 25 - car.offsetWidth / 2 - 5 + translateX,
        translateY: point.y - 40 - car.offsetHeight / 2 + translateY,
        rotate: angle,
        duration: 0, // Animation duration is controlled by scroll speed.
        easing: 'linear'
    });
};

const updateCarPositionOnPath2 = (scrollRatio) => {
    const path2ScrollRatio = (scrollRatio - 1) * path2SpeedFactor;
    const positionOnPath = Math.min(path2ScrollRatio * path2Length, path2Length - 200);
    const point = path2.getPointAtLength(positionOnPath);
    const nextPointPosition = Math.min(positionOnPath + 1, path2Length);
    const nextPoint = path2.getPointAtLength(nextPointPosition);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    const { translateX, translateY } = getTranslateValues(scrollRatio);

    anime({
        targets: car,
        translateX: point.x + 25 - car.offsetWidth / 2 - 5 + translateX,
        translateY: point.y - 90 - car.offsetHeight / 2 + translateY,
        rotate: angle,
        duration: 0, // Animation duration is controlled by scroll speed.
        easing: 'linear'
    });
};

const updateCarPosition = () => {
    if (window.innerWidth < 1024) {
        return;
    }
    car.style.display = "block";
    const scrollPosition = window.pageYOffset - 2800 - (window.innerHeight / 2);
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = Math.min((scrollPosition / totalHeight) * speedFactor, 2); // Cap at 2 to cover both paths

    if (scrollRatio <= 1) {
        updateCarPositionOnPath1(scrollRatio);
    } else {
        updateCarPositionOnPath2(scrollRatio);
    }
};

window.addEventListener("scroll", updateCarPosition);