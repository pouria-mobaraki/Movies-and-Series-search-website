const formElem = document.querySelector('form')
const movieContainer = document.querySelector('.movie-container')
 const inputBox = document.querySelector('.input-box')
 const searchBtn = document.querySelector('.search-btn')
 const titr =document.querySelector('.titr')

// in this project I used omdb api site to fetch my data //

//http://www.omdbapi.com/?i=tt3896198&apikey=4e1bc0fd//

// function to fetch movie details by usinng omdb api//
 const getMovieInfo = async(movie)=>{ 
    movieContainer.innerHTML=''
    inputBox.value=''
    movieContainer.classList.remove('no-back-ground')
    const apiKey='4e1bc0fd'

  await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`)
.then(res=>res.json())
.then(data=>{
    //this function to show movie data//
    console.log(data.Genre)
  movieContainer.innerHTML=''
const movieElem = document.createElement('div')
movieElem.classList.add('movie-info')
movieElem.innerHTML = `
<h2>${data.Title}</h2>
<p><strong>Rating: &#11088</strong>${data.imdbRating}</p>
`
const movieGenreElem = document.createElement('div')
movieGenreElem.classList.add('movie-genre')

data.Genre.split(',').forEach(element => {
    const p = document.createElement('p')
    p.innerText=element
    movieGenreElem.appendChild(p)
});


movieElem.appendChild(movieGenreElem)

movieElem.innerHTML +=`
<p><strong>Released Date:</strong>${data.Released}</p>
<p><strong>Duration: </strong>${data.Runtime}</p>
<p><strong>Cast: </strong>${data.Actors}</p>
<p><strong>Plot: : </strong>${data.Plot}</p>
`

// creating a div for movie poster //
const moviePosterElem = document.createElement('div')
moviePosterElem.classList.add('movie-poster')
moviePosterElem.innerHTML=`<img src="${data.Poster}"/>`

movieContainer.appendChild(moviePosterElem)
movieContainer.appendChild(movieElem)
})
.catch(err=>{
    err='No movie found'
    errorMsg(err)
})

}
    
// function to err msg
const errorMsg=(msg)=>{
    movieContainer.innerHTML=`<h2>${msg}</h2>`
    movieContainer.classList.add('no-back-ground')
}

// adding event listener to search form
formElem.addEventListener('submit',(e)=>{
    e.preventDefault()
    const movieName = inputBox.value.trim()
    if(movieName!==''){
       
        getMovieInfo(movieName)
        errorMsg('Please wait...')
    }else {
        errorMsg('Enter movie name to get movie information')

    }
})