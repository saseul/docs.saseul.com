document.addEventListener("DOMContentLoaded", function () {
    $("#sidebar-trigger-mobile").click(function () {
        $("body").removeAttr("sidebar-display");
    });
});
