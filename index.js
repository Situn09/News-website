const API_KEY= "be8d0fd4951543268245934d2512922b";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data); 
    bindData(data.articles); // api fecthing data store in articles
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML ="";

    articles.forEach((article) => {
        if (!article.urlToImage) return; // we don't clone imageless article 
        const cardClone = newsCardTemplate.content.cloneNode(true); // deep clone
        fillDataIncard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataIncard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    try {
        newsImg.src= article.urlToImage;
        newsTitle.innerHTML= article.title;
        newsDesc.innerHTML= article.content;
    } catch (error) {
        console.log(error);
    }
    

    // const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
    //     timeZone: "Asia/Jakarta",
    // });

    newsSource.innerHTML = `${article.source.name} · ${article.publishedAt}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});