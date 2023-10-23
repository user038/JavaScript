const apikey = 'd54c15dc';
const src = 'http://www.omdbapi.com/';

//config for the search template
const autocompleteConfig = {
    //retruning search input value
    inputValue(film){
        return film.Title;
    },
    //fetching data using search unput
    async fetchData (searchTerm) {
        const response = await axios.get(src,{
            params:{
                apikey: apikey,
                s : searchTerm
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
        
    },
    //rendering dropdown after search
    renderOption(film){
        const imgSrc = film.Poster == 'N/A' ? '' : film.Poster;
        return `<img src="${imgSrc}"/>
        ${film.Title} (${film.Year})`;
    }
}

//search template
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(film){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(film,document.querySelector('#left-summary'),'left');
    }
});
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(film){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(film,document.querySelector('#right-summary'),'right');
    }
});

let leftMovie;
let rightMovie;
//onMovieSelect
const onMovieSelect = async (film,summaryElement,side) => {
    const response = await axios.get(src,{
        params:{
            apikey : apikey,
            i : film.imdbID
        }
    });
    
    summaryElement.innerHTML = movieTemplate(response.data);
    console.log(response.data)

    if(side === 'left'){
        leftMovie = response.data;
    }else{
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }

}

const runComparison = () =>{
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat,index)=>{
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }else{
            
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    })
    
}


//redering movie details
const movieTemplate = movieDetail =>{
    const dollors = parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
    const metaScore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));

    console.log(dollors);
    console.log(metaScore);
    console.log(imdbRating);
    console.log(imdbVotes);

    const awards = movieDetail.Awards.split(' ').reduce((prev,word)=>{
        const value = parseInt(word);
        if(isNaN(value)){
            return prev;
        }else{
            return prev + value;
        }
    },0);

    console.log(awards);

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article  data-value = ${awards} class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value = ${dollors} class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value = ${metaScore} class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value = ${imdbRating} class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value = ${imdbVotes} class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
}
