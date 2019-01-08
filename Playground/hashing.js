const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('\n\n' +  hash + '\n\n' );
    })
})

let hashedPassword = '$2a$10$XT3EmO12kAiutKwpzbQU5uSU5mqodT3uLGHpQLt42fGedtcos4hfC'

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
})

let data = {
    
    id: 10,
    name: 'marka'
};

let token = jwt.sign(data, 'somesecretcode');
// can encode in https://jwt.io/

//console.log(`${token}\n\n`);


let decodedResults = jwt.verify(token, 'somesecretcode')

//console.log('decodedResults', decodedResults);

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


