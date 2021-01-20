
const BASE = 'https://swapi.dev/api/';


async function getFilm(el)
{
    const res = await axios.get( BASE + `films/${el}/`)
    return res.data.characters;
}

async function getCharacter(url){
    return await axios.get(url);
}

async function renderCharacters(characters)
    {   
        const container = document.querySelector('.container');
        characters.forEach(element => {
            let cards = document.createElement('div'); 
            cards.classList.add('user'); 
            getCharacter(element).then(value => {
                cards.innerHTML = 
                `<h4>${value.data.name}</h4>
                 <h5>${value.data.birth_year}</h5>
                 <h5>${value.data.gender}</h5>`       
               

            })
            container.append(cards);
        });
        
    }
 //getFilm().then(renderCharacters)
const button = document.getElementById("but")
button.addEventListener('click', () => {
    document.querySelector('.container').innerHTML = '';
    const val = document.getElementById('input').value;
    getFilm(val).then(renderCharacters)})

///////////////////////////////////////////////////////////////////////////////////////////////
let page = 1;

async function getPlanet(page)
    {
        const res = await axios.get( BASE + `planets/`, {params :{
            'page' : page
        }})
        return res.data.results;
    }

getPlanet().then(planets => console.log("planets : ", planets))



const rightButton = document.createElement('button')
const lefttButton = document.createElement('button')
const containerOfPlanets = document.createElement('div');
containerOfPlanets.className = "containerOfPlanets"
async function renderPlanets(results)
{
    const container = document.querySelector('.container');
    const buttonContainer = document.createElement('div');

    results.forEach(element =>{
        const planets = document.createElement('div');
        planets.classList.add('planet'); 
        planets.innerHTML =  
        `<h4>${element.name}</h4>`;

        containerOfPlanets.appendChild(planets)
    })
    rightButton.id = "right";
    lefttButton.id = "left";
    rightButton.innerHTML = '<img src="./icons/next.png" width = 30px />';
    lefttButton.innerHTML = '<img src="./icons/back.png" width = 30px />';
    buttonContainer.append(lefttButton);
    buttonContainer.append(rightButton);
    containerOfPlanets.appendChild(buttonContainer) 
    container.append(containerOfPlanets)

}
getPlanet().then(renderPlanets)

rightButton.addEventListener('click', () => {
    document.querySelector('.containerOfPlanets').innerHTML = '';
    if(page == 6)
    {
        page = 0;
    }
    page = page + 1;
    getPlanet(page).then(renderPlanets).page

})

lefttButton.addEventListener('click', () => {
    document.querySelector('.containerOfPlanets').innerHTML = '';
    if(page == 1)
    {
        page = 7;
    }
    page = page - 1;
    getPlanet(page).then(renderPlanets).page

})