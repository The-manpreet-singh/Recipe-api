import {elements} from './base';


export const getInput = () => elements.searchInput.value;
export const clearInput =() => {
    elements.searchInput.value = '';
};

export const clearResults = () =>{
    elements.searchResList.innerHTML ='';
    elements.searchResPages.innerHTML ='';
};

//Pasta with tomato and spinash
/* 
acc:0 / acc+cur.length =5 / newTitle =[pasta]
acc:5 / acc+cur.length =9 / newTitle =['pasta', 'with']
acc:9 / acc+cur.length =15 / newTitle =['pasta', 'with', 'tomato']
acc:15 / acc+cur.length =18  / newTitle ='pasta', 'with', 'tomato']
acc:18 / acc+cur.length =24  / newTitle ='pasta', 'with', 'tomato']
*/


const limitRecipeTitle = (title, limit =17) => {
  const newTitle=[];
   if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
          if(acc+cur.length <= limit){
            newTitle.push(cur);
          }
          return acc + cur.length;
        },0);

        //return the result
        return `${newTitle.join(' ')}...`;
   }
   return title;

};

const renderRecipe = recipe => {
  const markup = `
      <li>
        <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
          </div>
        </a>
      </li> 
    `;
 elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//type: 'pre' or 'next'
const createbutton = (page, type) => `

             <button class="btn-inline results__btn--${type} data-goto=${type === 'prev' ? page - 1 : page +1}">
             <span>Page ${type === 'prev' ? page - 1 : page +1}</span>       
             <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                   
             </button>

`;

const renderButtons = (page, numReasults, resperPage) => {
    const pages = Math.ceil(numReasults / resperPage);
     let button;
    if(page ===1 && pages > 1){
      //only button to go to next page
        button= createbutton(page, 'next');
    } else if(page < pages){
      // both buttons
      button= `
      ${createbutton(page, 'pre')}
      ${createbutton(page, 'next')}
      `;
    }
    else if(page === pages && pages > 1){
      //only button to go to prev page
      button= createbutton(page, 'pre');
    }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => 
{
  //render result of currents page
  const start = (page -1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  //render pagination button
  renderButtons(page, recipes.length, resPerPage); 

};
