const BASE_URL = "https://t0729.github.io/srev-replay-file/%E3%83%AA%E3%83%97%E3%83%AC%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/";
const FILE_JSON = "file.json";

function loadData() {
  const url = `${FILE_JSON}?t=${Date.now()}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("file.json 読み込み失敗");
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data.title) || !Array.isArray(data.filename)) {
        throw new Error("title または filename が配列じゃない");
      }

      const container = document.getElementById("container");
      container.innerHTML = "";

      data.filename.forEach((name, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = data.title[index] ?? "";

        card.appendChild(title);

        card.addEventListener("click", () => {
          const url = BASE_URL + encodeURIComponent(name);
          window.location.href = url;
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
    });
}

loadData();
