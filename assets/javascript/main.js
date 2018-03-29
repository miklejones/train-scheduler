// Initialize Firebase
var config = {
    apiKey: "AIzaSyC77j2--hKP7xHVKn2hldSp8wjgommYGJE",
    authDomain: "train-scheduler-2a9e9.firebaseapp.com",
    databaseURL: "https://train-scheduler-2a9e9.firebaseio.com",
    projectId: "train-scheduler-2a9e9",
    storageBucket: "",
    messagingSenderId: "155200905163"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;

$('.btn-primary').on('click', function(event) {

    //Capture user inputs and store then into variables
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    firsttrainTime = $('#firstTrainTime').val().trim();
    frequency = $('#frequency').val().trim();

    database.ref().push({
        trainName: 'sdf',
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})