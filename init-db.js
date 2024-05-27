"use strict";

const connection = require("./lib/connectMongoose");
const Adds = require("./models/add");
const readline = require("node:readline");
const fs = require("fs");
const { add, user } = require("./models");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  //Esperar que se conecta a la BD
  await new Promise((resolve) => connection.once("open", resolve));

  const borrar = await questionAsked(
    "Would you like to delate DB? (No means you do not delate it)",
  );
  if (!borrar) {
    console.log("Process canceled. DB was NOT deleted.");
    process.exit();
  }
  await initAdds();
  await initUsers();

  connection.close();
}

function data() {
  const jsonAddsUser = fs.readFileSync("./json_data/addsData.json");
  const { users: userData, adds: addData } = JSON.parse(jsonAddsUser);

  return { userData, addData };
}

async function initUsers() {
  const { userData: usersData } = data();
  //delete all users
  const deleted = await User.deleteMany();
  console.log(`${deleted.length} users were deleted`);

  //create initial users
  const inserted = await User.insertMany(usersData);
  console.log(`There is ${inserted.length} new users created.`);
}

async function initAdds() {
  const { addData: addsData } = data();

  //delete all adds
  const deleted = await Adds.deleteMany();
  console.log(`There is ${deleted.deletedCount} adds.`);

  //create initials adds
  const inserted = await Adds.insertMany(addsData);

  console.log(`There is ${inserted.length} new adds created.`);
}

function questionAsked(text) {
  return new Promise((resolve, reject) => {
    //Concectar readline con la consola

    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(text, (answer) => {
      ifc.close();
      resolve(answer.toLowerCase() === "si");
    });
  });
}
