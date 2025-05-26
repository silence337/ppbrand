import '../scss/index.scss';
import { promise, ScrollListener, ResizeSet, Debounce, videoObserver } from './utils';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from 'gsap/ScrollSmoother';


class begin {
	constructor () {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        let scroller = ScrollSmoother.create({
            speed: 1, 
            effects: true, 
            smooth: 2, 
            effects: true, 
            smoothTouch: 0.1, 
        });
        this.element = (selector) => document.querySelector(selector);
        this.section1 = this.element('.section1');
        this.section2 = this.element('.section2');
        this.section3 = this.element('.section3');
        this.section4 = this.element('.section4');
        this.section5 = this.element('.section5');

        document.addEventListener("DOMContentLoaded", () => {
            this._BindSceneAnimate1();
            this._BindSceneAnimate2();
            this._BindSceneAnimate3();
            this._BindSceneAnimate4();
            this._BindSceneAnimate5();
            videoObserver();
        });
	}

	_BindSceneAnimate1 () {
        const person = this.section1.querySelector('.person'),
              radial = this.section1.querySelector('.radial'),
              header = this.section1.querySelector('.begin-header'),
              headerTypo1 = header.querySelector('h1'),
              headerTypo2 = header.querySelector('p'),
              brandSVG = this.section1.querySelector('.brandsvg'),
              round = this.section1.querySelector('.round'),
              backclip = this.section1.querySelector('.backclip'),
              movieclip = this.section1.querySelector('.movieclip');
            

        promise(1000).then(()=>{
            brandSVG.classList.add('animated')
        })


        let tl = gsap.timeline({
            defaults: {
                duration:4,
            },
            scrollTrigger: {
                trigger: this.section1,
                start: "top top",
                scrub: 1,
                //markers: true,
                invalidateOnRefresh: true,
            },
        });
        let headerTypo = gsap.timeline({
            defaults: {
                duration:5,
            },
            scrollTrigger: {
                trigger: this.section1,
                start: "top -10%",
                scrub: 1,
                //markers: true,
                invalidateOnRefresh: true,
            },
        });

        
        tl.to(person, {
            x: 400, 
            skewX: 8,
            scale: 1.3,
  			onStart: () => { 
                header.classList.add('remove');
			},
            onUpdate: () => {
                header.classList.remove('remove');
            }
        })
        .to(radial, {y: -500, scale: 1.8, duration: 2, }, '<')
        
        headerTypo.fromTo(headerTypo1, { x: 0, opacity: 1}, { x: -400, opacity: 0,
  			onStart: () => { 
                brandSVG.classList.remove('animated');
			},
            onReverseComplete: () => {
                brandSVG.classList.add('animated');
            }
        })
        headerTypo.fromTo(headerTypo2, { x: 0, opacity: 1}, { x: -100, opacity: 0}, '<-=0.2')


        tl.to(round, {
            top: 0,
            scrollTrigger: {
                trigger: this.section1,
                start: "bottom",
                end: 'bottom 100%',
                pin:round,
                endTrigger: this.section2,
                scrub: 3, 
                pinSpacing: false,
                invalidateOnRefresh: true,
               // markers: true,
            },
        }, '<')
        .to(backclip, {
            width:400,
            height:400,
            overflow:'hidden',
            duration: 4,
        })
        .to(backclip.querySelector('ol'), {opacity:0, scale:0, duration: 4,},'<')
        .to(movieclip, {
            width:400,
            height:400,
            duration: 4,
  			onStart: () => { 
                movieclip.classList.add('start');
			},
  			onUpdate: () => { 
                movieclip.classList.add('start');
			},
            onReverseComplete: () => {
                movieclip.classList.remove('start');
            }
        },'<+=2');

    }

