# Awesome codegouvfr: the tooling API

This repository provides tooling for [Awesome CodeGouvFr](https://code.gouv.fr/fr/awesome/).

E.g. given a repository, it can generate a first draft of its `publiccode.yml` file.

## Quickstart

```
npm install
npm start
```

### Generate `publiccode.yml`

After you quickstarted as explained above, here is how to generate a `publiccode.yml` file given a repository URL, with automatic completion of certain fields from the [ecosyste.ms summary API](https://summary.ecosyste.ms):

```
# Generate publiccode.yml for react-dsfr project
curl http://localhost:3000/publiccode?repository_url=https://github.com/codegouvfr/react-dsfr
```

Accepted URLs are all those who return data on [summary.ecosyste.ms](https://summary.ecosyste.ms).

# License

Code in this respository is published under the [MIT License](LICENSE).
