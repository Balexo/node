"use strict";

require("dotenv").config();

const connection = require("./lib/connectMongoose");
const Adds = require("./models/add");
const readline = require("node:readline");
const fs = require("fs");
const { Add, User } = require("./models");

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
  const { userData: usersData } = data(); // usersData -> {email: "user@example.com, password: "1234"}
  console.log(usersData);
  //delete all users
  const deleted = await User.deleteMany();
  console.log(`${deleted.deletedCount} users were deleted`);

  //create initial users
  const inserted = await Promise.all(
    usersData.map(async (user) => {
      user.password = await User.hashPassword(user.password);
      await User.insertMany(user);
      return user;
    }),
  );
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
