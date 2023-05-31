const shearchText = document.getElementById('shearchText')
const submitBtn = document.getElementById('submitBtn')  
const displayList = document.getElementById('displayList')  
const moviePosters = document.getElementsByClassName('moviePoster')

submitBtn.addEventListener('click', async function(){
    searchMovies()
})

// 案enter送出
shearchText.addEventListener('keyup', async function(event){
    if(event.keyCode === 13){
        searchMovies();
    }
})

// 搜尋函式
async function searchMovies(){
    displayList.innerText = ''
    const textValue = shearchText.value

    try{
       const response = await fetch(`https://www.omdbapi.com/?apikey=4f4e8462&s=${textValue}`)
       const jsonData = await response.json()

       if(jsonData.Response == "True"){

    // 搜尋結果    
            for(let i = 0; i < jsonData.Search.length; i++){
                displayList.innerHTML += `
                    <div class="movieCard center">
                        <a href="#" class="moviePoster">
                            <div class="img">
                                <img src="${jsonData.Search[i].Poster}"> 
                            </div>
                        </a>
                        <div class="introduction">
                            <div class="title center">
                                <h2>${jsonData.Search[i].Title}</h2>                        
                            </div>
                            <p><b>Year : </b> ${jsonData.Search[i].Year}</p>
                            <p><b>Type : </b> ${jsonData.Search[i].Type}</p>
                        </div>
                    </div>`
            }

            
    // 電影細節
            // const moviePosters = document.getElementsByClassName('moviePoster')
            for(let i = 0; i < moviePosters.length; i++){
                moviePosters[i].addEventListener('click', async function(){
                    displayList.innerText = ''
                    
                    try{
                        const responseDetail = await fetch(`https://www.omdbapi.com/?apikey=4f4e8462&i=${jsonData.Search[i].imdbID}&plot=full`)
                        const jsonDataDetail = await responseDetail.json()
                        displayList.innerHTML = `
                        <div class="movieDetail center">
                            <div class="img center">
                                <img src="${jsonDataDetail.Poster}">     
                            </div>
                            <div class="introduction">
                                <div class="center title">
                                    <h2>${jsonDataDetail.Title}</h2>                        
                                </div>
            
                                <p><b>imdbRating : </b>${jsonDataDetail.imdbRating}</p>
                                <p><b>Released : </b>${jsonDataDetail.Released}</p>
                                <p><b>Runtime : </b>${jsonDataDetail.Runtime}</p>       
                                <p><b>Actors : </b>${jsonDataDetail.Actors}</p>
                                <p><b>Writer : </b>${jsonDataDetail.Writer}</p>
                                <p><b>Plot :</b>${jsonDataDetail.Plot}</p>
                            </div>
                        </div>`

                    }catch (error) {
                        console.log(error);
                    }
                })
       
            }     
        }else{

    // 搜尋失敗
            displayList.innerHTML += `            
            <div class="errorCard center">
                <h1>Error ! ! !</h1>
                <p><b>result</b> : ${jsonData.Error}</p>
            </div>`
        }
    }
    catch (error) {
        console.log(error);
    }
}
