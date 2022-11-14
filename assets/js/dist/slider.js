'use strict'

export class Slider {
    /*
    optionObject Format
    option = {
        animation : {
            milisecond: 1500, // 1.5s
            delay: 1000
        },
        direction: ("horizontal" OR "vertical") OR ("row" OR "column"),
        hoverType => 0. null, 1. stop, 2. expand,
        isButton: false OR true,
        isToggleButton: false OR true,
        isDragged => false OR true,
        isExpand => false OR true,
        isPagination: false OR true,
        customEvent: [
            {eventType: "click", function: ~~~}, . . .
        ]
    }
     */
    static loopIntervalList = [];

    constructor(targetElement, option = {}) {
        this.slider = targetElement;
        this.option = option;
        if (!this.option.direction) {
            this.option.direction = 'row';
        }
        if (!this.option.animation) {
            this.option.animation = {}
        }
        if (!this.option.animation.millisecond) {
            this.option.animation.millisecond = 400;
        }
        if (!this.option.animation.delay) {
            this.option.animation.delay = 1000;
        }

        this.currentLoopInterval = this.slider.className.split(' ')[0];
        // console.log(this.currentLoopInterval);
    }

    // Update
    // Insert
    add(element) {
        let index;
        index = this.slider.appendChild(element);
        return index;
    }

    // Delete
    delete(nodeIndex) {
        this.slider.removeChild(nodeIndex);
        return -1;
    }

    search(className) {
        let ret = null;
        let childNodes;

        childNodes = this.slider.childNodes;

        childNodes.forEach((element, i) => {
            if (this.hasClass(element, className)) {
                ret = element;
            }
        });

        return ret;
    }

    getAt(index) {
        let ret = null;
        let childNodes;

        childNodes = this.slider.childNodes;

        childNodes.forEach((element, i) => {
            if (i === index) {
                ret = element;
            }
        });

        return ret;
    }

    getLsit() {
        return this.slider.childNodes;
    }

    hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    makeOption(option) {
        if (!option && !option.direction) {
            console.error("Invalid option.");
            return false;
        }
        this.option = option;
    }

    init() {
        this.sliderContainer = this.slider.querySelector(".slider_container");
        this.slideItems = this.slider.querySelectorAll(".slider_item");
        this.prevButton = this.slider.querySelector(".slider_prev_button");
        this.nextButton = this.slider.querySelector(".slider_next_button");
        this.paginationItems = this.slider.querySelectorAll(".slider_pagination > li");
        this.maxSlide = this.slideItems.length;
        this.currentSlide = 0;

        if (this.option.direction === "horizontal" || this.option.direction === "row") {
            this.offsetAttribute = 'left';
            this.sliderContainer.style.flexWrap = 'nowrap';
        } else if (this.option.direction === "vertical" || this.option.direction === "column") {
            this.offsetAttribute = 'top';
            this.sliderContainer.style.flexWrap = 'wrap';
        }
    }

    render() {
        this.init();
        this.moveOffset();
        this.changedOffset(this.option.animation.millisecond);

        if (this.option.isButton !== undefined && this.option.isButton === true) {
            this.prevButton = document.createElement('div');
            this.nextButton = document.createElement('div');
            this.prevButton.className = 'slider_prev_button slider_button';
            this.nextButton.className = 'slider_next_button slider_button';
            this.slider.appendChild(this.prevButton);
            this.slider.appendChild(this.nextButton);

            if (this.option.direction === "horizontal" || this.option.direction === "row") {
                this.prevButton.innerHTML = "◀";
                this.nextButton.innerHTML = "▶";

                this.prevButton.style.top = 'calc(50% - 16px)';
                this.nextButton.style.top = 'calc(50% - 16px)';

                this.prevButton.style.left = '10px';
                this.nextButton.style.right = '10px';
            }
            else {
                this.prevButton.innerHTML = "▲";
                this.nextButton.innerHTML = "▼";

                this.prevButton.style.left = 'calc(50% - 16px)';
                this.nextButton.style.left = 'calc(50% - 16px)';

                this.prevButton.style.top = '10px';
                this.nextButton.style.bottom = '10px';
            }
        }

        if (this.option.isToggleButton !== undefined && this.option.isToggleButton === true) {
            this.toggleButton = document.createElement('div');
            this.toggleButton.className = 'slider_toggle_button slider_button';
            this.toggleButton.innerHTML = "▾";

            this.slider.appendChild(this.toggleButton);

        }

        if (this.option.isExpand !== undefined && this.option.isExpand === true) {
            // slider_container_hoverable
            this.sliderContainer.classList.add('slider_container_hoverable');
        }

        if (this.option.isPagination !== undefined && this.option.isPagination === true) {
            this.pagination = document.createElement('ul');
            this.pagination.className = 'slider_pagination';
            this.paginationItems = [];

            for (let i = 0; i < this.maxSlide; i++) {
                this.paginationItems[i] = document.createElement('li');

                if (i === 0) {
                    this.paginationItems[i].className = 'active';
                }

                this.paginationItems[i].innerText = '•';

                this.pagination.appendChild(this.paginationItems[i]);
            }

            this.slider.appendChild(this.pagination);

            if (this.option.direction === "horizontal" || this.option.direction === "row") {
                this.pagination.style.display = 'flex';
                this.pagination.style.left = '50%';
                this.pagination.style.transform = 'translateX(-50%)';
            } else {
                this.pagination.style.display = 'block';
                this.pagination.style.top = '50%';
                this.pagination.style.right = '0%';
                this.pagination.style.transform = 'translateY(-50%)';
            }
        }

        this.setEvent();
    }

