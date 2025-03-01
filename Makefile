.PHONY: all build clean serve rebuild update-metronome

# Default target
all: build

# Build the static site
build:
	go run main.go build

# Run the local server
serve:
	go run main.go

# Custom port server
serve-custom:
	go run main.go -port=8081

# Clean the docs directory
clean:
	rm -rf docs

# Rebuild (clean and build)
rebuild: clean build

# Update metronome tool
update-metronome:
	# Update metronome from external repo if available
	if [ -d "metronome" ]; then \
		cd metronome && npm install && npm run build; \
		mkdir -p music/tools/metronome/assets; \
		cp -r metronome/dist/assets/* music/tools/metronome/assets/; \
		cp -r metronome/src metronome/package.json metronome/package-lock.json metronome/vite.config.js music/tools/metronome/_source/; \
	fi
	# Build local version if no external repo
	if [ -d "music/tools/metronome/_source" ] && [ ! -d "metronome" ]; then \
		cd music/tools/metronome/_source && npm install && npm run build; \
		mkdir -p ../assets; \
		cp -r dist/assets/* ../assets/; \
	fi
	go run main.go build