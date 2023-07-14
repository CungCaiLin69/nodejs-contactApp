const fs = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

//make a folder path if it doesn't exist
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

//make a contact.json file if it doesn't exist
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         })
//     })
// }

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)

    return contacts;
}

const saveContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP }
    const contacts = loadContact()

    //cek duplikat 
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat){
        console.log(
            chalk.red.inverse.bold('Contact already exists, create new contact')
        )
        return false
    }

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(
                chalk.red.inverse.bold('invalid email')
            )
            return false
        }
    }

    //cek no HP
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(
            chalk.red.inverse.bold('invalid phone number')
        )
        return false
    }

    contacts.push(contact)
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    
    console.log(
        chalk.green.inverse.bold('Contact added successfully')
    )
    
    // rl.close();
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.blue.inverse.bold('Contact list'))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact){
        console.log(chalk.red.inverse.bold('Contact not found'))
        return false
    }

    console.log(chalk.green.inverse.bold(contact.nama))
    console.log(contact.noHP)
    if(contact.email){
        console.log(contact.email)
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    )

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold('Contact not found'))
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
    console.log(chalk.green.inverse.bold('Contact deleted successfully'))
}

module.exports = { saveContact, listContact, detailContact, deleteContact }