    setEvent() {
        let isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
        this.startClickPoint = 0;
        this.endClickPoint = 0;

        Slider.touched = false;
        this.addSlideMoveAnimation();

        // if (isMobile !== true) this.slider.addEventListener('click', this.onSliderItemClicked);
        // if (isMobile === true  && this.slider.className.search('mobile') > -1) this.slider.addEventListener('touchstart', this.onSliderItemClicked, {passive: false});

        if (this.prevButton !== null && this.nextButton !== null) {
            this.prevButton.addEventListener("click", this.onPreviousMove);

            this.nextButton.addEventListener("click", this.onNextMove);
        }

        for (let i = 0; i < this.maxSlide && this.paginationItems.length > 0; i++) {
            this.paginationItems[i].addEventListener("click", this.onPaginationItemClicked);
        }

        if (isMobile !== true) this.slider.addEventListener("mousedown", this.onSetPointing);
        if (isMobile !== true) this.slider.addEventListener("mouseup", this.onKillPointing);

        if (isMobile !== true) this.slider.addEventListener("mouseover", this.onMouseOver);
        if (isMobile !== true) this.slider.addEventListener("mouseout", this.onMouseOut);

        if (isMobile === true && this.slider.className.search('mobile') > -1) {
            this.slider.addEventListener("touchstart", this.onMobileSetPointing, {passive: false});
        }
        if (isMobile === true && this.slider.className.search('mobile') > -1 && (this.option.isExpand !== undefined && this.option.isExpand !== true))
            this.sliderContainer.addEventListener("touchend", this.onMobileKillPointing, {passive: false});

        if (isMobile !== true) document.querySelector('.mobile_mask').addEventListener('click', this.onSliderClicked);


        if (isMobile === true && this.slider.className.search('mobile') > -1)
            document.querySelector('.mobile_mask').addEventListener('touchstart', this.onSliderClicked, {passive: false});

    }

    setCustomEvent = (element, eventType, callback, options = {}) => {
        element.addEventListener(eventType, callback, options);
    }

    onNextMove = () => {
        this.currentSlide++;
        if (this.currentSlide >= this.maxSlide) {
            this.currentSlide = 0;
        }

        this.moveOffset();
        this.changedOffset(this.option.animation.millisecond);

        if (this.paginationItems.length > 0) {
            this.paginationItems.forEach((element) => element.classList.remove("active"));
            this.paginationItems[this.currentSlide].classList.add("active");
        }
    }
    onPreviousMove = () => {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.maxSlide - 1;
        }

        this.moveOffset();
        this.changedOffset(this.option.animation.millisecond);

