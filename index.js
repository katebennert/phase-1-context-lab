/* Your Code Here */

function createEmployeeRecord(employeeInfoArray) {
    return {
        firstName: employeeInfoArray[0],
        familyName: employeeInfoArray[1],
        title: employeeInfoArray[2],
        payPerHour: employeeInfoArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfEmployeeInfoArrays) {
    return arrayOfEmployeeInfoArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    let hourDate = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    })

    return this;
}

function createTimeOutEvent(dateStamp){
    let hourDate = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    })

    return this;
}

function hoursWorkedOnDate(dateWorked) {
    let employeeOut = this.timeOutEvents.find(dateElement => dateElement.date === dateWorked);
    let employeeIn = this.timeInEvents.find(dateElement => dateElement.date === dateWorked);
    return (employeeOut.hour - employeeIn.hour) / 100;
}

function wagesEarnedOnDate(dateWorked) {
    return hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    let totalWageArray = employeeRecords.map(employee => allWagesFor.call(employee));
    const initialValue = 0;
    return totalWageArray.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
}






