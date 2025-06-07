import '../scss/index.scss';
import { promise, ScrollListener, ScrollTop, Debounce, videoObserver, elmentObserver } from './utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import imagesLoaded from "imagesloaded";


class begin {
	constructor () {
        this.element = (selector) => document.querySelector(selector);

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        ScrollSmoother.create({
            speed: 1, 
            effects: true, 
            smooth: 2, 
            effects: true, 
            smoothTouch: 0.1, 
        });

        this._preloader();
	}

    _preloader () {
        this.preloader = this.element('.preloader');
        this.progressBox = this.preloader.querySelector('.progress');
        const imgLoad = imagesLoaded(document.body);
        const imgTotal = imgLoad.images.length;

        let imgLoaded = 0;
        let current = 0;

        const updateProgress = () => {
            const target = (imgLoaded / imgTotal) * 100;
            current += Math.ceil((target - current) * 0.1);

            this.progressBox.querySelector('.percent').textContent = `${Math.floor(current)}%`;

            if (current >= 100) {
                clearInterval(progressTimer);
                this._preloaderAnimated();
            }
        };

        imgLoad.on('progress', () => {
            imgLoaded++;
        });

        const progressTimer = setInterval(updateProgress, 3000 / 60);
    }

    _preloaderAnimated () {
        const loaderImage = this.preloader.querySelector('.loader-image'),
              progressInner = this.progressBox.querySelector('.loading');

        gsap.to(progressInner, {opacity:0,  duration: 1, delay:0.3})
        gsap.to(this.progressBox, { height: 0, duration: 1, delay:0.5, ease: "power2.inOut",
            onComplete: () => {
                this._BindInit ();
            }
         })
        gsap.to(loaderImage, { height: 0, duration: 1, delay:1.5, ease: "power2.inOut" });
        gsap.to(loaderImage.children, { y: -500, duration: 1.7, delay:2, ease: "power2.inOut",
            onComplete: () => {
                this.preloader.style.cssText = 'display:none;';
            }
        });
    }

    _BindInit () {
        this.section1 = this.element('.section1');
        this.section2 = this.element('.section2');
        this.section3 = this.element('.section3');
        this.section4 = this.element('.section4');


        this._BindAnimated1();
        this._BindAnimated2();
        this._BindAnimated3();
        this._BindAnimated4();
    }

	_BindAnimated1 () {
        const mainText = this.section1.querySelectorAll('p span'),
              brandSVG = this.section1.querySelector('.brandsvg'),
              mainBG = this.section1.querySelector('.main-bg'),
              subCopy = this.section1.querySelector('.dec');


        promise(500).then(()=>{
            for(let i = 0; i < 15; i++){
                let transbox = document.createElement("div");
                transbox.classList.add("transbox");
                mainBG.appendChild(transbox);
            }
            let box = mainBG.querySelectorAll("div");
            let px = document.documentElement.clientWidth / 5;
            let percent = (px / document.documentElement.clientWidth) * 100; 

            box.forEach(el => {
                el.style.cssText = `width:${percent}%;height:${px}px;`
            })

            gsap.to('.transbox', {
                duration: 1, 
                opacity: () => gsap.utils.random(0.2, 0.6), 
                stagger: { 
                    from: "random",
                    each: 0.2,
                    repeat:1
                }
            });  

            gsap.to(mainText, {y:0, duration:0.5, delay:0.5, stagger: 0.3, ease: 'power1.inOut',
                onComplete : () => {
                    brandSVG.classList.add('animated')
                }
            });
            gsap.to(subCopy, {y:0, duration:1.5, opacity:1,delay:0.5,  ease: 'power1.inOut'});
        })
  


        let main = gsap.timeline({
            scrollTrigger: {
                trigger: this.section1.querySelector('.inner'),
                start: 'top top', 
                scrub: 0, 
                //markers: true,
                invalidateOnRefresh: true,
				pin: true,
                pinSpacing: false
            },
        });
        main.to(this.section1.querySelector('.inner'), {scale:0.2, x:500, y:-200, skewY: -10, ease:'none', force3D: true})
            .to(this.section1.querySelector('.main-text'), {y:-400, x:-400},'<')
            .fromTo(this.section2.querySelector('.tl-motion1'),{
                clipPath: 'polygon(0 0, 0% 0, 20% 100%, 0% 100%)'},{
                clipPath: 'polygon(0 0, 56% 0, 160% 150%, 0% 100%)'
            }, '<+=0.2')

    }


    _BindAnimated2() {
        const back = this.section2.querySelector('.back'),
              motion1 = this.section2.querySelector('.tl-motion1'),
              motion2 = this.section2.querySelector('.tl-motion2'),
              motion3 = this.section2.querySelector('.tl-motion3');

        const textElements = gsap.utils.toArray(motion1.querySelectorAll('.text'));
        textElements.forEach(text => {
            gsap.to(text, {
                backgroundSize: '100%',
                duration: 3,//ease: 'none',
                marker: true,
                scrollTrigger: {
                    trigger: this.section2,
                    trigger: text,
                    start: 'center 50%',
                    scrub: 1,
                },
            });
        });

        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: motion1,
                endTrigger: motion2,
                start: 'top 40%', 
                end: 'bottom 100%',
                scrub: 1, 
                //markers: true,
                invalidateOnRefresh: true,
				onUpdate: ({progress, direction, isActive}) => {
					console.log(progress, direction, isActive);

					if (progress < 0.21) {
						gsap.to(motion1,{backgroundColor:'#fff', duration:1})
                        return;
					}         

					if (progress > 0.21) {
						gsap.to(motion1,{backgroundColor:'#000', duration:1})
					}
				}
            },
        });
        tl1.fromTo(back ,{x:0, y:-400, ease:'none'}, {x:200, y: 200, autoAlpha: 1})
           .to(back.querySelector('img') ,{x:-1000, ease:'none'},'<');

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
        let clientH = document.documentElement.clientHeight + 271;

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
    _BindAnimated3() {
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
                toggleClass: 'animated'
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
                yPercent: -55,
                ease: 'none',
                scrollTrigger: {
                    trigger: list,
                    start: 'top 40%',
                    scrub: 1
                    // markers: true,
                }
            });


            let dataX = list.dataset.x;
            gsap.to(list, {x: dataX, ease:'none', stagger:0.1,
                scrollTrigger: {
                    trigger: list.querySelector("span"),
                    start: 'top 530px', 
                    end: 'bottom 60%',
                    scrub: 0, 
                    invalidateOnRefresh: true,
                    //markers: true,
                },},
            );
                
        });


    }

    _BindAnimated4 () {
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
            `./images/${(index + 1).toString().padStart(2, '0')}-min.jpg`
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