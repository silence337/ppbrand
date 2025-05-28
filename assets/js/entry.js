import '../scss/index.scss';
import { promise, ScrollListener, ScrollTop, Debounce, videoObserver, elmentObserver } from './utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
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

        document.addEventListener('DOMContentLoaded', () => {
            this._BindSceneAnimate1();
            this._BindSceneAnimate2();
            this._BindSceneAnimate3();
            this._BindSceneAnimate4();
            this._BindSceneAnimate5();
            videoObserver();
        });
	}

	_BindSceneAnimate1 () {
        const mainText = this.section1.querySelectorAll('p');

        let scrollTop = ScrollTop ();
        if (scrollTop === 0) {
            gsap.set(mainText, {opacity:0, x: -200})
            gsap.to(mainText, {x:0, autoAlpha: 1,duration:1, stagger: 0.5,});
        }

        gsap.timeline({
            scrollTrigger: {
                trigger: this.section1.querySelector('.inner'),
                start: 'top top', 
                endTrigger: this.section2,
                end: 'bottom 100%',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
				pin: true,
                pinSpacing: false
            },
        });
        let sectionScroll = gsap.timeline({
            scrollTrigger: {
                trigger: this.section1,
                start: 'top top', 
                end: 'bottom 100%',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
            },
        });
        sectionScroll.to(mainText[0], {x:-200, duration:1, stagger: 0.5,})
                     .to(mainText[1], {x:200, duration:1, stagger: 0.5,})
                     .to(mainText[2], {x:400, duration:1, stagger: 0.5,});
    }

    _BindSceneAnimate2 () {

        
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
                start: '0 bottom', 
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
                start: '10% bottom', 
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
                start: 'top top', 
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
        const galleryList = this.section4.querySelector('.gallery-list');

        let topTextArea = gsap.timeline({
            scrollTrigger: {
                trigger: topText,
                start: 'top 30%', 
                end: 'bottom bottom',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
            }
        });
        topTextArea.fromTo(topText.querySelector('h4 span'),{y:194, ease:'none', duration:0.1 }, {y:0, ease:'none', duration:0.1 });
        topTextArea.fromTo(pinText.querySelector('span'),{y:-194, ease:'none', duration:0.1 }, {y:0, ease:'none', duration:0.1 });


        this._SequenceCanvas ();

        let scrollSequence = gsap.timeline({
            onUpdate: this.render,
            scrollTrigger: {
                trigger: '.sequence-wrap',
                endTrigger: this.section4,
                start: 'top top', 
                end: 'bottom bottom',
                scrub:0.5, 
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
                //markers: true,
            },
        });

        scrollSequence.to(this.seq, {
            frame: this.frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
            invalidateOnRefresh: true,
        }, 0);


        gsap.utils.toArray(galleryList.querySelectorAll('li')).forEach((list) => {
            const image = list.querySelector("img");

            gsap.to(image, {
                yPercent: -70,
                ease: 'none',
                scrollTrigger: {
                    trigger: list,
                    start: 'top 40%',
                    scrub: 1
                    // markers: true,
                }
            });
        });
    }

    _BindSceneAnimate5 () {
        let tl5 = gsap.timeline({
            scrollTrigger: {
                trigger: this.section5,
                start: 'top 60%', 
                end: 'bottom bottom',
                scrub: 1, 
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        tl5.to('.section5 .text span', {height:0, ease:'none', stagger: 0.2,})
    }

    _SequenceCanvas () {
        let canvas = this.section4.querySelector("canvas");
        let context = canvas.getContext("2d");
            canvas.width = 490;
            canvas.height = 928;  

        this.frameCount = 96;
        const currentFrame = index => (
            `./images/${(index + 1).toString().padStart(2, '0')}.jpg`
        );

        let images = []
        this.seq = {
            frame: 0
        };

        for (let i = 0; i < this.frameCount; i++) {
            let img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        images[0].onload = this.render;

        this.render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[this.seq.frame], 0, 0); 
        }
    }

}
new begin();