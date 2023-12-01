const axios = require("axios");
const { DateTime } = require("luxon");
const YAML = require("yaml");

const ECOSYSTEM_URL = "https://summary.ecosyste.ms/api/v1/projects/lookup";

const getAwesomeScore = publiccodeJson => {
    const hasContributingFile = publiccodeJson.metadataFiles.contributing ? 1 : 0;
    const hasChangelogFile = publiccodeJson.metadataFiles.changelog ? 1 : 0;
    const hasCodeOfConductFile = publiccodeJson.metadataFiles.codeOfConduct ? 1 : 0;
    const hasGovernanceFile = publiccodeJson.metadataFiles.governance ? 1 : 0;
    // const hasRoadmapFile = publiccodeJson.metadataFiles.roadmap ? 1 : 0; TODO
    const hasRoadmapFile = 1;
    const latestCommitIsLessThan6Months = DateTime.fromISO(publiccodeJson.latestCommitDate) > DateTime.now().minus({ month: 6 }) ? 1 : 0;
    // const latestReleaseIsLessThan6Months = DateTime.fromISO(publiccodeJson.latestRelease.date) > DateTime.now().minus({ month: 6 }) ? 1 : 0; TODO
    const latestReleaseIsLessThan6Months = 1;
    // const hasAuthorsFile = publiccodeJson.metadataFiles.authors ? 1 : 0; TODO
    // const distinctAuthorsCountIsMoreThan1 = publiccodeJson.authors.distinctAuthorsCount > 1;
    // const distinctOrganisationsCountIsMoreThan1 = publiccodeJson.authors.distinctOrganizationsCount > 1;
    const hasAuthors = 1;
    const packaging = publiccodeJson.packages.length > 0 ? 1 : 0;
    const hasLandingUrl = publiccodeJson.landingURL ? 1 : 0;
    return hasContributingFile
        + hasChangelogFile
        + hasCodeOfConductFile
        + hasGovernanceFile
        + hasRoadmapFile
        + latestCommitIsLessThan6Months
        + latestReleaseIsLessThan6Months
        + hasAuthors
        + packaging
        + hasLandingUrl;
}

const ecosystemToPubliccodeMapping = ecosystem => {
    return {
        publiccodeYmlVersion: "0.2",

        name: ecosystem.repository.full_name,
        url: ecosystem.url,
        landingURL: ecosystem.repository.homepage,
        creationDate: DateTime.fromISO(ecosystem.repository.created_at).toISODate(),
        latestRelease: { // TODO
            date: "",
            version: ""
        },
        latestCommitDate: DateTime.fromISO(ecosystem.repository.pushed_at).toISODate(),
        latestTestedInstallationDate: "",
        logo: ecosystem.repository.icon_url,

        usedBy: [],

        fundedBy: [],

        // roadmap: ecosystem.repository.metadata.files?.roadmap, TODO
        roadmap: "",

        softwareType: "",
        packages: ecosystem.packages.map(package => {
            return {
                systemName: package.ecosystem,
                url: package.registry_url
            }
        }),

        description: {
            en: {
                shortDescription: ecosystem.repository.description,
                documentation: ""
            }
        },

        legal: {
            license: ecosystem.repository.license,
            //authorsFile: "ecosystem.repository.metadata.files?.authors" // TODO
            authorsFile: ""
        },

        authors: {
            distinctAuthorsCount: 0,
            distinctOrganizationsCount: 0
        },

        maintenance: {
            type: "community",
            contacts: [{
                name: "",
                email: ""
            }]
        },

        metadataFiles: {
            readme: ecosystem.repository.metadata.files?.readme,
            license: ecosystem.repository.metadata.files?.license,
            contributing: ecosystem.repository.metadata.files?.contributing,
            changelog: ecosystem.repository.metadata.files?.changelog,
            codeOfConduct: ecosystem.repository.metadata.files?.code_of_conduct,
            governance: ecosystem.repository.metadata.files?.governance
        },

        lastUpdated: DateTime.now().toISODate()
    };
}

const ecosystemToPubliccode = async repositoryUrl => {
    const response = await axios.get(ECOSYSTEM_URL, {
        params: {
            url: repositoryUrl
        }
    });
    const ecosystem = response.data;
    const publiccodeJson = ecosystemToPubliccodeMapping(ecosystem);
    publiccodeJson.awesomeShield = `https://img.shields.io/badge/awesome-codegouvfr_${getAwesomeScore(publiccodeJson)}/10-blue`;
    const publiccodeYaml = YAML.stringify(publiccodeJson);
    console.debug(publiccodeYaml);
    return publiccodeYaml;
}

module.exports = {
    ecosystemToPubliccode
}
