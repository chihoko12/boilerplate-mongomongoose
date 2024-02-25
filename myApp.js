require('dotenv').config();
const mongoose = require('mongoose');

let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name:  {
    type:String,
    required: true
  },
  age: Number,
  favoriteFoods:[String]
});

Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {

  // create a new person document
  let person = new Person({
    name : "Chihoko",
    age: 20,
    favoriteFoods:["Fish", "Fruits"]
  });

  // save the document to the database
  person
    .save((err, data) => {
      if(err) {
        // handle error
        return done(err);
      }

      // document saved successfully
      done(null, data);
    })
};

const createManyPeople = (arrayOfPeople, done) => {

  // Use Model.create() to create a many people
  Person.create(arrayOfPeople, (err, data)=> {
    if(err) {
      // Handle error
      return done(err);
    }
    //People created successfully
    done (null, data);
  });
};

const findPeopleByName = (personName, done) => {

  // Use Model.find() to search for people by name
  Person.find( { name: personName }, (err,data) => {
    if(err) {
      // Handle error
      return done(err);
    }
    done(null, data);
  })
  // People found successfully
};

const findOneByFood = (food, done) => {

  Person.findOne( { favoriteFoods:[food] }, (err, data) => {
    if(err) {
      return done(err);
    }
    done(null,data);
  })
};

const findPersonById = (personId, done) => {
  
  Person.findById(personId,(err,data) => {
    if(err) {
      return done(err);
    }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {

  // Find the person by _id
  Person.findById(personId,(err,person) => {
    if(err) {
      // Handle error
      return done(err);
    }

    const foodToAdd = "hamburger";
    // Add "hamburger" to the list of favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person
    person.save((err, updatedPerson) => {
      if(err) {
        //Handle error
        return done(err);
      }
      // Updated person saved successfully
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Find a person by name and update their age to 20
  Person.findOneAndUpdate(
    { name: personName }, // search criteria
    { age: ageToSet }, // update to be applied
    { new: true }, // options to return the modified document    
    (err, updatedPerson) => {    
      if(err) {
        // Handle error
      return done(err);
    }
    // updated person returned successfully
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