    _BindSceneAnimate2 () {
        const liner1 = this.section2.querySelector('.liner1');
        const liner2 = this.section2.querySelector('.liner2');

        let liner = gsap.timeline({
            scrollTrigger: {
                trigger: this.section2,
                start: "top top", 
                end: 'bottom 100%',
                scrub: 5, 
                //markers: true,
                invalidateOnRefresh: true,
				pin: true,
                pinSpacing: false
            },
        });

        liner.to(liner1, { width: '100%', duration: 2,}, '<');
        liner.to(liner2, { width: '100%', duration: 2,}, '<+=0.2');
        liner.to('.left-image img', { opacity: 0.4, duration: 2,}, '<-=0.5');

        let gallery = gsap.timeline({
            scrollTrigger: {
                trigger: ".section2",
                start: "top", 
                end: "bottom 120%",
                scrub: 4, 
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        gallery.fromTo('.gallery li',{autoAlpha: 0}, {x: 800, y: -200, autoAlpha: 1,duration:5, stagger: 5.5,}, '<+=5'); 

    }

    _BindSceneAnimate3() {
        const back = this.section3.querySelector('.back'),
              textLeft = this.section3.querySelector('.text-left'),
              test = this.section3.querySelector('.test'),
              box = test.querySelector('.box'),
              img1 = test.querySelector('.img1'),
              img2 = test.querySelector('.img2'),
              wm1 = test.querySelector('.wm1'),
              wm2 = test.querySelector('.wm2'),
              imgText = test.querySelector('.img-text'),
              leftText = test.querySelector('.left-text');

        let tlBack = gsap.timeline({
            scrollTrigger: {
                trigger: this.section3,
                start: "0 bottom", 
                end: '20%',
                scrub: 5, 
                //markers: true,
                invalidateOnRefresh: true,
            },
        });
        tlBack.fromTo(back ,{y:200, scale:0.5, autoAlpha: 0}, {y: 0, scale:1, autoAlpha: 1,duration:3}, '<');

        let tltypo = gsap.timeline({
            scrollTrigger: {
                trigger: this.section3,
                start: "10% bottom", 
                end: 'bottom bottom',
                scrub: 5, 
                //markers: true,
                invalidateOnRefresh: true,
            }
        });

        const textElements = gsap.utils.toArray('.text');
        textElements.forEach(text => {
            tltypo.to(text, {
                backgroundSize: '100%',
                duration: 3,//ease: 'none',
                scrollTrigger: {
                    trigger: text,
                    start: 'center 80%',
                    end: 'center 20%',
                    scrub: true,
                },
            });
        });
         tlBack.fromTo(textLeft ,{x:-500}, {ease:'none', x:600,  duration:1}, '<+=0.8');


        let boxAnimate = gsap.timeline({
            scrollTrigger: {
                trigger: test,
                start: "top top", 
                end: 'bottom 100%',
                scrub: 1, 
                pin: true,
                pinSpacing: false,
               // markers: true,
                invalidateOnRefresh: true,
            }
        });
        boxAnimate.to(box, {width:200,height:200, opacity:1, rotate: 360,  duration:3})
                  .to(img1, {x:100, y:-100, width:200,height:200, opacity:1, duration:3},'<-=0.1')
                  .to(img2, {x:50, y:-150, width:200,height:200, opacity:1, duration:3})
                  .to(img1, {x:-100, y:100, width:0,height:0, opacity:0, duration:3},'+=2')
                  .to(img2, {x:200, y:-300, width:0,height:0, opacity:0, duration:3})
                  .to(box, {width:800,height:700, y:-200, duration:2})
                  .to(wm1, {opacity:1, duration:3})
                  .to(imgText, {x:-200, opacity:1, duration:3})
                  .to(wm1, {x:-300, opacity:0, duration:3},'+=1.5')
                  .to(wm2, {x:200, opacity:1, duration:3})
                  .to(leftText, {x:700, opacity:1, duration:5},'+=5')
    }
    _BindSceneAnimate4() {
        const topText = this.section4.querySelector('.top-text');
        const pinText = this.section4.querySelector('.pintext');

        let topTextArea = gsap.timeline({
            scrollTrigger: {
                trigger: topText,
                start: "top 30%", 
                end: 'bottom bottom',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
            }
        });
        topTextArea.fromTo(topText.querySelector('h4 span'),{y:194, ease:'none', duration:0.1 }, {y:0, ease:'none', duration:0.1 });
        topTextArea.fromTo(pinText.querySelector('span'),{y:-194, ease:'none', duration:0.1 }, {y:0, ease:'none', duration:0.1 });

        let galleryList = gsap.timeline({
            scrollTrigger: {
                trigger: '.gallery-list',
                start: "top 40%", 
                end: "bottom bottom",
                scrub: 4, 
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        galleryList.to('.gallery-list li', {x:100, y: -150, autoAlpha: 1, ease:'none', stagger: 0.1,});

        let galleryPin = gsap.timeline({
            scrollTrigger: {
                trigger: '.gallery-list',
                start: "top top", 
                endTrigger: this.section4,
                end: "bottom bottom",
                scrub: 4, 
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        galleryPin.to('.circle .inner', {scale:2500, ease:'none'},'<+=0.7')
    }

    _BindSceneAnimate5 () {
        let tl5 = gsap.timeline({
            scrollTrigger: {
                trigger: this.section5,
                start: "top 60%", 
                end: "bottom bottom",
                scrub: 1, 
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        tl5.to('.section5 .text span', {height:0, ease:'none', stagger: 0.2,})
    }

    _videoObserver () {
        var videoPlayer = document.querySelectorAll('[data-video-observer]');

        if ( videoPlayer.length < 1 ) return;

        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(function (entry) {
                var youtube = entry.target.dataset.videoPlayer === 'youtube'; 

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
}
new begin();