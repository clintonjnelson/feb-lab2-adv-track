/*********************************************************
LAB 2: SORTING AND CAMPY SCI-FI

Welcome to Lab 2 =)
Be sure to read all the comments!
All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.
To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour
*/
// TODO: First, make a constructor function, called Blob, that makes blobs.
function Blob () {
  this.consumptionRate = 1;
  this.consumed = 0;
}

// TODO: Next, create an instance of Blob named blob.
var blob = new Blob();
// TODO: Then, use a loop to calculate how long it took the blob to finish
// with Dowington.

var dowingtonPopulation = 1000;
function consumeDowington() {
  var hours = 0;
  while (blob.consumed < dowingtonPopulation) {
    hours += (1 / blob.consumptionRate);
    blob.consumptionRate++;
    blob.consumed++;
    if (blob.consumed === dowingtonPopulation) {
      dowingtonPopulation = 0;
      // console.log("A blob has consumed dowington in " + hours + " hours!");
      return hours;
    }
  }
}

var hoursSpentInDowington; // TODO: assign me the value of the above calculation
hoursSpentInDowington = consumeDowington();

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

// TODO: implement me based on the instructions above. Be sure to then assign me to the Blob's prototype.
function hoursToOoze(population, peoplePerHour) {
  var hours = 0, consumed = 0;
  while (consumed < population) {
    hours += (1 / peoplePerHour);
    peoplePerHour++;
    consumed++;
  }
  if (consumed === population) {
    // console.log("A blob has consumed the town in " + hours + " hours!");
    return hours;
  }
}
Blob.prototype.hoursToOoze = hoursToOoze;  // add just the function

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(1, 1) === 1, "it takes an hour for that first one");
assert(blob.hoursToOoze(1, 0) === Infinity, "blob should be slower...");
assert(blob.hoursToOoze(3000000, 1) === 15.491338678199934, "Seattle should fall in ~15.5 hours.");

//
//
//
//
//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (planet, languageSpeak) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.planet = planet;
  this.languageSpeak = languageSpeak;
}

// sb is a SentientBeing object
function sayHello (sb) {
  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating

  console.log(hello[this.languageSpeak]);
  return hello[sb.languageSpeak];
}

//TODO: put this on the SentientBeing prototype
SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Klingon() {}
Klingon.prototype = new SentientBeing("Qo\"nos", "klingon");

function Human() {}
Human.prototype = new SentientBeing("Earth", "federation standard");

function Romulan() {}
Romulan.prototype = new SentientBeing("Romulus", "romulan");

assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === "Jolan\"tru",
  "the Romulan should hear Jolan\"tru");
assert((new Klingon()).sayHello(new Human()) === "hello",
  "the Human should hear hello");
assert((new Klingon()).sayHello(new Romulan()) === "Jolan\"tru",
  "the Romulan should hear Jolan\"tru");
assert((new Romulan()).sayHello(new Human()) === "hello",
  "the Human should hear hello");
assert((new Romulan()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");

//
//
//
//
//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one
//*********************************************************
function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {  // function byLastLetter(array) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // read this: http://www.w3schools.com/jsref/jsref_sort.asp
    switch (true) {
      case (a.charAt(a.length - 1) < b.charAt(b.length - 1)): return -1;
      case (a.charAt(a.length - 1) > b.charAt(b.length - 1)): return 1;
      default: return 0;
    }
  }
  return stringArray.sort(byLastLetter); // Arrays are mutable, only if declared/assigned
}
assert( lastLetterSort( [ "hello", "bonjour", "g\'day", "aloha" ] ).join() === [ "aloha", "hello", "bonjour", "g\'day" ].join(),
  "the array does not appear to have sorted in revserse." );
assert( lastLetterSort( [ "goodbye", "sayonara", "au revior", "ooroo" ] ).join() === [ "sayonara", "goodbye", "ooroo", "au revior" ].join(),
  "the array does not appear to have sorted in revserse." );

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach( function(e) { sum += e; } );
  return sum;
}
assert( sumArray([ 1, 2, 3, 4, 5 ]) === 15, "seems like it's not counting quite right");
assert( sumArray([ 10, 20, 30, 40, 50 ]) === 150, "seems like it's not counting quite right");

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort( function(a, b) {
    //  TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return (sumArray(a) - sumArray(b));
  });
  return arrayOfArrays;  // handle cases of undefined/unassigned arrays
}
var arrayOfArrays1 = [ [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4 ], [ 1, 2, 3 ], [ 1, 2 ], [ 1 ] ];
assert( sumSort(arrayOfArrays1).join() === "1,1,2,1,2,3,1,2,3,4,1,2,3,4,5",
  "looks like the array isn't sorted based on sums of inner array contents");
var arrayOfArrays2 = [ [ 100, 200, 300 ], [ 100, 200 ], [ 100 ], [ 500, 400, 300 ] ];
assert( sumSort(arrayOfArrays2).join() === "100,100,200,100,200,300,500,400,300",
  "looks like the array isn't sorted based on sums of inner array contents");

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
