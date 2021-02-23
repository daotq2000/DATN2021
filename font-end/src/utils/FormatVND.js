 

export const formatCurrentcy = (input) =>{
    let string = "";
    let rs = 0;
    if(input != undefined){
        rs = parseInt(input/1000);
        string = rs+"K";
    }
    
    return string;
}
