import axios from 'axios';

export default class Search {
    constructor(query){
        this.query=query;
    }
    async getResults(){
        const proxy='https://cors-anywhere.herokuapp.com/';
        const key='f469cde0dbd53309ebe643d4993afb4d';
        try{
            const res= await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
           
            this.result  = res.data.recipes;
            //console.log(this.result);
        }
        catch(error){
           alert(error);
        }
    }
}






//https://www.food2fork.com/api/search
//f469cde0dbd53309ebe643d4993afb4d