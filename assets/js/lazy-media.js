const lazyVideos = document.querySelectorAll("video[data-lazy-video]");

function hydrateVideo(video) {
    if (video.dataset.loaded === "true") {
        return;
    }

    const sources = video.querySelectorAll("source[data-src]");
    sources.forEach((source) => {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
    });

    video.load();
    video.dataset.loaded = "true";
}

function playVideo(video) {
    if (typeof video.play !== "function") {
        return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
    }
}

if (lazyVideos.length) {
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;

                if (entry.isIntersecting) {
                    hydrateVideo(video);
                    playVideo(video);
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: "320px 0px",
            threshold: 0.01,
        });

        lazyVideos.forEach((video) => observer.observe(video));
    } else {
        lazyVideos.forEach((video) => {
            hydrateVideo(video);
            playVideo(video);
        });
    }
}
