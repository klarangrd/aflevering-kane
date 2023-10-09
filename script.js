// globale variabler til at gemme albums(json) og tabelreferencer 
let albums = []; //indeholder en liste over albumData da det er en tom array
const albumTable = document.getElementById('albumTable');
const genres = document.getElementById('genres');
const tableBody = document.getElementById('tableBody');
const filterButton = document.getElementById('filterButton'); // linje 3-6 søger efter html elementerne table, select, tbody og button

// en asynkron function til at indhente json filen
fetch('albums.json')
    .then(response => response.json())
    .then(data => {
        // tilføjer genre-property
        albums = data.map(album => {
            album.genre = album.genre || 'Ukendt';
            return album;
        });
        // Alfabetisk sortering af albumnavnene
        albums.sort(function(a, b) {
            const albumNameA = a.albumName;
            const albumNameB = b.albumName;

            if (albumNameA < albumNameB) {
                return -1; // a skal være før b
            }
            if (albumNameA > albumNameB) {
                return 1; // a skal være efter b
            }
            return 0; // a og b er ens
        });


        //function der gør at visningen af albums opdateres
        function updateAlbumsView() {
            const selectedGenre = genres.value; //indeholder den valgte genre, som man har valgt fra dropdown-menuen
            const filteredAlbums = albums.filter( 
                album => selectedGenre === 'All' || album.genre === selectedGenre
            );

            
            /*hvis det evt skulle gøres med en if-else-funktion i stedet

            let filteredAlbums;
            if (selectedGenre === 'All') {
                filteredAlbums = albums;
            } else {
                filteredAlbums = albums.filter(album => album.genre === selectedGenre);
            } 
            */

            tableBody.innerHTML = ''; // al indhold i <tbody> med id'en 'tableBody'  fjernes

            // hvad vi gerne vil have vist inde i vores tabel fra html aka album, artist og genre
            filteredAlbums.forEach(album => {
                const row = tableBody.insertRow();

                const albumCell = row.insertCell(0);
                albumCell.textContent = album.albumName;

                const artistCell = row.insertCell(1);
                artistCell.textContent = album.artistName;

                const genreCell = row.insertCell(2);
                genreCell.textContent = album.genre;
            });
        }

        //hente data, filtrere og opdatere visningen i din musikarkivapplikation
        updateAlbumsView();
        filterButton.addEventListener('click', updateAlbumsView); //klik på knappen  = funktionen updateAlbumsView()  skal køres for at opdatere 
    })
    .catch(error => { //fejl opstår = udførelse af koden inde i bloken of udskriver en fejlmeddelelse 
        console.error('Fejl ved hentning af data:', error);
    });