const query = document.getElementById("query");
const radioType = document.querySelectorAll(".radioType");
const limit = document.getElementById("limit");
const btnSub = document.getElementById("btnSub");

// on submit
btnSub.addEventListener("click",(e)=>{
    // the object where I'll store all infos
    let myObjRes = {};
    // checking how much checkBox is clicked
    let arrOfTypes = [];
    for(let i = 0; i < radioType.length; i++){
        if(radioType[i].checked){
            arrOfTypes.push(radioType[i].value);
        }
    }
    // inputs validation
    if(query.value.length < 2){
        alert("Please Enter What You Would Search For!")
        query.style.background = "rgb(255, 200, 200)"
        e.preventDefault();
    }
    else if(arrOfTypes.length < 1){
        alert("You should choose atleast one type!")
        e.preventDefault();
    }
    else{
        query.style.background = "white";
        myObjRes.query = query.value;
        myObjRes.type = arrOfTypes;
        myObjRes.limit = limit.value;

        axios.post('/', {
            data:{
                query: query.value,
                type: arrOfTypes,
                limit: limit.value
            }
        })
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err));

        window.open("./results.html","_self");
    }
})