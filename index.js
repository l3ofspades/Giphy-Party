// look back at the <readme.md> file for some hints //
// working API key //
const form = document.getElementById("gif-form");
const input = document.getElementById("search-term");
const gifContainer = document.getElementById("gif-container");
const removeBtn = document.getElementById("remove-btn");

const giphyApiKey = "anSZQ46ujt275mDEJwFu1TGd5kr6iMDx";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim();
    input.value = "";

    if (!searchTerm) return;

    try {
        const gifData = await fetchGifs(searchTerm);

        if (gifData.length > 0) {
            const gifUrl = gifData[0].images.original.url;
            const img = document.createElement("img");
            img.src = gifUrl;
            img.alt = searchTerm;
            gifContainer.appendChild(img);
        } else {
            alert("No GIFs found for this search term.");
        }
    } catch (error) {
        console.error("Error fetching GIF:", error);
        alert("An error occurred while fetching the GIF. Please try again.");
        }

    });

async function fetchGifs(searchTerm) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(searchTerm)}&limit=10`;
    const response = await axios.get(url);
  const results = response.data.data;

  if (results.length === 0) {
    return [];
  }

  const randomIndex = Math.floor(Math.random() * results.length);
  return [results[randomIndex]];
}

removeBtn.addEventListener("click" , function() {
    gifContainer.innerHTML = ""; // Clear the GIF container
    input.value = ""; // Clear the input field
});
