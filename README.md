# SASEUL Docs

Official developer documentation for [SASEUL](https://saseul.com) — a peer-to-peer blockchain engine.

## Requirements

- Ruby ≥ 2.6
- Bundler
- Jekyll ≥ 4.3

## Development

```shell
bundle clean --force
bundle
bundle exec jekyll serve
```

Site will be available at `http://localhost:4000`.

## Build

```shell
JEKYLL_ENV=production bundle exec jekyll build
```

Static files are generated in `_site/`.

## Theme

Based on [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) by cotes2020.
