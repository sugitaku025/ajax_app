function check() {
  // サーバーサイドへリクエストを送るための処理(2~23行)
  // cssのセレクタに合致するhtmlを取得
  const posts = document.querySelectorAll(".post");
  // 一つずつの要素に対して繰り返しクリック時の処理を与える
  posts.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // クリックした際に作動するイベントを設定
    post.addEventListener("click", () => {
      // htmlで設定したメモidを取得する
      const postId = post.getAttribute("data-id");
      // XMLHttpRequestでエンドポイントを呼び出す
      const XHR = new XMLHttpRequest();
      // サーバーへ送るリクエストを設定(第一 => HTTPメソッド 第二 => パス指定 第三 => 非同期通信ON/OFF)
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式を指定する(jsonで返して)
      XHR.responseType = "json";
      // リクエストを送信する
      XHR.send();
      // コントローラーから返されたレスポンスを取得する(24~40行目)
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        // item(json)はXHR.response.postで取得
        const item = XHR.response.post;
          // レスポンスが「既読にしますよ~」という返事がtrueならば
        if (item.checked === true) {
          // データチェックをtrue(既読状態)で返す(htmlのdata-checkをtrueにする)
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 既読状態を解除する(htmlのdata-checkを属性ごと削除)
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
