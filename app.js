var http = require("http");

var app = http.createServer(function (request, response) {
  const URL = request.url; // 요청한 URL
  response.writeHead(200);
  response.end("Hello World"); // 이 부분이 웹사이트를 만드는 부분
});
app.listen(8080); // port 번호
