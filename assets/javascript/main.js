// Initialize Firebase
var config = {
    apiKey: "AIzaSyC77j2--hKP7xHVKn2hldSp8wjgommYGJE",
    authDomain: "train-scheduler-2a9e9.firebaseapp.com",
    databaseURL: "https://train-scheduler-2a9e9.firebaseio.com",
    projectId: "train-scheduler-2a9e9",
    storageBucket: "train-scheduler-2a9e9.appspot.com",
    messagingSenderId: "155200905163"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var tMinutesTillTrain = 0;
var nextTrain = "";

$('.btn-primary').on('click', function (event) {

    //we will stop the page from clearing and manually clear the input below
    event.preventDefault();

    //Capture user inputs and store then into variables
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    firstTrainTime = $('#firstTrainTime').val().trim();
    frequency = $('#frequency').val().trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    }

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");


    //use this data to caluate the next arrival and the minutes away

    //push all new data too the dom

});



//Firebase event for adding train info to the database and a row in html when a user adda an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());
    console.log(prevChildKey);

    // Store everything into a variable.
    var trnName = childSnapshot.val().trainName;
    var trnDestination = childSnapshot.val().destination;
    var trnFirstTime = childSnapshot.val().firstTrainTime;
    var trnFrequency = childSnapshot.val().frequency;

    //Calcuate the time until the next arrival

    //First time(pushed back one year so it comes before current date and avoids confusion)
    var firstTimeConverted = moment(trnFirstTime, "HH:mm").subtract(1, 'years');
    // console.log(firstTimeConverted);

    //Current Time
    var currentTime = moment();
    console.log(moment().format("hh:mm"));

    //Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    //Time apart (remainder)
    var tRemainder = diffTime % trnFrequency;
    console.log(tRemainder);

    //Minute Until Train
    tMinutesTillTrain = trnFrequency - tRemainder;
    console.log(tMinutesTillTrain);
    
    //Next train calculations
    var nTrain = moment().add(tMinutesTillTrain, 'minutes');
    nextTrain = moment(nTrain).format("hh:mm");






    //Add each train's data into the table
    $("#train-table > tbody").append("<tr> <td>" + trnName + "</td> <td>" + trnDestination + "</td> <td>" + trnFrequency + "</td> <td>" + nextTrain + "</td> <td>" + tMinutesTillTrain + "</td>    </tr > ");


});