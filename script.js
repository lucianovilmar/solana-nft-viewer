const API_KEY = "4803b13b-13a1-4b1d-a845-d74d77c4368b"; // Replace with your API key

async function loadNFTs() {
  const wallet = document.getElementById("wallet").value;
  const container = document.getElementById("nft-container");
  container.innerHTML = "Loading...";

  const res = await fetch(`https://api.helius.xyz/v0/addresses/${wallet}/nfts?api-key=${API_KEY}`);
  const data = await res.json();

  container.innerHTML = "teste";
  data.forEach(nft => {
    const img = document.createElement("img");
    img.src = nft.content?.links?.image || "";
    img.alt = nft.content?.metadata?.name || "Unnamed NFT";
    img.style.width = "200px";
    img.style.margin = "10px";
    container.appendChild(img);
  });
}
