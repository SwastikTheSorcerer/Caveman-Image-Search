const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");
const searchresult = document.getElementById("search-result");
const showmore = document.getElementById("show-more-button");
const accesskey = "";//Enter your Api key here

let keyword = "";
let page = 1;
let perpage = 12;

async function searchimages(){
     if (page === 1) {
        searchresult.innerHTML = "";
    }
    keyword = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=${perpage}`;

    
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    results.map((result) => {
    if (result.urls && result.urls.small && result.links && result.links.html) {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        searchresult.appendChild(imageLink);
    } else {
        console.warn("Missing expected data in result:", result);
    }
});
    showmore.style.display = "block"
}

searchform.addEventListener("submit",(e) => {
    e.preventDefault();
    page = 1;
    //searchresult.innerHTML = "";
    searchimages();
});
showmore.addEventListener("click",(e) => {
    page++; //or page =`${parseInt(page) + 1}`;
    searchimages();
});
