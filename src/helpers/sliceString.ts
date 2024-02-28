const sliceString = (str:string, length: number, dots: boolean = true) => {
    if(str.length < length) return str;
    return str.slice(0, length) + (dots ? "..." : "");
}

export default sliceString;