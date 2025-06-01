import '../scss/index.scss';
import { promise, ScrollListener, ScrollTop, Debounce, videoObserver, elmentObserver } from './utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';


class begin {
	constructor () {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        ScrollSmoother.create({
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

        document.addEventListener('DOMContentLoaded', () => {
            this._BindSceneAnimate1();
            this._BindSceneAnimate2();
            this._BindSceneAnimate3();
            this._BindSceneAnimate4();

            //videoObserver();
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
                endTrigger: this.section1,
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


    _BindSceneAnimate2() {
        const back = this.section2.querySelector('.back'),
              textLeft = this.section2.querySelector('.text-left'),
              motion1 = this.section2.querySelector('.tl-motion1'),
              motion2 = this.section2.querySelector('.tl-motion2'),
              motion3 = this.section2.querySelector('.tl-motion3');


        let tltypo = gsap.timeline({
            scrollTrigger: {
                trigger: this.section2,
                start: '10% bottom', 
                end: 'bottom bottom',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
            }
        });

        const textElements = gsap.utils.toArray(motion1.querySelectorAll('.text'));
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

        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: motion1,
                endTrigger: motion2,
                start: 'top 60%', 
                end: 'bottom 100%',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
            },
        });
        tl1.fromTo(back ,{y:-200, scale:0.6, ease:'none', autoAlpha: 0}, {y: 100, scale:1, autoAlpha: 1})
              .fromTo(textLeft ,{x:-500, y:100, autoAlpha: 0}, {ease:'none', x:200, y:100, autoAlpha: 1}, '<')
              .to(back ,{y: 300, scale:1.8, ease:'none'})

        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: motion2,
                start: 'top top', 
                end: 'bottom bottom',
                scrub: 1, 
                //markers: true,
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
            },
        });
        let clientW = document.documentElement.clientWidth + 271;
        let clientH = document.documentElement.clientWidth + 271;

        tl2.to(motion2.querySelector('h3'), {ease:'none', scale:0.2})
            .fromTo(motion2.querySelector('.n1'), {ease:'none', x:`${-clientW}px`, y:`${-clientH}px`}, { x:0, y:0}, '<-=0.1')
            .fromTo(motion2.querySelector('.n2'), {ease:'none', x:`${-clientW}px`}, { x:-200}, '<')
            .fromTo(motion2.querySelector('.n3'), {ease:'none', x:`${-clientW}px`, y:`${clientH}px`}, { x:0, y:0}, '<')
            .fromTo(motion2.querySelector('.n4'), {ease:'none', x:`${clientW}px`, y:`${-clientH}px`}, { x:0, y:0}, '<')
            .fromTo(motion2.querySelector('.n5'), {ease:'none', x:`${clientW}px`, y:`${clientH}px`}, { x:0, y:0}, '<');


        let tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: motion3,
                start: 'top 60%', 
                end: 'bottom bottom',
                scrub: 0, 
                //markers: true,
                invalidateOnRefresh: true,
            },
        });
        tl3.to(motion2.querySelector('.sbi-img'), { x:`${-(clientW / 1.2)}px`, y:`${clientH}px`, ease:'none'});
        tl3.fromTo(motion3.querySelector('.bg'), { scale:0.3, ease:'none'},  { scale:1}, '<');
        tl3.to(motion3.querySelector('.text'), { x: 500, ease:'none'}, '<')
           .to(motion3.querySelector('.sub-text'), { y:500, opacity: 1, ease:'none'}, '<+=0.3')
           .to(motion3.querySelector('.bg img'), { y:300, ease:'none'}, '<-=0.1');
     
    }
    _BindSceneAnimate3() {
        const topText = this.section3.querySelector('.top-text');
        const pinText = this.section3.querySelector('.pintext');
        const galleryList = this.section3.querySelector('.gallery-list');

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
                endTrigger: this.section3,
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

    _BindSceneAnimate4 () {
        let tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: this.section4,
                start: 'top 60%', 
                end: 'bottom bottom',
                scrub: 1, 
                invalidateOnRefresh: true,
                //markers: true,
            },
        });
        tl4.fromTo('.section4 .text span', {y:-100,}, {y:0, ease:'none'})
    }

    _SequenceCanvas () {
        let canvas = this.section3.querySelector("canvas");
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