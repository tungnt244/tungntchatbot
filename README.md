# tungntchatbot

## Cấu trúc thư mục
- `config/`: chứa các biến môi trường dùng chung cho cả project. Các biến này được mô tả trong file `default.json` dưới dạng `key:value`.

  Ví dụ ta cần đọc giá trị của `pageAccessToken` thì ta có thể đạt được bằng cách gọi: `config('pageAccessToken')`; trong đó `config` thực chất là một thư viện giúp đọc file `config/default.json` - sẽ giới thiệu về thư viện trong mục `node_modules` dưới đây.
  
- `node_modules/`: là folder chứa các thư viện (libs/dependencies) hỗ trợ nodejs. Các thư viện được quản lý bởi `npm` ([node package management](https://www.npmjs.com/)).
  
  npm hỗ trợ việc cài đặt, gỡ và quản lý các thư viện mà ta cần sử dụng trong project. Các mô tả về project đều nằm trong file `package.json` mà ta có thể tạo ra bằng lệnh `npm init` từ Terminal (hoặc có thể tạo tay).
  
  `package.json` cũng ở dạng json (key:value). Các thư viện nodejs được khai báo trong `dependencies` của file này. Dưới đây là một ví dụ:
  ```json
  // package.json
  {
    "name": "messenger-get-started", 
    "version": "1.0.0", 
    "description": "Get started example for Messenger Platform",
    "main": "app.js",
    "scripts": {
      "start": "node app.js",
      "lint": "jshint --exclude node_modules .",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/fbsamples/messenger-platform-samples.git"
    },
    "author": "Facebook",
    "license": "ISC",
    "dependencies": {
      "body-parser": "^1.15.0",
      "config": "^1.20.4",
      "ejs": "^2.4.2",
      "express": "^4.13.4",
      "request": "^2.72.0"
    },
    "engines": {
      "node": "~4.1.2"
    }
  }
  ```
- `public/`: chứa các content static để gửi đi (ảnh, video, audio, html files...)

- `views/`: views engine phục vụ xem trên trình duyệt. Không cần quan tâm file này.

- `app.js`: file chính của cả chương trình. Trong code mẫu của facebook, họ để chung code ở mỗi một file này, còn khi chúng ta làm product thật thì hiển nhiên phải cấu trúc lại thư mục, không thể để code ở chung một file được.

- `package.json`: như đã giới thiệu, là file mô tả project (tựa như pom.xml của maven). File này được đọc và ghi bởi `npm`
## Microsoft BotBuilder
- Download và cài đặt Microsoft Botbuilder tại đây https://docs.botframework.com/en-us/node/builder/guides/core-concepts/#navtitle.
## Chạy thử bot
- Bước 1: Clone mã nguồn từ repo này về `git clone https://github.com/tungnt244/tungntchatbot`

- Bước 2: Download và cài đặt Nodejs [tại đây](https://nodejs.org/en/download/). 

- Bước 3: Đăng kí một con bot tại https://dev.botframework.com/bots/new. Chú ý phải điền vào phần "Messaging endpoint" trong mục configuration (Đây là HTTPS Rest endpoint mà bot sẽ nhận và gửi tin nhắn đi). Chú ý chép lại Microsoft App Id và Microsoft App Password để sử dụng về sau.

- Bước 4: Thay đổi app password và app id ở trong phần code (ở đây mình điền thẳng app password và app id vào để cho nhanh với mục đích demo, khi code chúng ta nên để 2 biến này ở trong file config)
 
- Bước 5: Deploy app lên một nơi tùy ý sao cho từ thế giới internet bên ngoài có thể truy cập tới và BẮT BUỘC phải thông qua giao thức HTTPS (có thể deploy lên heroku, azure,...).
  
- Bước 6: Add facebook vào channels để có thể chat với bot. (Làm theo hướng dẫn có ghi sau khi bấm add channels Facebook).

- Bước 7: Vào chat với page đã subscribe để test thử bot. 

  Bot chưa được public nên chỉ có admin chat là bot sẽ nhận request để trả lời. Tính năng mặc định của bot là hỏi tên của mọi người sau đó nói "hello tới mọi người" và gửi một loạt ảnh, card và receipt tới user.

