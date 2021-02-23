const formatTime = (input)=>{
    let rs = "";
    if(typeof input == Array | input != undefined){
        let arr = input.split("-");
        rs = arr[0]+" Giờ: "+ arr[1]+" phút";
    }
    return rs;
}
export default formatTime;