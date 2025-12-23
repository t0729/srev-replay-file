const BASE_URL = "https://t0729.github.io/srev-replay-file/%E3%83%AA%E3%83%97%E3%83%AC%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/";
const FILE_JSON = "file.json";

/**
 * タイトル整形
 * 1. YYYY_MM_DD HH_MM がある場合 → HH_MM の後のスペースで改行
 * 2. YYYY_MM_DD のみの場合      → DD の後のスペースで改行
 * 3. それ以外                   → 何もしない
 */
function formatTitle(title) {
  if (typeof title !== "string") return "";

  // YYYY_MM_DD HH_MM の後にスペースがある場合
  let match = title.match(/^(\d{4}_\d{2}_\d{2}\s+\d{2}_\d{2})\s+(.+)$/);
  if (match) {
    return `${match[1]}\n${match[2]}`;
  }

  // YYYY_MM_DD の後にスペースがある場合
  match = title.match(/^(\d{4}_\d{2}_\d{2})\s+(.+)$/);
  if (match) {
    return `${match[1]}\n${match[2]}`;
  }

  return title;
}

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

      data.filename.forEach((filename, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = formatTitle(data.title[index] ?? "");

        card.appendChild(title);

        card.addEventListener("click", () => {
          const url = BASE_URL + encodeURIComponent(filename);
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
