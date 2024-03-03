'use strict';

const connection = require('./lib/connectMongoose');
const Adds = require('./models/add');
const readline= require('node:readline');
const fs = require('fs');

main().catch(err=>console.log("Hubo un error", err));

async function main(){

    //Esperar que se conecta a la BD
    await new Promise((resolve) => connection.once('open', resolve));

    const borrar = await questionAsked("Would you like to delate DB? (No means you do not delate it)");
    if(!borrar){
        console.log("Process canceled. DB was NOT deleted.");
        process.exit();
        
    }
        await initAdds();

        connection.close();
}

async function initAdds(){
    const jsonAddsList = fs.readFileSync('./json_data/addsData.json')
    const adsData = JSON.parse(jsonAddsList);
    
    //delete all adds
    const deleted = await Adds.deleteMany();
    console.log(`There is ${deleted.deletedCount} adds.`);
    

    //create initials adds
    const inserted = await Adds.insertMany(adsData);
    
    console.log(`There is ${inserted.length} new adds created.`);

}

function questionAsked(text){
    return new Promise((resolve, reject) => {
        //Concectar readline con la consola

    const ifc= readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    ifc.question(text, answer=>{
        ifc.close();
        resolve(answer.toLowerCase()==="si");
    })
    });
}