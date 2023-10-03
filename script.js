fetchContent("/albums.json").then((data) => {
    async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
     return json;
    }
}