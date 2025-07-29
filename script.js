async function loadNFTs() {
  const walletAddress = document.getElementById("wallet").value.trim();
  const container = document.getElementById("nfts");
  container.innerHTML = "Loading...";

  try {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
    const metaplex = new metaplexJs.Metaplex(connection);

    const owner = new solanaWeb3.PublicKey(walletAddress);
    const allNfts = await metaplex.nfts().findAllByOwner({ owner });

    if (!allNfts.length) {
      container.innerHTML = "<p>No NFTs found.</p>";
      return;
    }

    container.innerHTML = "";

    for (const nft of allNfts) {
      try {
        const metadata = await metaplex.nfts().load({ metadata: nft });
        const name = metadata.name;
        const image = metadata.json?.image;

        const div = document.createElement("div");
        div.className = "nft";
        div.innerHTML = `<img src="${image}" alt="${name}"/><p>${name}</p>`;
        container.appendChild(div);
      } catch (e) {
        console.warn("Skipping invalid NFT", e);
      }
    }
  } catch (error) {
    console.error(error);
    container.innerHTML =  `<p>Failed to load NFTs. Check the address or try again.</p><p>teste "${owner}"</p>`;
  }
}
