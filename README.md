### shortlink-api

> ShortLink is a URL shortening service.

### Brief

ShortLink is a URL shortening service where you enter a URL such as `https://indicina.co` and it returns
a short URL such as `http://short.est/GeAi9K`. Visiting the shortened URL should redirect the user to the
long URL. Using the example above, visiting `http://short.est/GeAi9K` should redirect the user to `https://indicina.co`

### Features

- `/encode`: Encode a URL to a shortened URL
- `/decode`: Decodes a shortened URL to its original URL
- `/statistic/{url_path}`: Return the basic statistics of a short URL path. Using the above link, `url_path` will be `GeAi9K`.

### Tech Stack

- Node.js
- Express
- Jest

### Evaluation Criteria

- Best Practices
- SOLID principles
- Clean Code
- Tests
