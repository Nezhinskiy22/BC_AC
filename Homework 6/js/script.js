// $(document).ready(function() {
//     //------------------1st task - border colour pink----------------------
//     $(".product-item__badge").parent().css({ "border": "1px solid pink" });
//     //------------------2nd task - odd blue background---------------------
//     $(".filters__size-swatch:even").css({ "background": "blue" });
//     //------------------3rd task - clone 2 tiles---------------------------
//     $(".product-item:nth-last-child(-n+2)").clone().appendTo('.product-list');
//     //------------------4th task - remove "Occasion"-----------------------
//     $(".filters__list span:contains(Occasion)").parent().remove()
// });

const basket = document.querySelector(".product-basket__table-body");
const addButton = document.querySelectorAll(".product-item__add-btn");
const productNames = document.querySelectorAll(".product-item__name");
const productPrices = document.querySelectorAll(".product-item__price");
const counterMap = {};

addButton.forEach(function(elem, i) {
    elem.addEventListener("click", function(e) {
        const productId = e.target.getAttribute('data-product-id');
        if (counterMap[productId] == null) {
            counterMap[productId] = 0;
        }
        counterMap[productId]++;
        const itemName = productNames[i].textContent;
        const itemPrice = productPrices[i].textContent;
        const itemNum = document.querySelectorAll(".basket-num").length + 1;

        renderCartRow(productId, itemNum, itemName, itemPrice, counterMap[productId]);


        const removeBtn = document.querySelectorAll(".item-remove");
        removeBtn.forEach(function(item) {
            item.addEventListener("click", function(event) {
                event.target.parentNode.remove();
                recalculate();
            })
        })
    });
});

function renderCartRow(productId, itemNum, itemName, itemPrice, clickCount) {
    const child =
        `<tr>
            <td class="basket-num" data-product-id="${productId}">${itemNum}</td>
            <td>${itemName}</td>
            <td>${itemPrice}</td>
            <td class="basket-quantity">${clickCount}</td>
            <td class="item-remove">remove</td>
        </tr>`;
    basket.innerHTML += child;
}

function recalculate() {
    const basketIndex = document.querySelectorAll(".basket-num");
    basketIndex.forEach(function(elem, i) {
        elem.textContent = i + 1;
    });
};