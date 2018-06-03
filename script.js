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
    var month = initialMonth;
    for (m = 0; m < totalMonths; m++){      
      var monthStartsAt = new Date(initialDate.getFullYear(), month, 1);
      var monthEndsAt = new Date(initialDate.getFullYear(), month, monthEnds[month]);

      var firstValidDayOfMonth;
      if (initialDate < monthStartsAt){
        firstValidDayOfMonth = monthStartsAt;
      }
      else{
        firstValidDayOfMonth = initialDate;
      }
      
      /*add initials of the days as header*/
      var tableHeader = '<table class="table-bordered">';
      tableHeader += '<thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>';
      var html = tableHeader;

      /*get the month and the year of the given date and add it to the header*/
      var monthLabel = monthNames[month];
      console.log('Month: ' + monthLabel);
      var monthLabel = monthLabel + " - " + initialDate.getFullYear();
      html += '<tr><th class="text-center" colspan="7">' + monthLabel + '</th></tr></thead>';

      /*start filling invalid days at the beginning of the calendar*/
      var initialDayOfWeek = monthStartsAt.getDay();
      var initialDay = firstValidDayOfMonth.getDate();
      var initialInvalidDays = initialDay + initialDayOfWeek - 1;

      var dayOfWeek = 0;
      html += "<tbody>";
      for (i = 0; i < initialInvalidDays; i++) {
        if (dayOfWeek == 0){
          html += '<tr>';
        }
        html += '<td>&nbsp;</td>';
        dayOfWeek++;
        if(dayOfWeek == 7)
        {
          html += '</tr>';
          dayOfWeek = 0;
        }
      }

      /*start filling valid days */
      console.log("Final date of " + monthLabel + ": " + monthEndsAt);
      var validDaysOfMonth = 0;
      if (finalDate > monthEndsAt){
        validDaysOfMonth = monthEndsAt.getDate() - firstValidDayOfMonth.getDate() + 1;
      }
      else{
        validDaysOfMonth = finalDate.getDate() - firstValidDayOfMonth.getDate() + 1;
      }
      console.log("Valid days of " + monthLabel + ": " + validDaysOfMonth);
      
      var dayIndex = initialDay;

      for (i = 0; i < validDaysOfMonth; i++){
        if (dayOfWeek == 0){
          html += '<tr>';
        }
        if(dayOfWeek == 0 || dayOfWeek == 6){
          html += '<td>' + dayIndex + '</td>';
        }
        else
        {
          html += '<td>' + dayIndex + '</td>';
        }
        dayOfWeek++;
        dayIndex++;
        if(dayOfWeek == 7)
        {
          html += '</tr>';
          dayOfWeek = 0;
        }
      }

      /* Fill invalid days at end of month */
      var finalInvalidDays = 0;
      if (finalDate < monthEndsAt){
        finalInvalidDays = (monthEndsAt.getDate() - finalDate.getDate()) + (6 - monthEndsAt.getDay());
      }
      else{
        finalInvalidDays = 6 - monthEndsAt.getDay();
      }
      console.log("Invalid final days of " + monthLabel + ": " + finalInvalidDays);
      for (i = 0; i < finalInvalidDays; i++){
        if (dayOfWeek == 0){
          html += '<tr>';
        }
        html += '<td class="invalid">&nbsp;</td>';
        dayOfWeek++;
        if(dayOfWeek == 7)
        {
          html += '</tr>';
          dayOfWeek = 0;
        }
      }

      html += '</tbody></table>';
      $('#calendar').append(html);

      /*set next month value*/
      month++;
      if (month > 11){
        month = 0;
      }
    }
  });
});