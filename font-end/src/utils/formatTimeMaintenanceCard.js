export const formatHourAndMinute = (input) => {

    let times = "";
    if (input !== null && input !== undefined) {
        if(input.toString().length >= 4){
            input = input.toString().substring(0,4);
            console.log(">4");
        }
        console.log("input", input);
        var s = input.toString();
        if (s.indexOf('.') == -1) {
            return input + " tiếng";
        }else{
            var hour = parseInt(s.substring(0, s.indexOf('.')));
            var minute = parseInt(s.substring(s.indexOf('.') + 1, s.length));
    
            if (minute > 58) {
                var integer = Math.round(parseInt(minute) / 60);
                var decimal = Math.round(parseInt(minute) % 60);
                hour += integer;
                minute = decimal;
            }
            if (minute < 10) {
                minute = minute * 10;
            }
    
            if (minute > 0 && hour > 0) {
                console.log("b");

                times = hour + " tiếng-" + minute + " phút";
            } else if (hour > 0 && minute <= 0) {
                console.log("a");
                times = hour + " tiếng";
            }else if(hour == 0 && minute >0){
                times = minute + " phút";
            }
            else {
                times = "";
            }
            console.log("minute",minute);
            console.log("hour",integer);
        }
       
       
        console.log(times);
    }
    return times;

}