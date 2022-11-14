'use strict';
/**
 * Upload the necessary parts for the mobile screen.
 * Move toc to top when screen size is less than 850.
 *
 */

/* Tools for Mobile Measurement */
const MobileMeasurementHelper = (function () {
    const main = $("#main");
    const coreWrapper = $("#core-wrapper");
    let pannelWrapper = $("#panel-wrapper");
    const coreWrapperRow = coreWrapper.parent();
    let tempRow = null;

    return {
        main: () => main,
        coreWrapperRow: () => coreWrapperRow,
        coreWrapper: () => coreWrapper,
        getPannelWrapper: () => pannelWrapper,
        setPannelWrapper: (_pannerWrapper) => {
            pannelWrapper = _pannerWrapper;
        },
        getTempRow: () => tempRow,
        setTempRow: (_tempRow) => {
            tempRow = _tempRow;
        }
    };

}());

$(function() {
    // $(window).load(mobileMeasurement);
    $(window).resize(mobileMeasurement);
    mobileMeasurement();

    function mobileMeasurement() {
        let windowXWidth;
        let rowElement;
        let tempPannelWrapper;

        windowXWidth = window.innerWidth;

        if(windowXWidth > 850 && MobileMeasurementHelper.getTempRow() !== null) {
            tempPannelWrapper = $(MobileMeasurementHelper.getPannelWrapper()).clone(true)[0];
            MobileMeasurementHelper.coreWrapper().after(tempPannelWrapper);
            MobileMeasurementHelper.getTempRow().remove();
            MobileMeasurementHelper.setPannelWrapper(tempPannelWrapper);
            MobileMeasurementHelper.setTempRow(null);
        } else if(windowXWidth <= 850 && MobileMeasurementHelper.getTempRow() === null) {
            rowElement = document.createElement('div');
            rowElement.className = "row";

            tempPannelWrapper = $(MobileMeasurementHelper.getPannelWrapper()).clone(true)[0];
            rowElement.append(tempPannelWrapper);

            MobileMeasurementHelper.getPannelWrapper().remove();
            MobileMeasurementHelper.setPannelWrapper(tempPannelWrapper);
            MobileMeasurementHelper.coreWrapperRow().before(rowElement);
            MobileMeasurementHelper.setTempRow(rowElement);
        }
    }
});