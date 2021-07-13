// //HTL Elements

// const productList = document.querySelector(".product-list");
// const productTiles = productList.querySelectorAll(".product-item");

// const wishlistButtons = productList.querySelectorAll(".btn_wish");
// const navigation = document.querySelector(".header__user-nav");
// const wishlistIcon = navigation.children[0];
// const dialog = document.querySelector(".dialog");

// const wishlist = [];
// createWishList();

// function ProductAddedToWishList(event) {
//     let target = event.target;
//     let counter = 0;

//     if (target.classList.contains("btn_wish")) {
//         //dialog.classList.add("dialog-active");

//         let product = target.closest(".product-item");
//         wishlist.push(product);

//         let wishlistBadge = document.querySelector(".header__user-wishlist-badge");
//         wishlistBadge.textContent = wishlist.length + 1;
//     }
// }

// function createWishList() {
//     let wishlistBadge = `<div class="header__user-wishlist-badge"></div>`;
//     wishlistIcon.insertAdjacentHTML("beforeend", wishlistBadge);
// }

// document.addEventListener("click", ProductAddedToWishList





let dialogBtn = document.querySelector('.dialog-cancel_btn')

function ProductRemovedFromWishList() {

    if (wishlist.length === 0) {
        let wishlistBadge = document.querySelector(".header__user-wishlist-badge");
        wishlistBadge.textContent = wishlist.length;
    } else {
        let wishlistBadge = document.querySelector(".header__user-wishlist-badge");
        wishlistBadge.textContent = wishlist.length - 1;
    }
}

dialogBtn.onclick = ProductRemovedFromWishList()

//Vitaliy Nezhinskiy


window.addEventListener('click', function(event) {
        let window = document.getElementById('.dialog');
        if (event.target != window && event.target.parentNode != window) {
            window.style.display = 'none';
        }
    }
    true);