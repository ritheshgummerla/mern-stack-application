// import findAdmin from "./findAdmin";

// export default {
//     findAdmin,
// }

import "isomorphic-fetch";
const findAdmin=async ()=> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    //console.log(json)
    return {
        data:json
    }
}

const findUser=async (token)=> {
    const response = await fetch("http://localhost:4000/getdata",{
        method: 'get',
        headers: {'Content-Type':'application/json','Authorization': token,},
        
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    //console.log(json)
    
    return {
        data:json
    }
}

const deleteUser=async (id)=> {
    const response = await fetch("http://localhost:4000/delete/"+id,);
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
    //console.log(json)
    return {
        data:json
    }
}

const addUser=async (data)=> {debugger;
    const response = await fetch("http://localhost:4000/addtodo",
    {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
   // console.log(json)
    return {
        data:json
    }
}

const updateUser=async (data)=> {
    const response = await fetch("http://localhost:4000/update",
    {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
    if(!response){
        console.log("Error")
    }
    const json = await response.json();
   // console.log(json)
    return {
        data:json
    }
}

const registerUser=async (data)=> {debugger;
    const response = await fetch("http://localhost:4000/register",
    {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
    if(response.status===400){
    const json = await response.json();
        return {
            status:400,
            error:json
        }
    }

    const json = await response.json();
   // console.log(json)
    return {
        status:200,
        data:json
    }
}


const userLogin=async (data)=> {
    const response = await fetch("http://localhost:4000/login",
    {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
       });
       
    if(response.status===400){
    const json = await response.json();
    
    console.log(json)
        return {
            error:json
        }
    }
    if(response.status===404){
        const json = await response.json();
        
        console.log(json)
            return {
                error:json
            }
        }

    const json = await response.json();
    return {
        status:200,
        data:json
    }
}

  
   

export default {findAdmin,addUser,findUser,deleteUser,updateUser,registerUser,userLogin}