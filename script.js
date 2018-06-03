$('document').ready(function() {
  var monthNames = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
  var monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  $('#calendarForm').on('submit', function(e) {
    e.preventDefault();
    $('#calendar').empty();

    var dateArray = $('#initialDate').val().split("-");
    var initialDate = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
    var numberOfDays = parseInt($('#numberOfDays').val());
    var countryCode = $('#countryCode').val();

    var finalDate = new Date(initialDate);
    finalDate.setDate(finalDate.getDate() + (numberOfDays - 1));
    console.log("Init date: " + initialDate);
    console.log("Final date: " + finalDate);

    /*prepare indexes and totals*/
    var initialMonth = initialDate.getMonth();
    var finalMonth = finalDate.getMonth();
    var years = finalDate.getFullYear() - initialDate.getFullYear();
    console.log("Initial Month: " + (initialMonth + 1));
    console.log("Final Month: " + (finalMonth + 1));
    var totalMonths = (finalMonth + (years * 12)) - initialMonth + 1;
    console.log("Total Months: " + totalMonths);
    
  });
});