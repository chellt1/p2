
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'id', title: 'ID'},
        {id: 'name', title: 'Name'},
        {id: 'price', title: 'Price'},
        {id: 'quantity', title: 'Quantity'}
    ]
});

// task 1
function addProduct(name, price, quantity) {
    fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.name === name) {
            console.log(`Product ${name} already exists`);
            return;
        }
    })
    .on('end', () => {
        const id = Date.now().toString();
        const product = { id: id, name: name, price: price, quantity: quantity };
        csvWriter.writeRecords([product])
            .then(() => {
                console.log(`Product ${name} added to the list`);
            });
    });
}

// task 2
function getProductById(id) {
    fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.id === id) {
            console.log(row);
            return;
        }
    })
    .on('end', () => {
        console.log(`Product with ID ${id} not found`);
    });
}

// task 3
function deleteProductById(id) {
    const results = [];
    fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.id !== id) {
            results.push(row);
        }
    })
    .on('end', () => {
        csvWriter.writeRecords(results)
        .then(() => {
            console.log(`Product with ID ${id} deleted from the list`);
        });
    });
}

// task 4
function updateProductById(id, name, price, quantity) {
    const results = [];
    fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.id === id) {
            row.name = name;
            row.price = price;
            row.quantity = quantity;
        }
        results.push(row);
    })
    .on('end', () => {
        csvWriter.writeRecords(results)
        .then(() => {
            console.log(`Product with ID ${id} updated`);
        });
    });
}

// ex
addProduct('Milk', 1.99, 1);
addProduct('Bread', 2.49, 2);
getProductById('1646545689845');
