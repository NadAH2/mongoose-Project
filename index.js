const mongoose = require("mongoose");
const connectToDB = require("./config/db");
var uniqueValidator = require("mongoose-unique-validator");
//connect to db
connectToDB();
//creation of person's schema

const date = new Date();
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    unique: true,
  },
  favoriteFoods: {
    type: [String],
    unique: true,
  },
});
personSchema.plugin(uniqueValidator);
//create and save a person
//a person's collection
const Person = mongoose.model("person", personSchema);
//creation of document
const createPerson = () => {
  const person = new Person({
    name: "Alex",
    age: "28",
    favoriteFoods: ["Humburger", "nuggets"],
  });
  //to save doc in DB
  person.save(function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(null, data);
    }
  });
};
//create many records
const createManyPeople = async () => {
  try {
    const arrOfPeople = await Person.create([
      { name: "Ahmed", age: 30, favoriteFoods: ["couscous", "lasagne"] },
      {
        name: "Saly",
        age: 20,
        favoriteFoods: ["fish", "spaghetti"],
      },
      { name: "Mary", age: 40, favoriteFoods: ["nuggets", "Pizza"] },
      { name: "Sofi", age: 31, favoriteFoods: ["burritos", "Pizza"] },
    ]);
    console.log(arrOfPeople);
  } catch (error) {
    throw error;
  }
};
//search in DB with find()

const getPerson = async () => {
  try {
    // const personFind = await Person.find();
    // const favF = ["Humburger", "nuggets"];
    // const personFind = await Person.findOne({
    //   //favoriteFoods: "nuggets",
    //   favoriteFoods: favF,
    // });
    // const personFind = await Person.findById({
    //   _id: "62eabe731236f85a93705667",
    // });
    console.log(personFind);
  } catch (error) {
    console.log(error.message);
  }
};
const FindEditSave = async () => {
  try {
    const personFind = await Person.findById({
      _id: "62eabe731236f85a93705667",
    });
    personFind.favoriteFoods.push("Hamburger");
    personFind.save((err, updatedPerson) => {
      if (err) {
        console.error(err);
      } else {
        console.log(null, updatedPerson);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
//updates with findOneAndUpdate
const FindUpdate = async () => {
  try {
    const PersonUpdated = await Person.findOneAndUpdate(
      { name: "Alex" },
      { age: 20 },
      { new: true }
    );
    console.log(PersonUpdated);
  } catch (error) {
    console.log(error.message);
  }
};
//remove with findByIdAndRemove
const FindIdRemove = async () => {
  try {
    const removeDoc = await Person.findByIdAndRemove({
      _id: "62eaf601b1eeb8b40aa37a0c",
    });
    console.log(removeDoc, "has removed");
  } catch (error) {
    console.log(error.message);
  }
};
//delete many docs with remove
const removePerson = async () => {
  try {
    const res = await Person.remove({ name: "Mary" });
    console.log(res, "successfully removed");
  } catch (error) {
    console.log(error.message);
  }
};
//Search Query helpers
const searchPerson = async (done) => {
  try {
    const res = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, personFinded) => {
        if (err) console.log(err);

        console.log(personFinded);
      });
  } catch (error) {
    console.log(error);
  }
};
searchPerson();
//removePerson();
//FindIdRemove();
//FindUpdate();
//getPerson();
//FindEditSave();
//createManyPeople();
//createPerson();
