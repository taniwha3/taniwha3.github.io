
# Music Curriculum Server

> Created on: 2025-02-27 | Last Updated: 2025-02-27




This is a simple markdown server for viewing the music curriculum.

## Usage

### Run the server:

```sh
go run main.go
```

Then open http://localhost:8080 in your browser.

### Optional flags:

- `-port`: Change the server port (default: 8080)
  ```sh
  go run main.go -port 3000
  ```

- `-dir`: Change the content directory (default: current directory)
  ```sh
  go run main.go -dir ./content
  ```

## Dependencies

This project requires the `github.com/gomarkdown/markdown` package.

Install dependencies:

```sh
go mod download
```

## Building a binary

To build an executable:

```sh
go build -o mdserver
```

Then run it:

```sh
./mdserver
```
