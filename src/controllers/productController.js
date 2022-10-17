
let getCategory = (req , res) => {
    console.log(req.query.hello); 
    console.log("oke"); 
    console.log(req.query.category);
    res.send("hello "); 
}

export default {getCategory}; 
