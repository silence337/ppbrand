import { gsap } from "gsap";


export const gsapFillter = () => {
    const blurProperty = 
        gsap.utils.checkPrefix("filter"),
        blurExp = /blur\((.+)?px\)/,
        getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

    gsap.registerPlugin({
        name: "blur",
        get(target) {
            return +(getBlurMatch(target)[1]) || 0;
        },
        init(target, endValue) {
            let data = this,
            filter = gsap.getProperty(target, blurProperty),
            endBlur = "blur(" + endValue + "px)",
            match = getBlurMatch(target)[0],
            index;
            if (filter === "none") {
                filter = "";
            }
            if (match) {
                index = filter.indexOf(match);
                endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
            } else {
                endValue = filter + endBlur;
                filter += filter ? " blur(0px)" : "blur(0px)";
            }
            data.target = target; 
            data.interp = gsap.utils.interpolate(filter, endValue); 
        },
        render(progress, data) {
            data.target.style[blurProperty] = data.interp(progress);
        }
    });
}
export const promise = (timer) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timer);
    });
}

export const RequestFrame = cb => {
    var rafTimeout = null;
    return () => {
        if (rafTimeout) {
            window.cancelAnimationFrame(rafTimeout);
        }
        rafTimeout = window.requestAnimationFrame(function () {
            cb();
        });
    };
}
export const Debounce = func =>{
    var timer;
    return event => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(func,100,event);
    };
}


let ResizeState = false;

export const ResizeGet = () => {
    return ResizeState;
}
export const ResizeSet = s => {
    return ResizeState = s;
}
export const ScrollListener = (target, fn) => {
    return target.addEventListener('scroll', RequestFrame(() => {
        if (typeof fn === 'function') {
            fn();
        } else {
            window[fn].call();
        }
    }, false));
}

export const videoObserver = () => {
    var videoPlayer = document.querySelectorAll('[data-video-observer]');

    if ( videoPlayer.length < 1 ) return;

    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(function (entry) {
            var youtube = entry.target.dataset.videoPlayer === 'youtube'; // 테스트 안됨

            console.log(entry.intersectionRatio);

            if (entry.intersectionRatio > 0.1) {
                if ( youtube ) {
                    return entry.target.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
                }
                entry.target.play();
                console.log('play');
            } else {
                if ( youtube ) {
                    return entry.target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');
                }
                entry.target.pause();
                console.log('pause');
            }
        });
    },{
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.1,
    });

    videoPlayer.forEach((el) => {
        observer.observe(el);
    })
}