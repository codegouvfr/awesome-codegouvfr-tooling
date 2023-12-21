# Awesome codegouvfr: the tooling API

This repository aims to provide tools (via an API) for helping Awesome CodeGouvFr projects, for instance for generating a first draft of their `publiccode.yml` file.

## Quickstart

```
npm install
npm start
```

### Generate `publiccode.yml`

Generate a `publiccode.yml` file for a project given its github repository url, with automatic completion of certain fields from [ecosyste.ms summary API](https://summary.ecosyste.ms/).

```
# Generate publiccode.yml for react-dsfr project
curl http://localhost:3000/publiccode?repository_url=https://github.com/codegouvfr/react-dsfr
```

# License

Code in this respository is published under the [MIT License](LICENSE).
