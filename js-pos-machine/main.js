const products =  [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function printReceipt(barcodes){
    let receipt = '';
    let products = createProductList(barcodes);
    if(products !== null){
        receipt += 'Receipts\n' + '------------------------------------------------------------\n';
        products.forEach(item => {
        let space = generateSpace((item.name + item.price).length);
        receipt += item.name + space + item.price + '          ' + item.quantity + '\n';
      })
  
      var totalPrice = getTotalItemPrice(products);
  
      receipt += '------------------------------------------------------------\n' + 
               'Price: ' + totalPrice;
    }else {
        receipt += '[ERROR]: Barcode is invalid';
    }
  return receipt;
}


function isBarcodeValid(barcodes){
    const result = [...new Set(barcodes.map(barcode => Number.parseInt(barcode) ? true : false))];
    if(result.length == 1 && result[0] == true){
        return true;
    }   
    return false;
}


function createProductList(barcodes){
    let productList = [];
    let finalProductList = [];
    if(isBarcodeValid(barcodes)){
        barcodes.forEach(barcode => {
            productList.push(getProduct(barcode));
        })
    }else {
        return null;
    }

    const itemIds = [...new Set(barcodes.map(barCode => barCode))];
    itemIds.forEach(barCode => {
        var item = {};
        var name = productList.filter(product => product.id === barCode)
                            .map(product => product.name)[0];
        var price = productList.filter(product => product.id === barCode)
                            .map(product => product.price)[0]; 
        var totalPrice = productList.filter(product => product.id === barCode)
                                .map(product => product.price)
                                .reduce((price, totalPrice) => price + totalPrice, 0);
        var quantity = productList.filter(product => product.id === barCode)
                                .reduce((totalQuantity) => totalQuantity+1, 0);

        item = {
            name: name,
            price: price,
            totalPrice: totalPrice,
            quantity: quantity
            }
            finalProductList.push(item);
        })
    return finalProductList;
}


function getProduct(barcode){
    const product = products.filter(product => product.id === barcode)
                    .map(product => product)[0];
    return product;
}


function getTotalItemPrice(productList){
    return productList.map(product => product.totalPrice)
                    .reduce((price, totalPrice) => price + totalPrice, 0);
}


function generateSpace(length){
    let space = '';
    let spaceCount = 33 - length;
    for(var i = 0 ; i < spaceCount; i++){
        space += ' ';
    }
    return space;
}


module.exports = {
    isBarcodeValid : isBarcodeValid,
    getProduct : getProduct,
    createProductList : createProductList,
    getTotalItemPrice : getTotalItemPrice,
    printReceipt : printReceipt
}