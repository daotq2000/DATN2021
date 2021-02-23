export const formatMonney = (monney) => {
   if(monney != undefined){
    return monney.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "," + c : c;
    });
   }
}