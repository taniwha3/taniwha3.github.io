package main

import (
	"bytes"
	"flag"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

var (
	port = flag.Int("port", 8080, "Server port")
	dir  = flag.String("dir", ".", "Content directory")
)

func main() {
	flag.Parse()

	// Check if we're in build mode
	if len(flag.Args()) > 0 && flag.Args()[0] == "build" {
		buildStaticSite()
		return
	}

	// Set up static file server for assets
	fs := http.FileServer(http.Dir("docs/assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// Handle all other requests by serving markdown files
	http.HandleFunc("/", handleMarkdown)

	// Start the server
	addr := fmt.Sprintf(":%d", *port)
	log.Printf("Starting server at http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func handleMarkdown(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	// Default to index.md if path is /
	if path == "/" {
		path = "/index.md"
	} else if !strings.HasSuffix(path, ".md") && !strings.HasSuffix(path, ".html") {
		// Add .md extension if not present and not .html
		if strings.HasSuffix(path, "/") {
			path = path + "index.md"
		} else {
			path = path + ".md"
		}
	}

	// Convert .html requests to .md for processing
	if strings.HasSuffix(path, ".html") {
		path = strings.TrimSuffix(path, ".html") + ".md"
	}

	// Build the file path
	filePath := filepath.Join(*dir, path)

	// Read the markdown file
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
		log.Printf("Error reading file %s: %v", filePath, err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Render markdown to HTML
	html := renderMarkdown(content)

	// Wrap in HTML template
	pageHTML := wrapInHTML(path, html)

	// Set content type and send response
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(pageHTML))
}

func renderMarkdown(md []byte) []byte {
	// Create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	p := parser.NewWithExtensions(extensions)

	// Parse the markdown document
	doc := p.Parse(md)

	// Create HTML renderer with extensions
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	// Render the document
	rendered := markdown.Render(doc, renderer)
	
	// Convert .md links to .html links in the rendered HTML
	rendered = updateLinks(rendered)
	
	return rendered
}

// updateLinks converts .md links to .html links in the rendered HTML
func updateLinks(content []byte) []byte {
	// Regular expression to find markdown links
	re := regexp.MustCompile(`href="([^"]+)\.md"`)
	return re.ReplaceAll(content, []byte(`href="$1.html"`))
}

// Define a template once at the package level
var siteTemplate *template.Template

func init() {
	// Initialize the template
	const templateStr = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{.Title}}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <div class="sun"></div>
    
    <div class="navbar">
        <div class="logo">
            <div class="sun-logo"></div>
            TANI'S NOTEBOOK
        </div>
        <div class="nav-links">
            <a href="/index.html">Home</a>
            <a href="/music/index.html">Music</a>
            <a href="/tech/">Tech</a>
            <a href="/music/tools/metronome/">Metronome</a>
        </div>
    </div>
    
    <div class="container">
{{.Content}}
    </div>
    
    <script src="/assets/script.js"></script>
</body>
</html>`

	siteTemplate = template.Must(template.New("site").Parse(templateStr))
}

// PageData holds data for the HTML template
type PageData struct {
	Title   string
	Content template.HTML
}

func wrapInHTML(path string, body []byte) string {
	// Extract title from path
	title := filepath.Base(path)
	title = strings.TrimSuffix(title, ".md")

	// Create data for template
	data := PageData{
		Title:   title,
		Content: template.HTML(body), // Mark as safe HTML
	}

	// Render template to a buffer
	var buf bytes.Buffer
	if err := siteTemplate.Execute(&buf, data); err != nil {
		log.Printf("Error executing template: %v", err)
		return fmt.Sprintf("Error: %v", err)
	}

	return buf.String()
}

func buildStaticSite() {
	log.Println("Building static site...")

	// Create docs directory if it doesn't exist
	err := os.MkdirAll("docs", 0755)
	if err != nil {
		log.Fatalf("Error creating docs directory: %v", err)
	}

	// Ensure assets directory exists in docs
	err = os.MkdirAll("docs/assets", 0755)
	if err != nil {
		log.Fatalf("Error creating docs/assets directory: %v", err)
	}
	
	// Ensure tools directory exists in docs
	err = os.MkdirAll("docs/music/tools", 0755)
	if err != nil {
		log.Fatalf("Error creating docs/music/tools directory: %v", err)
	}

	// Process all markdown files
	err = filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip non-markdown files, directories, files in the docs directory, and README.md
		// Note: We now include CLAUDE.md in the build as it contains important documentation
		if info.IsDir() || !strings.HasSuffix(path, ".md") || strings.HasPrefix(path, "docs/") || path == "README.md" {
			return nil
		}

		// Read the markdown file
		content, err := ioutil.ReadFile(path)
		if err != nil {
			log.Printf("Error reading file %s: %v", path, err)
			return nil
		}

		// Check if this is a direct HTML file (starting with <!DOCTYPE html>)
		isDirectHTML := strings.HasPrefix(strings.TrimSpace(string(content)), "<!DOCTYPE html>")

		// Convert path to output path
		outPath := strings.TrimSuffix(path, ".md") + ".html"
		outPath = filepath.Join("docs", outPath)

		// Create the output directory
		outDir := filepath.Dir(outPath)
		err = os.MkdirAll(outDir, 0755)
		if err != nil {
			log.Printf("Error creating directory %s: %v", outDir, err)
			return nil
		}

		var pageHTML string
		if isDirectHTML {
			// Use the HTML content directly
			pageHTML = string(content)
		} else {
			// Render markdown to HTML
			html := renderMarkdown(content)

			// Wrap in HTML template
			pageHTML = wrapInHTML(path, html)
		}

		// Write to output file
		err = ioutil.WriteFile(outPath, []byte(pageHTML), 0644)
		if err != nil {
			log.Printf("Error writing file %s: %v", outPath, err)
			return nil
		}

		log.Printf("Built: %s", outPath)
		return nil
	})

	if err != nil {
		log.Fatalf("Error walking directory: %v", err)
	}

	// Copy assets
	copyAssets()

	log.Println("Static site build complete")
}

// copyToolsAssets copies assets from music/tools subdirectories to docs/music/tools
func copyToolsAssets() error {
	// Walk through the music/tools directory
	return filepath.Walk("music/tools", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip markdown files (they're handled by the main process)
		if !info.IsDir() && strings.HasSuffix(path, ".md") {
			return nil
		}

		// Skip directories themselves (we'll process their contents)
		if info.IsDir() {
			// But ensure the output directory exists
			outDir := filepath.Join("docs", path)
			err := os.MkdirAll(outDir, 0755)
			if err != nil {
				log.Printf("Error creating directory %s: %v", outDir, err)
			}
			return nil
		}

		// For all other files, copy them to docs
		content, err := ioutil.ReadFile(path)
		if err != nil {
			log.Printf("Error reading file %s: %v", path, err)
			return nil
		}

		// Create the output path
		outPath := filepath.Join("docs", path)

		// Create the output directory if needed
		outDir := filepath.Dir(outPath)
		err = os.MkdirAll(outDir, 0755)
		if err != nil {
			log.Printf("Error creating directory %s: %v", outDir, err)
			return nil
		}

		// Write to output file
		err = ioutil.WriteFile(outPath, content, 0644)
		if err != nil {
			log.Printf("Error writing file %s: %v", outPath, err)
			return nil
		}

		log.Printf("Copied tool asset: %s", outPath)
		return nil
	})
}

func copyAssets() {
	// Check if assets directory exists
	if _, err := os.Stat("assets"); os.IsNotExist(err) {
		// Create it if it doesn't exist
		err = os.MkdirAll("assets", 0755)
		if err != nil {
			log.Printf("Error creating assets directory: %v", err)
		}

		// Create default CSS file if it doesn't exist
		cssPath := filepath.Join("assets", "style.css")
		if _, err := os.Stat(cssPath); os.IsNotExist(err) {
			// Create style.css file with content from the docs/assets/style.css
			cssContent, err := ioutil.ReadFile("docs/assets/style.css")
			if err == nil {
				err = ioutil.WriteFile(cssPath, cssContent, 0644)
				if err != nil {
					log.Printf("Error creating style.css: %v", err)
				}
			}
		}

		// Create default JS file if it doesn't exist
		jsPath := filepath.Join("assets", "script.js")
		if _, err := os.Stat(jsPath); os.IsNotExist(err) {
			// Create script.js file with content from the docs/assets/script.js
			jsContent, err := ioutil.ReadFile("docs/assets/script.js")
			if err == nil {
				err = ioutil.WriteFile(jsPath, jsContent, 0644)
				if err != nil {
					log.Printf("Error creating script.js: %v", err)
				}
			}
		}
	}

	// Copy assets to docs/assets
	err := filepath.Walk("assets", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip directories
		if info.IsDir() {
			return nil
		}

		// Read the asset file
		content, err := ioutil.ReadFile(path)
		if err != nil {
			log.Printf("Error reading asset file %s: %v", path, err)
			return nil
		}

		// Create the output path
		relPath, err := filepath.Rel("assets", path)
		if err != nil {
			log.Printf("Error getting relative path for %s: %v", path, err)
			return nil
		}

		outPath := filepath.Join("docs/assets", relPath)

		// Create the output directory
		outDir := filepath.Dir(outPath)
		err = os.MkdirAll(outDir, 0755)
		if err != nil {
			log.Printf("Error creating directory %s: %v", outDir, err)
			return nil
		}

		// Write to output file
		err = ioutil.WriteFile(outPath, content, 0644)
		if err != nil {
			log.Printf("Error writing asset file %s: %v", outPath, err)
			return nil
		}

		return nil
	})

	if err != nil {
		log.Printf("Error copying assets: %v", err)
	}
	
	// Copy custom tools assets (like metronome)
	err = copyToolsAssets()
	if err != nil {
		log.Printf("Error copying tools assets: %v", err)
	}
}