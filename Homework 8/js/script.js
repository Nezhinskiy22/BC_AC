var basketModule = (function() {
    var instance;
    var productList = [];


    function Basket() {
        this.total = 0;
    }

    Basket.prototype.addProduct = function(product) {
        var hasProduct = !!productList.find(function(item) {
            return item.id === product.id;
        });

        this.calculate();

        if (hasProduct) {
            return;
        }

        productList.push(product);
    }

    Basket.prototype.calculate = function() {
        this.total = productList.reduce(function(acc, curr) {
            var currPrice = parseInt(curr.price.match(/\d+/))
            return acc + (currPrice * curr.quantity);
        }, 0);
    }

    Basket.prototype.getProductList = function() {
        return [].concat(productList)
    }

    return {
        getInstance: function() {
            return instance || (instance = new Basket());
        }
    }
})();

var addButton = document.querySelectorAll(".product-item__add-btn");
var productNames = document.querySelectorAll(".product-item__name");
var productPrices = document.querySelectorAll(".product-item__price");
var counterMap = {};
addButton.forEach(
    function(elem, i) {
        elem.addEventListener("click", function(e) {
            var productId = e.target.getAttribute('data-product-id');
            if (counterMap[productId] == null) {
                counterMap[productId] = 0;
            }
            counterMap[productId]++;
            var itemName = productNames[i].textContent;
            var itemPrice = productPrices[i].textContent;
            var createModule = createProduct(productId, itemName, itemPrice, counterMap[productId]);
            addProduct(createModule.getInstance());
        });
    });

function createProduct(id, name, price, quant) {
    var instance;

    function Product() {
        this.quantity = 0;
    };

    Product.prototype.id = id;
    Product.prototype.name = name;
    Product.prototype.price = price;
    Product.prototype.quant = quant;
    console.log(quant + " class");

    return {
        getInstance: function() {
            if (!instance) {
                instance = new Product();
            }

            instance.quantity++;

            return instance;
        }
    }
}

var basket = basketModule.getInstance();

var cartTableBody = document.getElementById("cartBody");
var cartTotal = document.getElementById("cartTotal");

function addProduct(product) {
    basket.addProduct(product);
    renderCart();
};

function renderCart() {
    var rowsHtml = "";
    basket.getProductList().forEach(function(product) {

        var priceStr = product.price;
        var priceNum = parseInt(priceStr.match(/\d+/));

        rowsHtml += `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${priceStr}</td>
                        <td>${priceNum * product.quant}</td>
                    <tr>`;
        product.quantity++
    });
    cartTableBody.innerHTML = rowsHtml;
    cartTotal.textContent = basket.total;
};











// // let xhr = new XMLHttpRequest()

// // xhr.onreadystatechange = function() {
// //     let itemCard = document.querySelectorAll(".product-item__availiability");
// //     let itemCard2 = Array.from(itemCard);
// //         // itemCard2.map((item) => {
// //         //     addAvailability(item);
// //         // });

// //     for (let i = 0; i < itemCard2.length; i++) {
// //         addAvailability(itemCard2[i]);
// //     }

// //     function addAvailability(item) {

// //         if (xhr.readyState == 4 && xhr.status !== 200) {
// //             console.log("Error");
// //         } else {
// //             let data = JSON.parse(xhr.responseText);
// //             // let availability = data.availability;
// //             // let status = data.status;
// //             // console.log(availability + "and " + status);

// //             console.log(data + "< data------------");
// //             if (data.status == "error") {
// //                 console.log(data.status);
// //             } else if (data.availability === 0) {
// //                 item.textContent = "Not availiable";
// //                 console.log("Not availiable");
// //                 console.log(data.availability);
// //             } else if (data.availability >= 1 && data.availability <= 20) {
// //                 item.textContent = `Hurry up just ${data.availability} items are left!`;
// //                 console.log(`Hurry up just ${data.availability} items are left!`);
// //                 console.log(data.availability);

// //             } else if (data.availability >= 21 && data.availability <= 100) {
// //                 item.textContent = "Low stock";
// //                 console.log("Low stock");
// //                 console.log(data.availability);

// //             } else if (data.availability >= 100) {
// //                 item.textContent = "In stock";
// //                 console.log("In stock");
// //                 console.log(data.availability);
// //             }
// //         }
// //     }
// // }

