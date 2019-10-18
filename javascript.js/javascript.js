var firebaseConfig = {
    apiKey: "AIzaSyAFxSIlvJZ2eU6_CtI62l3jS7h3MvYOB80",
    authDomain: "train-01-4ffee.firebaseapp.com",
    databaseURL: "https://train-01-4ffee.firebaseio.com",
    projectId: "train-01-4ffee",
    storageBucket: "train-01-4ffee.appspot.com",
    messagingSenderId: "887219730148",
    appId: "1:887219730148:web:19d63de325032462235ef1",
    measurementId: "G-SY4TL7JY07"
  };
firebase.initializeApp(config);

//Variable reference database
var database = firebase.database();

//Values
var name = "";
var destination = "";
var trainNext = "";

var now = moment();
console.log("Current Time: " + moment(now).format("hh:mm"));

//timer
$("#timer").text(now.format("hh:mm"));

//add train
$("#addTrain").on("click", function(event) {
    event.preventDefault();
//input
name = $("#inputTrain").val().trim(); 
destination = $("#inputDestination").val().trim();
trainNext = $("#inputTime").val().trim();
});
//push
database.ref().push({
    name: name,
    destination: destination,
    trainNext: trainNext,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
//snapshot
database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.trainNext);
//add onto HTML
    $("#inputTrain").text(sv.name);
    $("#inputDestination").text(sv.destination);
    $("#inputTime").text(sv.trainNext);
}, function(errorObject) {
    console.log("Error" + errorObject.code);
});
