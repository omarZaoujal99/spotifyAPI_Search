// the divs which will be shown 
const artistdiv = document.getElementById("artistdiv");
const albumdiv = document.getElementById("albumdiv");
const tracksdiv = document.getElementById("tracksdiv");
// tags that will be store by the receiving data
// artist
const artistPic = document.querySelector(".artistPic");
const tblArtist = document.querySelector(".tblArtist");
const artistName = document.getElementById("artistName");
const artistGenre = document.getElementById("artistGenre");
const artistUrl = document.getElementById("artistUrl");
const divArtistsIfNull = document.querySelector(".divArtistsIfNull");
// album
const tblAlbums = document.querySelector(".tblAlbums")
// track
const tblTracks = document.querySelector(".tblTracks");

// getting the data from the API
axios({
    url: "/results",
    method: "get",
})
.then((res)=>{
    // show only the types which the user choosed
    let types = Object.keys(res.data);

    // artist infos
    let showArtist = ()=>{
        if(res.data.artists.total < 1){
            artistdiv.style.display = "none";
            divArtistsIfNull.style.display = "inline-block"
        }
        else{
            artistPic.setAttribute("src",res.data.artists.items[0].images[0].url);
            artistName.innerHTML = res.data.artists.items[0].name;
            artistGenre.innerHTML = res.data.artists.items[0].genres.join(", ");
            artistUrl.innerHTML = `<a target="_blank" style="color:rgb(240,240,240)" href="
            ${res.data.artists.items[0].external_urls.spotify}">${res.data.artists.items[0].external_urls.spotify}</a>`;
        }
    }
    // albums infos
    let showAlbums = ()=>{
        let countLengthOfAlbums = Object.keys(res.data.albums.items).length;
        for(let i = 0; i < countLengthOfAlbums; i++){
            tblAlbums.innerHTML += '<tr>'+
                `<td><img src="${res.data.albums.items[i].images[0].url}" alt="album pic" class="albumPic"></td>`+
                        `<td>${res.data.albums.items[i].name}</td>`+
                        `<td><a href="${res.data.albums.items[i].external_urls.spotify}"><button class="btnListen">Listen</button></a></td>`+
                        `<td>res.data.albums.items[0].release_date</td>`+
            '</tr><br>';
        }
    }

    // tracks infos
    let showTracks = ()=>{
        let countLengthOfTracks = Object.keys(res.data.tracks.items).length;
        for(let i = 0; i < countLengthOfTracks; i++){
            tblTracks.innerHTML += '<tr>'+
                `<td><img src="${res.data.tracks.items[i].album.images[0].url}" alt="album pic" class="albumPic"></td>`+
                `<td>${res.data.tracks.items[i].name}</td>`+
                `<td><a target="_blank" href="${res.data.tracks.items[i].external_urls.spotify}"><button class="btnListen">Listen</button></a></td>`+
            '</tr><br>';
        }
    }

    // hide a type if the user didn't choosed
    types.find(v => v == "artists") ? showArtist() : artistdiv.style.display = "none";
    types.find(v => v == "albums") ? showAlbums() : albumdiv.style.display = "none";
    types.find(v => v == "tracks") ? showTracks() : tracksdiv.style.display = "none";


})
.catch((err)=>console.log(err));