// // xhr.open("GET", "https://jsbootcamp.ontrq.com/php/availability/", true)
// // xhr.setRequestHeader('Content-Type', 'application/json')
// // xhr.send()
// // xhr.onerror = function() {
// //     alert("Network error!");
// // } 
// // <<<<<<<<<<<<<<<<one request code above>>>>>>>>>>>>>>>>>>

// function getProductsAvailability(item) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://jsbootcamp.ontrq.com/php/availability/", true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send();
//     xhr.onerror = function() {
//         alert("Network error!");
//     }
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             if (xhr.status === 200) {
//                 let data = JSON.parse(xhr.responseText);
//                 renderProductAvailiability(item, data);
//             } else {
//                 console.log("Error");
//             }
//         }

//     }
// }

// function renderProductAvailiability(item, data) {
//     if (data.status == "error") {
//         console.error(data.status);
//         item.textContent = data.message;
//     } else if (data.availability === 0) {
//         item.textContent = "Not availiable";
//     } else if (data.availability >= 1 && data.availability <= 20) {
//         item.textContent = `Hurry up just ${data.availability} items are left!`;
//     } else if (data.availability >= 21 && data.availability <= 100) {
//         item.textContent = "Low stock";
//     } else if (data.availability >= 100) {
//         item.textContent = "In stock";
//     }
// }

// let itemCard = document.querySelectorAll(".product-item__availiability");
// let itemCard2 = Array.from(itemCard);
// itemCard2.map((item) => {
//     item.textContent = "...";
//     getProductsAvailability(item);
// })



// // $(document).ready(function() {
// //     //------------------1st task - border colour pink----------------------
// //     $(".product-item__badge").parent().css({ "border": "1px solid pink" });
// //     //------------------2nd task - odd blue background---------------------
// //     $(".filters__size-swatch:even").css({ "background": "blue" });
// //     //------------------3rd task - clone 2 tiles---------------------------
// //     $(".product-item:nth-last-child(-n+2)").clone().appendTo('.product-list');
// //     //------------------4th task - remove "Occasion"-----------------------
// //     $(".filters__list span:contains(Occasion)").parent().remove()
// // });

// const basket = document.querySelector(".product-basket__table-body");
// const addButton = document.querySelectorAll(".product-item__add-btn");
// const productNames = document.querySelectorAll(".product-item__name");
// const productPrices = document.querySelectorAll(".product-item__price");
// const counterMap = {};

// addButton.forEach(function(elem, i) {
//     elem.addEventListener("click", function(e) {
//         const productId = e.target.getAttribute('data-product-id');
//         if (counterMap[productId] == null) {
//             counterMap[productId] = 0;
//         }
//         counterMap[productId]++;
//         const itemName = productNames[i].textContent;
//         const itemPrice = productPrices[i].textContent;
//         const itemNum = document.querySelectorAll(".basket-num").length + 1;

//         renderCartRow(productId, itemNum, itemName, itemPrice, counterMap[productId]);


//         const removeBtn = document.querySelectorAll(".item-remove");
//         removeBtn.forEach(function(item) {
//             item.addEventListener("click", function(event) {
//                 event.target.parentNode.remove();
//                 recalculate();
//             })
//         })
//     });
// });

// function renderCartRow(productId, itemNum, itemName, itemPrice, clickCount) {
//     const child =
//         `<tr>
//             <td class="basket-num" data-product-id="${productId}">${itemNum}</td>
//             <td>${itemName}</td>
//             <td>${itemPrice}</td>
//             <td class="basket-quantity">${clickCount}</td>
//             <td class="item-remove">remove</td>
//         </tr>`;
//     basket.innerHTML += child;
// }

// function recalculate() {
//     const basketIndex = document.querySelectorAll(".basket-num");
//     basketIndex.forEach(function(elem, i) {
//         elem.textContent = i + 1;
//     });
// };




// let Singleton = (function() {
//     let instance;

//     function createInstance() {
//         let object = new Object("I am the instance");
//         return object;
//     };
//     return {
//         getInstance: function() {
//             if (!instance) {
//                 instance = createInstance();
//             }
//             return instance;
//         }
//     }
// })();

// function run() {
//     let instance1 = Singleton.getInstance();
//     let instance2 = Singleton.getInstance();

//     console.log(`Same instance& ${instance1===instance2}`);
// };

// run();