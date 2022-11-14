/**
 * Expand or close the sidebar in mobile screens.
 */



$(function() {

    const sidebarUtil = (function () {
        const ATTR_DISPLAY = "sidebar-display";
        let isExpanded = false;

        const body = $("body");

        return {
            toggle() {
                if (isExpanded === false) {
                    body.attr(ATTR_DISPLAY, "");
                } else {
                    body.removeAttr(ATTR_DISPLAY);
                }

                isExpanded = !isExpanded;
            }
        };

    }());

    $("#sidebar-trigger").click(sidebarUtil.toggle);
    $("#mask").click(sidebarUtil.toggle);
    $("#sidebar-trigger-mobile").click(sidebarUtil.toggle);

    (function init() {
        let postPageSubItems;
        let urls = document.location.href.split("posts/");
        let postLinks;
        let tmpLinks;
        if(urls.length > 1) {
            postPageSubItems = $(".post-page-subitem");
            postLinks = urls[1].split('/');

            for(let i = 0; i < postPageSubItems.length; i++) {
                tmpLinks = postPageSubItems[i].innerText.toLowerCase().replaceAll(' ', '-');
                $(postPageSubItems[i]).removeClass("active");
                if(tmpLinks === postLinks[0]) {
                    $(postPageSubItems[i]).addClass("active");
                }
            }
        }
    })();

    /* Tools for Dragging Sidebar Mobile */
    // const DraggingSidebarMobileHelper = (function () {
    //     let isAddingEvent = false;
    //
    //     let sidebarClickedXPoint = -1;
    //     let mainWrapperClickedXPoint = -1;
    //
    //     const sidebar = $("#sidebar");
    //     const mainWrapper = $("#main-wrapper");
    //
    //     return {
    //         sidebar: () => sidebar,
    //         mainWrapper: () => mainWrapper,
    //         IsAddingEvent: () => isAddingEvent,
    //         addingEvent: (_isAddingEvent) => {
    //             isAddingEvent = _isAddingEvent;
    //         },
    //         getMainWrapperClickedXPoint: () => mainWrapperClickedXPoint,
    //         setMainWrapperClickedXPoint: (_mainWrapperClickedXPoint) => {
    //             mainWrapperClickedXPoint = _mainWrapperClickedXPoint;
    //         },
    //         getSidebarClickedXPoint: () => sidebarClickedXPoint,
    //         setSidebarClickedXPoint: (_sidebarClickedXPoint) => {
    //             sidebarClickedXPoint = _sidebarClickedXPoint;
    //         },
    //         sidebarChangeTranslate: (distance) => {
    //             if(distance !== 0) {
    //                 sidebar.css('-webkit-transform', `translateX(${distance})`);
    //                 sidebar.css('transform', `translateX(${distance})`);
    //                 sidebar.css('left', '');
    //             }
    //             else {
    //                 sidebar.css('-webkit-transform', '');
    //                 sidebar.css('transform', '');
    //                 sidebar.css('left', '');
    //             }
    //         },
    //         getEventStartPoint: (event) => {
    //             if(event.pageX) {
    //                 return event.pageX;
    //             }
    //             else {
    //                 return event.originalEvent.touches[0].pageX;
    //             }
    //         },
    //         getEventChangedPoint: (event) => {
    //             if(event.pageX) {
    //                 return event.pageX;
    //             }
    //             else {
    //                 return event.originalEvent.changedTouches[0].pageX;
    //             }
    //         }
    //     }
    // }());

    // $(window).on({
    //     'load': init,
    //     'resize': init
    // });
    //
    // function init() {
    //     if(window.innerWidth < 850 && DraggingSidebarMobileHelper.IsAddingEvent() !== true) {
    //         DraggingSidebarMobileHelper.sidebar().on({
    //             'mousedown': onSidebarStartDragged,
    //             'mousemove': onSidebarDragged,
    //             'mouseup': onSidebarEndDragged,
    //             'mouseleave': onMainWrapperEndDragged,
    //             'touchstart': onSidebarStartDragged,
    //             'touchmove': onSidebarDragged,
    //             'touchend': onSidebarEndDragged,
    //             'touchleave': onMainWrapperEndDragged
    //         });
    //
    //         DraggingSidebarMobileHelper.mainWrapper().on({
    //             'mousedown': onMainWrapperStartDragged,
    //             'mousemove': onMainWrapperDragged,
    //             'mouseup': onMainWrapperEndDragged,
    //             'mouseleave': onSidebarEndDragged,
    //             'touchstart': onMainWrapperStartDragged,
    //             'touchmove': onMainWrapperDragged,
    //             'touchend': onMainWrapperEndDragged,
    //             'touchleave': onSidebarEndDragged
    //         });
    //
    //         DraggingSidebarMobileHelper.addingEvent(true);
    //     }
    //     else if(window.innerWidth >= 850) {
    //         DraggingSidebarMobileHelper.sidebar().off('mousedown');
    //         DraggingSidebarMobileHelper.sidebar().off('mousemove');
    //         DraggingSidebarMobileHelper.sidebar().off('mouseup');
    //
    //         DraggingSidebarMobileHelper.sidebar().off('touchstart');
    //         DraggingSidebarMobileHelper.sidebar().off('touchmove');
    //         DraggingSidebarMobileHelper.sidebar().off('touchend');
    //
    //
    //         DraggingSidebarMobileHelper.mainWrapper().off('mousedown');
    //         DraggingSidebarMobileHelper.mainWrapper().off('mousemove');
    //         DraggingSidebarMobileHelper.mainWrapper().off('mouseup');
    //
    //         DraggingSidebarMobileHelper.mainWrapper().off('touchstart');
    //         DraggingSidebarMobileHelper.mainWrapper().off('mousemove');
    //         DraggingSidebarMobileHelper.mainWrapper().off('touchend');
    //
    //         DraggingSidebarMobileHelper.addingEvent(false);
    //     }
    // }
    //
    // function onSidebarStartDragged(event) {
    //     DraggingSidebarMobileHelper.setSidebarClickedXPoint(DraggingSidebarMobileHelper.getEventStartPoint(event));
    // }
    //
    // function onSidebarDragged(event) {
    //     let clickedXPoint;
    //     let distance = 0;
    //
    //     clickedXPoint = DraggingSidebarMobileHelper.getSidebarClickedXPoint();
    //
    //     if(clickedXPoint > -1) {
    //         distance = clickedXPoint - DraggingSidebarMobileHelper.getEventChangedPoint(event);
    //     }
    //     if(distance > 0 && distance < DraggingSidebarMobileHelper.sidebar().outerWidth()) {
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', `translateX(${-distance}px)`);
    //         DraggingSidebarMobileHelper.sidebar().css('transform', `translateX(${-distance}px)`);
    //     }
    // }
    //
    // function onSidebarEndDragged(event) {
    //     let clickedXPoint;
    //     let distance = 0;
    //     let sidebarWidth = DraggingSidebarMobileHelper.sidebar().outerWidth();
    //
    //     clickedXPoint = DraggingSidebarMobileHelper.getSidebarClickedXPoint();
    //
    //     if(clickedXPoint > -1) {
    //         distance = clickedXPoint - DraggingSidebarMobileHelper.getEventChangedPoint(event);
    //     }
    //     if(distance > sidebarWidth / 3 && distance < sidebarWidth) {
    //         sidebarUtil.toggle();
    //
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', '');
    //         DraggingSidebarMobileHelper.sidebar().css('transform', '');
    //     }
    //     else if(distance <= sidebarWidth / 3) {
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', '');
    //         DraggingSidebarMobileHelper.sidebar().css('transform', '');
    //     }
    //
    //     DraggingSidebarMobileHelper.setSidebarClickedXPoint(-1);
    //     DraggingSidebarMobileHelper.setMainWrapperClickedXPoint(-1);
    // }
    //
    // function onMainWrapperStartDragged(event) {
    //     DraggingSidebarMobileHelper.setMainWrapperClickedXPoint(DraggingSidebarMobileHelper.getEventStartPoint(event));
    // }
    //
    // function onMainWrapperDragged(event) {
    //     let clickedXPoint;
    //     let distance;
    //
    //     clickedXPoint = DraggingSidebarMobileHelper.getMainWrapperClickedXPoint();
    //
    //     if(clickedXPoint > -1) {
    //         distance = clickedXPoint - DraggingSidebarMobileHelper.getEventChangedPoint(event);
    //     }
    //     if(distance > -DraggingSidebarMobileHelper.sidebar().outerWidth() && distance < 0) {
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', `translateX(${(-distance) - DraggingSidebarMobileHelper.sidebar().outerWidth()}px)`);
    //         DraggingSidebarMobileHelper.sidebar().css('transform', `translateX(${(-distance) - DraggingSidebarMobileHelper.sidebar().outerWidth()}px)`);
    //     }
    // }
    //
    // function onMainWrapperEndDragged(event) {
    //     let clickedXPoint;
    //     let distance;
    //     let sidebarWidth = DraggingSidebarMobileHelper.sidebar().outerWidth();
    //
    //     clickedXPoint = DraggingSidebarMobileHelper.getMainWrapperClickedXPoint();
    //
    //     if(clickedXPoint > -1) {
    //         distance = clickedXPoint - DraggingSidebarMobileHelper.getEventChangedPoint(event);
    //     }
    //     if(distance > -sidebarWidth && distance < -sidebarWidth / 3) {
    //         sidebarUtil.toggle();
    //
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', '');
    //         DraggingSidebarMobileHelper.sidebar().css('transform', '');
    //     }
    //     else if(distance >= -sidebarWidth / 3) {
    //         DraggingSidebarMobileHelper.sidebar().css('-webkit-transform', '');
    //         DraggingSidebarMobileHelper.sidebar().css('transform', '');
    //     }
    //
    //     DraggingSidebarMobileHelper.setSidebarClickedXPoint(-1);
    //     DraggingSidebarMobileHelper.setMainWrapperClickedXPoint(-1);
    // }
});