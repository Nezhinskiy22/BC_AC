function makeMeShorter(str) {
    let strLength = 30
    if (typeof str === "string") {
        if (str.length <= strLength) {
            return str
        } else if (str.length > strLength) {
            str = str.slice(0, strLength) + "..."
            return str
        }
    } else {
        str = ""
        return str
    }
}

function giveTheMax(a, b, c, d, e) {
    let n = [a, b, c, d, e]
    n = n.filter((elem) => {
        return typeof elem === "number"
    })
    let max = (Math.max(...n))
    return max
}

function fitMyWord(word, comp) {
    let arr = Array.from(comp)
    for (let i = 0; i < arr.length; i++) {
        let regexp = new RegExp(arr[i].split("").sort().map(function(s) { return s + "+"; }).join(""));
        return regexp.test(word.split("").sort().join(""));
    }
} //doesn't work so well