// Testing Numbers
module.exports.absolute = function(num){
    // if(num > 0)return num;
    // if(num < 0)return -num;
    // return 0
    // change the implementation 
    // if(num >= 0)return num;
    // return -num
    // change the implementation 
    return num < 0 ? -num : num
}

module.exports.greet = function(name){
    return "Hello " + name + "!"
}

module.exports.getCurrencies = function(){
    return ["USD", "AUD", "EUR"]
}

module.exports.getProduct = function(productId){
    return {id: productId, price: 10, cat:"electronic"}
}