        if (this.paginationItems.length > 0) {
            this.paginationItems.forEach((element) => element.classList.remove("active"));
            this.paginationItems[this.currentSlide].classList.add("active");
        }
    }

    onMouseOver = (event) => {
        clearInterval(Slider.loopIntervalList[this.currentLoopInterval]);
        Slider.loopIntervalList[this.currentLoopInterval] = undefined;

        if (this.option.isExpand !== undefined && this.option.isExpand === true) {
            // this.sliderContainer.style.overflow = 'visible';

            this.offset = 0;
            this.changedOffset(this.option.animation.millisecond);
        }
    }

    onMouseOut = (event) => {
        if (this.option.isExpand !== undefined && this.option.isExpand === true) {
            // this.sliderContainer.style.overflow = 'hidden';

            this.moveOffset();
            this.changedOffset(this.option.animation.millisecond);
        }

        this.addSlideMoveAnimation();
    }

    onSetPointing = (event) => {
        this.startClickPoint = event.pageX;
        if (event.touches !== undefined) this.startClickPoint = event.touches[0].pageX;

        if (this.option.direction === 'horizontal' || this.option.direction === 'column') {
            this.startClickPoint = event.pageY;
            if (event.touches !== undefined) this.startClickPoint = event.touches[0].pageY;
        }
    }

    onKillPointing = (event) => {
        this.endClickPoint = event.pageX;
        if (event.touches !== undefined) this.endClickPoint = event.changedTouches[0].pageX;

        if (this.option.direction === 'horizontal' || this.option.direction === 'column') {
            this.endClickPoint = event.pageY;
            if (event.touches !== undefined) this.endClickPoint = event.changedTouches[0].pageY;
        }

        if (this.startClickPoint < this.endClickPoint) {
            this.onPreviousMove();
        } else if (this.startClickPoint > this.endClickPoint) {
            this.onNextMove();
        }
    }

    onSliderClicked = (event) => {
        // console.log('onSliderClicked');
        this.sliderContainer.classList.remove('active');
        document.querySelector('.mobile_mask').style.display = 'none';

        this.moveOffset();
        this.changedOffset(this.option.animation.millisecond);
        this.addSlideMoveAnimation();
    }

    onMobileSetPointing = (event) => {
        // console.log('mobileSetPointing');
        // console.log(this.sliderContainer.classList);
        // console.log(event.target);

        if (!this.sliderContainer.classList.contains('active')) {
            event.preventDefault();

            clearInterval(Slider.loopIntervalList[this.currentLoopInterval]);
            Slider.loopIntervalList[this.currentLoopInterval] = undefined;

            this.offset = 0;
            Slider.touched = true;
            this.changedOffset(this.option.animation.millisecond);

            this.sliderContainer.classList.add('active');

            document.querySelector('.mobile_mask').style.display = 'block';

            this.sliderContainer.addEventListener('transitionend', this.onExpandTransition);
        }
    }

    onExpandTransition = (event) => {
        if(event.target === this.sliderContainer){
            event.returnValue = true;

            this.sliderContainer.removeEventListener('transitionend', event);
        }
    }

    onMobileKillPointing = (event) => {
        this.endClickPoint = event.pageX;
        if (event.touches !== undefined) this.endClickPoint = event.changedTouches[0].pageX;

        if (this.option.direction === 'horizontal' || this.option.direction === 'column') {
            this.endClickPoint = event.pageY;
            if (event.touches !== undefined) this.endClickPoint = event.changedTouches[0].pageY;
        }

        if (this.startClickPoint < this.endClickPoint) {
            this.onPreviousMove();
        } else if (this.startClickPoint === this.endClickPoint) {
            this.slider.classList.add('active');
        } else if (this.startClickPoint > this.endClickPoint) {
            this.onNextMove();
        }
    }

    onPaginationItemClicked = (event) => {
        let index;

        this.paginationItems.forEach((element, i) => {
            if (element === event.currentTarget) {
                index = i;
            }
        });
        if (index >= this.maxSlide) return;

        this.currentSlide = index;
        this.moveOffset();
        this.changedOffset(this.option.animation.millisecond);
        this.paginationItems.forEach((element) => element.classList.remove("active"));
        this.paginationItems[this.currentSlide].classList.add("active");
    }

    onSliderItemClicked = (event) => {
        if(event.target.tagName === 'IMG') {
            // console.log('Item Click');
            this.sliderContainer.classList.remove('active');
            document.querySelector('.mobile_mask').style.display = 'none';

            this.moveOffset();
            this.changedOffset(this.option.animation.millisecond);
            this.addSlideMoveAnimation();
        }
    }

    changedOffset = (millisecond) => {
        this.slideItems.forEach((element) => {
            element.setAttribute("style",
                `transition: ${this.offsetAttribute} ${millisecond}ms; 
                ${this.offsetAttribute}: ${-this.offset}px;`);
        });
    }

    moveOffset = () => {
        if (this.option.direction === "horizontal" || this.option.direction === "row") {
            this.offset = this.slideItems[0].clientWidth * this.currentSlide;
        } else if (this.option.direction === "vertical" || this.option.direction === "column") {
            this.offset = this.slideItems[0].clientHeight * this.currentSlide;
        }
    }

    addSlideMoveAnimation = () => {
        if (Slider.loopIntervalList[this.currentLoopInterval] !== undefined) {
            // console.log(this.currentLoopInterval);
            clearInterval(Slider.loopIntervalList[this.currentLoopInterval]);
            Slider.loopIntervalList[this.currentLoopInterval] = undefined;
        }
        Slider.loopIntervalList[this.currentLoopInterval] = setInterval(this.nextMoveIntervalAnimation, this.option.animation.delay);
    }

    nextMoveIntervalAnimation = () => {
        if(Slider.loopIntervalList[this.currentLoopInterval] !== true)
            this.onNextMove();
    }

    getSliderContainer = () => {
        return this.sliderContainer;
    }

    getSlideItems = () => {
        return this.slideItems;
    }

    getPreviousButton = () => {
        return this.prevButton;
    }

    getNextButton = () => {
        return this.nextButton;
    }

    getPagination = () => {
        return this.pagination;
    }

    getPaginationItems = () => {
        return this.paginationItems;
    }
}