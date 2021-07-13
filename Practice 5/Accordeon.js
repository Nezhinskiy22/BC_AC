let accordeon = (() => {
    let acc = document.getElementsByClassName("filters__list-name");

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            let sideBlock = this.nextElementSibling;
            if (sideBlock.style.display === "flex") {
                sideBlock.style.display = "none";
            } else {
                sideBlock.style.display = "flex";
            }
        });
    }
})();

export default accordeon;