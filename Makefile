.PHONY: all build clean serve rebuild update-metronome pull-metronome

# Default target
all: build

# Build the static site
build:
	go run main.go build
	cp ./site/tone.html ./docs/tone.html

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

# Update metronome tool from GitHub upstream repo
update-metronome:
	# Check if metronome directory exists
	if [ -d "metronome" ]; then \
		echo "Building metronome from the local copy..."; \
		cd metronome && npm install && npm run build; \
		mkdir -p ../music/tools/metronome/assets; \
		cp -r dist/assets/* ../music/tools/metronome/assets/; \
		mkdir -p ../music/tools/metronome/_source; \
		cp -r src package.json package-lock.json vite.config.js ../music/tools/metronome/_source/; \
		# Update paths in index.md for GitHub Pages compatibility \
		sed -i 's|src="/music/tools/metronome/assets/|src="assets/|g' ../music/tools/metronome/index.md; \
		sed -i 's|href="/music/tools/"|href="../"|g' ../music/tools/metronome/index.md; \
	fi
	# Build local version if no external repo
	if [ -d "music/tools/metronome/_source" ] && [ ! -d "metronome" ]; then \
		echo "Building metronome from the backup source..."; \
		cd music/tools/metronome/_source && npm install && npm run build; \
		mkdir -p ../assets; \
		cp -r dist/assets/* ../assets/; \
		# Update paths in index.md for GitHub Pages compatibility \
		sed -i 's|src="/music/tools/metronome/assets/|src="assets/|g' ../index.md; \
		sed -i 's|href="/music/tools/"|href="../"|g' ../index.md; \
	fi
	# Run the site build
	go run main.go build

# Pull latest metronome from GitHub and update
pull-metronome:
	# If metronome directory exists
	if [ -d "metronome" ]; then \
		if [ -d "metronome/.git" ]; then \
			echo "Pulling latest metronome from GitHub..."; \
			cd metronome && git pull origin main; \
		else \
			echo "Metronome directory exists but is not a git repo. Backing up and re-cloning..."; \
			mv metronome metronome_backup_$(shell date +%Y%m%d_%H%M%S); \
			git clone git@github.com:taniwha3/metronome.git; \
		fi \
	else \
		echo "Cloning metronome repository..."; \
		git clone git@github.com:taniwha3/metronome.git; \
	fi
	# Run the update after pulling
	$(MAKE) update-metronome

# Update subnets app
update-subnets:
	@echo "Building subnets app..."
	cd subnets && npm install && npm run build
	@echo "Copying built files to docs/subnets..."
	mkdir -p docs/subnets
	cp -r subnets/dist/* docs/subnets/
	@echo "Subnets deployment complete!"