const searchLyrics = document.getElementById('search-lyrics');
const lyricsInput = document.getElementById('lyrics-input');
const lyricsResult = document.getElementById('search-result-show');
const lyricsShow = document.getElementById('single-lyrics-show');
const apiURL = 'https://api.lyrics.ovh';

/// adding event listener in form

searchLyrics.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = lyricsInput.value.trim();

    if (searchValue === "") {
        alert("There is nothing to search");
    }
    else {
        searchSong(searchValue);
    }
})

//search song 
function searchSong(searchValue) {
    fetch(`${apiURL}/suggest/${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            showData(data);
        });
}


//display Songs result

function showData(data) {
    lyricsResult.innerHTML = "";
    lyricsShow.innerHTML = "";

    const apiURLData = data.data;
    const displaySongsData = apiURLData.map((item) => item).slice(0, 10);

    displaySongsData.map((song) => {
        lyricsResult.innerHTML += `
    <div class="single-result d-flex align-items-center justify-content-between my-3 p-3">
    <div><img src="${song.album.cover}" alt="cover of ${song.album.title}"></div>
    <div class="col-md-7 col-sm-6 col-5">
        <h3 class="lyrics-name">${song.title}</h3> <br>
        <p class="author lead">${song.album.title} by <span>${song.artist.name}</span></p>
    </div>
    <div class="col-md-5 col-sm-6 col-7 text-md-right text-center">
        <button style="margin-right:100px;" class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </div>
    </div>
    
    </div>
    `;
    });
}

//event listener in get lyrics button
lyricsResult.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-songtitle');
        const songTitle = clickedElement.getAttribute('data-artist');

        getLyrics(artist, songTitle)
    }
})


/* Get lyrics for song*/
function getLyrics(songTitle, artist) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
            lyricsShow.innerHTML = `
                <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${songTitle} - ${artist}</h2>
                <pre class="lyric text-white">${
                !data.lyrics ? data.error : data.lyrics
                }</pre>
            `;
        });
}


