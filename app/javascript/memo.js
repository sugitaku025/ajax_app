function memo() {
  const submit = document.getElementById("submit");
  // クリックした際に作動するイベントを設定
  submit.addEventListener("click", (e) => {
    // 投稿フォームに入力された情報を取得(getElementByIdでhtmlのform idの情報を取得)
    const formData = new FormData(document.getElementById("form"));
    // XMLHttpRequestでエンドポイントを呼び出す
    const XHR = new XMLHttpRequest();
    // サーバーへ送るリクエストを設定(第一 => HTTPメソッド 第二 => パス指定 第三 => 非同期通信ON/OFF)
    XHR.open("POST", "/posts", true);
    // レスポンスの形式を指定する(jsonで返して)
    XHR.responseType = "json";
    // フォームデータを送信する
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);