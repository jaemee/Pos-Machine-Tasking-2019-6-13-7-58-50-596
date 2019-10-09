const main = require('../main');

it ('should return true if barcodes valid', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    const result = main.isBarcodeValid(barcodes);
    expect(result).toBe(true);
});

it ('should return false if barcodes is null', () => {
    const barcodes = [];
    const result = main.isBarcodeValid(barcodes);
    expect(result).toBe(false);
});

it ('should return false if barcodes is invalid', () => {
    const barcodes = ['aaa', '123214', '00192'];
    const result = main.isBarcodeValid(barcodes);
    expect(result).toBe(false);
});

it ('should return product of corresponding barcode', () => {
    const barcode = '0001';
    const result = main.getProduct(barcode);
    expect(result.id).toBe('0001');
    expect(result.name).toBe('Coca Cola');
    expect(result.price).toBe(3);
});

it ('should return undefined if invalid barCode', () => {
    const barcode = 'aaa';
    const result = main.getProduct(barcode);
    expect(result).toBe(undefined);
});

it ('should return undefined if not exisitng barCode', () => {
    const barcode = '0011';
    const result = main.getProduct(barcode);
    expect(result).toBe(undefined);
});

it ('should return undefined if not exisitng barCode', () => {
    const barcode = '0011';
    const result = main.getProduct(barcode);
    expect(result).toBe(undefined);
});

it ('should add all products to list checkout', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    const result = main.createProductList(barcodes);
    expect(result).toMatchObject([{"name" : "Coca Cola", "price": 3, "totalPrice": 3, "quantity": 1},
                                {"name" : "Pepsi-Cola", "price": 5, "totalPrice": 10, "quantity": 2},
                                {"name" : "Dr Pepper", "price": 7, "totalPrice": 7, "quantity": 1}]);
});

it ('should return null when a barcode is not valid', () => {
    const barcodes = ['0001', 'aaa', 'sss', '0003'];
    const result = main.createProductList(barcodes);
    expect(result).toBe(null);
});

it ('should return total of products', () => {
    const productList = [{"name" : "Coca Cola", "price": 3, "totalPrice": 3, "quantity": 1},
                        {"name" : "Pepsi-Cola", "price": 5, "totalPrice": 10, "quantity": 2},
                        {"name" : "Dr Pepper", "price": 7, "totalPrice": 7, "quantity": 1}];
    const result = main.getTotalItemPrice(productList);
    expect(result).toBe(20);
});

it ('should return printedReceipt when passed all validations', () => {
    const barcodes = ['0001', '0003', '0005', '0003', '0005'];
    const result = main.printReceipt(barcodes);
    expect(result).toBe('Receipts\n' +
                        '------------------------------------------------------------\n' + 
                        'Coca Cola                       3          1\n' + 
                        'Pepsi-Cola                      5          2\n' + 
                        'Dr Pepper                       7          2\n' + 
                        '------------------------------------------------------------\n' +
                        'Price: 27');
});

it ('should return Error message for invalid barcode', () => {
    const barcodes = [];
    const result = main.printReceipt(barcodes);
    expect(result).toBe('[ERROR]: Barcode is invalid');
});

it ('should return error message when barcode is null', () => {
    const barcodes = [];
    const result = main.printReceipt(barcodes);
    expect(result).toBe('[ERROR]: Barcode is invalid');
});