let _ = require("lodash");


function generate(oldPrice) {

    let volatility = 0.01;
    const rnd = Math.random(); // generate number, 0 <= x < 1.0
    let change_percent = 2 * volatility * rnd;
    if (change_percent > volatility)
        change_percent -= (2 * volatility);
    var change_amount = oldPrice * change_percent;
    return oldPrice + change_amount;
}

do {
    console.warn(generate(1000))
} while (true)