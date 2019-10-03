import axios from 'axios';

async function getResults(query){
    const proxy='https://cors-anywhere.herokuapp.com/';
    const key='f469cde0dbd53309ebe643d4993afb4d';
    try{
        const res= await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    }
    catch(error){
       alert(error);
    }
}
getResults('tomato pasta');

//https://www.food2fork.com/api/search
//f469cde0dbd53309ebe643d4993afb4d