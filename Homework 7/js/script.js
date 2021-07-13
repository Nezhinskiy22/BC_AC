// let xhr = new XMLHttpRequest()

// xhr.onreadystatechange = function() {
//     let itemCard = document.querySelectorAll(".product-item__availiability");
//     let itemCard2 = Array.from(itemCard);
//         // itemCard2.map((item) => {
//         //     addAvailability(item);
//         // });

//     for (let i = 0; i < itemCard2.length; i++) {
//         addAvailability(itemCard2[i]);
//     }

//     function addAvailability(item) {

//         if (xhr.readyState == 4 && xhr.status !== 200) {
//             console.log("Error");
//         } else {
//             let data = JSON.parse(xhr.responseText);
//             // let availability = data.availability;
//             // let status = data.status;
//             // console.log(availability + "and " + status);

//             console.log(data + "< data------------");
//             if (data.status == "error") {
//                 console.log(data.status);
//             } else if (data.availability === 0) {
//                 item.textContent = "Not availiable";
//                 console.log("Not availiable");
//                 console.log(data.availability);
//             } else if (data.availability >= 1 && data.availability <= 20) {
//                 item.textContent = `Hurry up just ${data.availability} items are left!`;
//                 console.log(`Hurry up just ${data.availability} items are left!`);
//                 console.log(data.availability);

//             } else if (data.availability >= 21 && data.availability <= 100) {
//                 item.textContent = "Low stock";
//                 console.log("Low stock");
//                 console.log(data.availability);

//             } else if (data.availability >= 100) {
//                 item.textContent = "In stock";
//                 console.log("In stock");
//                 console.log(data.availability);
//             }
//         }
//     }
// }

// xhr.open("GET", "https://jsbootcamp.ontrq.com/php/availability/", true)
// xhr.setRequestHeader('Content-Type', 'application/json')
// xhr.send()
// xhr.onerror = function() {
//     alert("Network error!");
// } 
// <<<<<<<<<<<<<<<<one request code above>>>>>>>>>>>>>>>>>>

function getProductsAvailability(item) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsbootcamp.ontrq.com/php/availability/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onerror = function() {
        alert("Network error!");
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                renderProductAvailiability(item, data);
            } else {
                console.log("Error");
            }
        }

    }
}

function renderProductAvailiability(item, data) {
    if (data.status == "error") {
        console.error(data.status);
        item.textContent = data.message;
    } else if (data.availability === 0) {
        item.textContent = "Not availiable";
    } else if (data.availability >= 1 && data.availability <= 20) {
        item.textContent = `Hurry up just ${data.availability} items are left!`;
    } else if (data.availability >= 21 && data.availability <= 100) {
        item.textContent = "Low stock";
    } else if (data.availability >= 100) {
        item.textContent = "In stock";
    }
}

let itemCard = document.querySelectorAll(".product-item__availiability");
let itemCard2 = Array.from(itemCard);
itemCard2.map((item) => {
    item.textContent = "...";
    getProductsAvailability(item);
})