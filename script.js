// Globale variabler til at gemme musikdata og tabelreferencer
let albums = [];
const albumTable = document.getElementById('albumTable');
const genres = document.getElementById('genres');
const tableBody = document.getElementById('tableBody');
const filterButton = document.getElementById('filterButton');

// Læs JSON-filen og vis data
fetch('albums.json')
    .then(response => response.json())
    .then(data => {
        // Tilføj genre-property
        albums = data.map(album => {
            album.genre = album.genre || 'Ukendt';
            return album;
        });

        // Funktion til at opdatere visningen af album
        function updateAlbumsView() {
            const selectedGenre = genres.value;
            const filteredAlbums = albums.filter(
                album => selectedGenre === 'All' || album.genre === selectedGenre
            );

            tableBody.innerHTML = ''; // Ryd container

            // Vis hvert album i tabellen
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

        // Opdater visning ved start og ved filtrering
        updateAlbumsView();
        filterButton.addEventListener('click', updateAlbumsView);
    })
    .catch(error => {
        console.error('Fejl ved hentning af data:', error);
    });
