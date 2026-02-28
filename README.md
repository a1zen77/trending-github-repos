# GitHub Trending CLI 🚀

A lightweight, cross-platform command-line tool to discover trending GitHub repositories filtered by time range (day, week, month, year). Built with Node.js for blazing fast API requests and beautiful terminal output.

[![NPM version](https://img.shields.io/npm/v/github-trending-cli.svg)](https://www.npmjs.com/package/github-trending-cli)
[![Downloads](https://img.shields.io/npm/dm/github-trending-cli.svg)](https://www.npmjs.com/package/github-trending-cli)
[![License](https://img.shields.io/npm/l/github-trending-cli.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%5E18.0.0-green.svg)](https://nodejs.org/)

## ✨ Features

- 🎨 **Beautiful colored tables** with repository stats
- 📊 **Time range filtering**: `day`, `week`, `month`, `year`
- 🔄 **Automatic retry logic** for GitHub API rate limits
- ✅ **Input validation** with smart error messages
- ⚡ **Fast & lightweight** (~5MB install size)
- 📱 **Cross-platform**: Windows, macOS, Linux
- 🚀 **Zero dependencies** on external services

## 📦 Installation

```bash
# Global install (recommended)
npm install -g github-trending-cli

# Or local install
npm install github-trending-cli
npx github-trending-cli --duration week --limit 10
```

## 🚀 Quick Start

```bash
# See trending repos from past week (default)
github-trending

# Today's trending repositories
github-trending --duration day --limit 5

# Top 20 repos from past month
github-trending -d month -l 20

# See help
github-trending --help
```

## 📊 Example Output

```
🚀 Fetching GitHub trending repos (week, limit: 5)

┌───┬──────────────────────────────┬────────────┬──────────┬────────────────────────────────────────────────────┐
│ # │ Repository                   │ Language   │ ⭐ Stars │ Description                                        │
├───┼──────────────────────────────┼────────────┼──────────┼────────────────────────────────────────────────────┤
│ 1 │ facebook/react               │ JavaScript │ 225k     │ A declarative, efficient, and flexible JavaScript  │
│   │                              │            │          │ library for building user interfaces.              │
├───┼──────────────────────────────┼────────────┼──────────┼────────────────────────────────────────────────────┤
│ 2 │ vercel/next.js               │ TypeScript │ 123k     │ The React Framework                                │
├───┼──────────────────────────────┼────────────┼──────────┼────────────────────────────────────────────────────┤
│ 3 │ microsoft/vscode             │ TypeScript │ 162k     │ Visual Studio Code - Open Source                   │
└───┴──────────────────────────────┴────────────┴──────────┴────────────────────────────────────────────────────┘

📎 URLs:
  1. https://github.com/facebook/react
  2. https://github.com/vercel/next.js
  3. https://github.com/microsoft/vscode
```

## 🎛️ Command Line Options

| Option       | Shorthand | Description                          | Default |
|--------------|-----------|--------------------------------------|---------|
| `--duration` | `-d`      | Time range: `day`, `week`, `month`, `year` | `week`  |
| `--limit`    | `-l`      | Number of repositories (1–100)       | `10`    |

## 🔧 Development

```bash
# Clone and setup
git clone <your-repo-url>
cd github-trending-cli
npm install

# Development with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Project Structure

```
github-trending-cli/
├── index.js          # Main CLI entrypoint
├── package.json      # Dependencies & scripts
├── README.md         # 📄 You're reading it!
├── .gitignore        # Node modules, etc.
└── LICENSE           # MIT License
```

## 🛠️ Tech Stack

- **Node.js** (^18.0.0)
- **Axios** — GitHub API requests
- **Commander.js** — CLI argument parsing
- **Chalk** — Terminal colors
- **Table** — Beautiful table rendering
- **Ora** — Loading spinners

## 🌟 How It Works

1. **Date Calculation** — Converts duration (e.g. `week` → 7 days ago)
2. **GitHub Search API** — `GET /search/repositories?q=created:>YYYY-MM-DD&sort=stars`
3. **Smart Sorting** — Double-checks stars descending order
4. **Beautiful Output** — Colored tables + clickable URLs
5. **Rate Limit Handling** — Automatic retries with backoff

## 🚨 Troubleshooting

| Issue                   | Solution                                                      |
|-------------------------|---------------------------------------------------------------|
| Rate limit exceeded     | Wait 1 hour or set `GITHUB_TOKEN=<token>` as an env variable |
| No repositories found   | Try a larger time range (`--duration month`)                  |
| Network error           | Check your internet connection                                |
| Invalid duration        | Use one of: `day`, `week`, `month`, `year`                    |

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is [MIT licensed](LICENSE).

## 🙌 Acknowledgments

Built with ❤️ using the Node.js ecosystem. Thanks to GitHub for the awesome API!

---

⭐ **Star this repo if you found it useful!**