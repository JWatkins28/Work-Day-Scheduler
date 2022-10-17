// DOM ELEMENT VARIABLES
var textInputs = $('textarea')
var saveBtn = $('.saveBtn')
var fullBlock = $('.row')

// VARIABLES FOR STORING LATER
var events = []
var newEvents = []
var indexNumber

// TIME RELATED VARIABLES
var updatedTime
var currentDay = moment()
var currentTime = $('#currentTime').text(currentDay.format('h:mm:ss A'));
// SETTING THE DATE/DAY AT THE TOP OF THE PAGE
$('#currentDay').text(currentDay.format('dddd, MMM Do, YYYY'));

// CONSTANTLY UPDATING THE TIME AT THE TOP OF THE PAGE
setInterval(function () {
    updatedTime = moment();
    currentTime = $('#currentTime').text(updatedTime.format('h:mm:ss A'));
}, 1000)

// LOOP TO COLOR THE BACKGROUNDS OF THE EVENT BOX BASED ON TIME AND SET STORED TEXT (IF EXISTS)
function init() {
    // LOOP FOR GRABBING THE STORED INPUTS
    for (var i = 0; i < textInputs.length; i++) {
    var storedEvents = JSON.parse(localStorage.getItem(`timeblock${i}`))
    events.push(storedEvents);
    }
    // LOOP FOR COLORING THE BACKGROUNDS
    for (var i = 0; i < textInputs.length; i++) {
        var timeCheck = moment().hour();
        var blockNumber = fullBlock[i].dataset.boxnumber;
        if (blockNumber < timeCheck) {
            fullBlock[i].children[1].setAttribute('class', 'past')
            if (events[i] !== null) {
                fullBlock[i].children[1].textContent = events[i].text; 
            }
        } else if (blockNumber == timeCheck) {
            fullBlock[i].children[1].setAttribute('class', 'present')
            if (events[i] !== null) {
                fullBlock[i].children[1].textContent = events[i].text; 
            }
        } else { 
            fullBlock[i].children[1].setAttribute('class', 'future')
            if (events[i] !== null) {
                fullBlock[i].children[1].textContent = events[i].text; 
            }
        }
    }
}

// SAVE THE EVENTS ON CLICK
fullBlock.on('click', function(event) {
    event.preventDefault();
    var element = event.target;
    var parentEl = $(element).parent();
    if (element.matches("button")) {
        var selectedText = parentEl[0].children[1].value.trim();
        indexNumber = parentEl[0].dataset.indexn;
        newEvents = {
            boxnumber: parentEl[0].dataset.boxnumber,
            text: selectedText,
            }
            localStorage.setItem(`timeblock${indexNumber}`, JSON.stringify(newEvents))
    }})

// INITIAL PAGE LOAD FUNCTION
init();