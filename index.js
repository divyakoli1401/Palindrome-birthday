function reverseStr(str){
    let charList = str.split("");
    let reverseArr = charList.reverse();
    return reverseArr.join("");
  }
  
  function isPalindrome(str){
    let reverseArr = reverseStr(str);
    return str == reverseArr;
  }
  
  function dateToString(date){
    let dateStr = { day:"", month:"", year:""};
    if(date.day < 10){
      dateStr.day = '0' + date.day;
    }
    else{
      dateStr.day = date.day.toString();
    }
    if(date.month < 10){
      dateStr.month = '0' + date.month;
    }
    else{
      dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getDateFormats(date){
    date = dateToString(date);
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;
    
    let dateFormats = [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return dateFormats;
  }
  
  function checkPalinfromeForAllDateFormats(date){
  var listOfDateFormats = getDateFormats(date)
  var flag = false;
  for( let i = 0; i <listOfDateFormats.length; i++){
    if(isPalindrome(listOfDateFormats[i])){
      flag = true;
    }
    return flag;
  }
  }
  
  function leapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    let daysOfMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month == 2){
      if(leapYear(year)){
        if(day > 29){
          day = 1;
          month++;
        }
        else{
          if(day > 28){
            day = 1;
            month++;
          }
        }
      }
    }
    else{
      if (day > daysOfMonths[month - 1]){
        day = 1;
        month++;
    }
  }
    if(month > 12){
      day = 1;
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month:month,
      year:year
    }
  }
  
  function nextPalindromeDate(date){
    let counter = 0;
    let nextDate = getNextDate(date);
    while(1){
      counter++;
      let isPalindrome = checkPalinfromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate];
  
  }
  
  const dateInput = document.querySelector("#user-input");
  const submitBtn = document.querySelector("#submit-btn");
  const outputEl = document.querySelector("#output");
  
  
  function onClickHandler(){
    var userInput = dateInput.value;
    if(userInput !==""){
      var listOfDate = userInput.split("-")
      var date = {
        day : Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      var isPalindrome = checkPalinfromeForAllDateFormats(date);
      if(isPalindrome){
        outputEl.innerText = "Your BirthDay is Palindrome";
      }
      else{
        var [counter,nextDate] = nextPalindromeDate(date);
        outputEl.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days!` 
      }
    }
  }
  
  submitBtn.addEventListener("click",onClickHandler);
  