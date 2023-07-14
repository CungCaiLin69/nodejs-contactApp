// mengambil argument dari command line
const yargs = require('yargs');
const contacts = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        nama: {
            describe: "Full name",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: "Email",
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: "Phone number",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.saveContact(argv.nama, argv.email, argv.noHP)
    },
}).demandCommand();

//show all list of names and phone number of contact
yargs.command({
    command: 'list',
    describe: 'show all list of names and phone number of contact',
    handler(){
        contacts.listContact()
    }
})

//show the details of the contact based on the name
yargs.command({
    command: 'detail',
    describe: 'show the details of the contact based on the name',
    builder: {
        nama: {
            describe: "Full",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama)
    }
})

//delete the contact based on the name
yargs.command({
    command: 'delete',
    describe: 'delete the contact based on the name',
    builder: {
        nama: {
            describe: "Full name",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama)
    }
})

yargs.parse();

// const { tulisPertanyaan, simpanContact } = require('./contacts')

// const main = async () => {
//     const nama = await tulisPertanyaan('Masukkan Nama : ')
//     const email = await tulisPertanyaan('Masukkan Email : ')
//     const noHP = await tulisPertanyaan('Masukkan No HP : ')

//     simpanContact(nama, email, noHP)
// }

// main()
