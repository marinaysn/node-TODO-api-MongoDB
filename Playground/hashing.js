const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')



let data = {
    
    id: 10,
    name: 'marka'
};

let token = jwt.sign(data, 'somesecretcode');


console.log(`${token}\n\n`);


let decodedResults = jwt.verify(token, 'somesecretcode')

console.log('decodedResults', decodedResults);

//data.name='marina'

// let msg = 'I am user number 3';
// let hash = SHA256(msg).toString();
// console.log(`${msg} \n\n${hash}secret\n\n`);


// let data = {
    
//     id : 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
    
// data.id = 5;
// let = resultHash = SHA256(JSON.stringify(data) + "somesecret").toString();



// if (resultHash === token.hash) {
//     console.log("Data was not changed")
// }
// else {
//     console.log("Data was changed")
// }


