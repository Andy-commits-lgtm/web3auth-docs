const path = require("path");
require('dotenv').config()
const githubOrg = "web3auth";
const githubRepo = "web3auth-docs";
const githubOrgUrl = `https://github.com/${githubOrg}`;
const githubRepoUrl = `${githubOrgUrl}/${githubRepo}`;
const githubDiscussionsUrl = `${githubOrgUrl}/${githubOrg}/discussions`;
const githubEditUrl = `${githubRepoUrl}/edit/master`;
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");
const fs = require('fs');

const resourcesDropdown = fs.readFileSync('./src/components/navDropdown/resources.html', 'utf-8');
const helpDropdown = fs.readFileSync('./src/components/navDropdown/help.html', 'utf-8');
const sdkDropdown = fs.readFileSync('./src/components/navDropdown/sdk.html', 'utf-8');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: "Documentation",
  tagline: "Flexible, Universal Key Management", // TODO: Confirm with content team
  url: "https://web3auth.io",
  baseUrl: process.env.REACT_APP_BASE_URL || "/docs/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  onDuplicateRoutes: "warn",
  favicon: "images/favicon.ico",
  organizationName: githubOrg,
  projectName: githubRepo,
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    announcementBar: {
      id: 'join_community',
      content:
        '<a href="https://community.web3auth.io" target="_blank">Get the support you need to seamlessly integrate with Web3Auth. Join our community today!</a>',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ["groovy", "java", "kotlin", "swift", "dart", "csharp"],
    },
    navbar: {
      title: "Documentation",
      logo: {
        alt: "Web3Auth's Logo",
        src: "images/documentation-logo.svg",
        srcDark: "images/documentation-logo-dark.svg",
        target: "_self",
      },
      items: [
        {
          label: 'SDKs',
          type: 'dropdown',
          to: "/sdk",
          position: "left",
          items: [
            {
              type: 'html',
              value: sdkDropdown,
            },
          ],
        },
        {
          label: 'Resources',
          type: 'dropdown',
          position: "left",
          items: [
            {
              type: 'html',
              value: resourcesDropdown,
            },
          ],
        },
        {
          label: "Integration Builder",
          to: "/integration-builder",
          position: "left",
        },
        {
          label: "Content Hub",
          activeBasePath: "/content-hub",
          to: "/content-hub",
          position: "left",
        },
        {
          label: 'Help',
          type: 'dropdown',
          position: "left",
          items: [
            {
              type: 'html',
              value: helpDropdown,
            },
          ],
        },
        {
          position: "right",
          href: githubOrgUrl,
          className: "navbar-github-link",
          "aria-label": "GitHub Organization",
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "html",
          position: "right",
          value:
            '<a href="https://dashboard.web3auth.io/" target="_blank" class="navbar-button"><strong class="navbar-button-text">Developer Dashboard</strong></a>',
        },
        {
          type: "html",
          position: "right",
          value: "<div></div>",
        },
      ],
    },
    algolia: {
      appId: "6OF28D8CMV",
      apiKey: "425a1e860cb4b9b4ce1f7d9b117c7a81",
      indexName: "docs-web3auth",
      schedule: "every 1 day at 3:00 pm",
    },
    customFields: {
      baseUrl: process.env.REACT_APP_BASE_URL || "/docs/",
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          breadcrumbs: true,
          editUrl: githubEditUrl,
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [remarkMath, [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }]],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "GTM-ML3T5M6",
        },
        pages: {
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
      },
    ],
  ],
  plugins: [
    path.resolve(__dirname, "plugins", "docusaurus-plugin-content-hub"),
    [path.resolve(__dirname, "plugins", "docusaurus-plugin-virtual-files"), { rootDir: "files" }],
    path.resolve(__dirname, "plugins", "node-polyfills"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/examples/productionexamples",
            to: "/examples",
          },
          {
            from: "/get-started",
            to: "/quick-start",
          },
          {
            from: "/developing-with-web3auth/understand-sdk",
            to: "/quick-start",
          },
          {
            from: "/developing-with-web3auth/",
            to: "/quick-start",
          },
          {
            from: "/sdk/web/plugins/torus-wallet",
            to: "/sdk/web/plugins/evm-wallet",
          },
          {
            from: "/sdk/web/modal/wagmi-connector",
            to: "/sdk/web/wagmi-connector",
          },
          {
            from: "/sdk/web/no-modal/wagmi-connector",
            to: "/sdk/web/wagmi-connector",
          },
          {
            from: "/quickstart",
            to: "/quick-start",
          },
          {
            from: "/sdk/web/choosesdk/",
            to: "/sdk/web/",
          },
          {
            from: "/sdk/android/setting-up",
            to: "/sdk/android/",
          },
          {
            from: "/sdk/ios/setting-up",
            to: "/sdk/ios/",
          },
          {
            from: "/sdk/flutter/setting-up",
            to: "/sdk/flutter/",
          },
          {
            from: "/sdk/react-native/choose-workflows",
            to: "/sdk/react-native/",
          },
          {
            from: "/sdk/web/customauth",
            to: "/sdk/web/no-modal/custom-authentication",
          },
          {
            from: "/overview/what-is-web3auth",
            to: "/what-is-web3auth",
          },
          {
            from: "/overview/how-web3auth-works",
            to: "/how-web3auth-works",
          },
          {
            from: "/overview/web3auth-and-wallets",
            to: "/product-fit/web3auth-for-wallets",
          },
          {
            from: "/overview/web3auth-for-wallets",
            to: "/product-fit/web3auth-for-wallets",
          },
          {
            from: "/overview/web3auth-for-dapps",
            to: "/product-fit/web3auth-for-dapps",
          },
          {
            from: "/overview/user-flow",
            to: "/product-fit/user-flow",
          },
          {
            from: "/overview/key-management/",
            to: "/infrastructure/key-management",
          },
          {
            from: "/overview/key-management/technical-architecture/",
            to: "/infrastructure/technical-architecture/",
          },
          {
            from: "/overview/key-management/audits",
            to: "/infrastructure/audits",
          },
          {
            from: "/whitelabeling",
            to: "/pnp/features/whitelabel/",
          },
          {
            from: "/whitelabel/",
            to: "/pnp/features/whitelabel/",
          },
          {
            from: "/interoperability",
            to: "/pnp/features/interoperability",
          },
          {
            from: "/dapp-share",
            to: "/pnp/features/dapp-share",
          },
          {
            from: "/authenticating-users/",
            to: "/pnp/features/server-side-verification/",
          },
          {
            from: "/authenticating-users/overview",
            to: "/pnp/features/server-side-verification/",
          },
          {
            from: "/server-side-verification/",
            to: "/pnp/features/server-side-verification/",
          },
          {
            from: "/server-side-verification/social-login-users",
            to: "/pnp/features/server-side-verification/social-login-users",
          },
          {
            from: "/server-side-verification/external-wallets",
            to: "/pnp/features/server-side-verification/external-wallets",
          },
          {
            from: "/developing-with-web3auth/adapters",
            to: "/pnp/features/connect-external-wallets",
          },
          {
            from: "/connect-external-wallets",
            to: "/pnp/features/connect-external-wallets",
          },
          {
            from: "/self-host/",
            to: "/core-kit/introduction",
          },
          {
            from: "/self-hosting",
            to: "/core-kit/introduction",
          },
          {
            from: "/developer-dashboard/",
            to: "/dashboard-setup/",
          },
          {
            from: "/developer-dashboard/get-client-id",
            to: "/dashboard-setup/get-client-id",
          },
          {
            from: "/developer-dashboard/enable-interoperability",
            to: "/dashboard-setup/enable-interoperability",
          },
          {
            from: "/developer-dashboard/setup-custom-authentication",
            to: "/dashboard-setup/setup-custom-authentication",
          },
          {
            from: "/developer-dashboard/billing-and-user-stats",
            to: "/dashboard-setup/billing-and-user-stats",
          },
          {
            from: "/customauth",
            to: "/auth-provider-setup/",
          },
          {
            from: "/customauth/verifiers",
            to: "/auth-provider-setup/verifiers",
          },
          {
            from: "/sdk/tkey/initialization",
            to: "/sdk/tkey/initialize",
          },
          {
            from: "/sdk/tkey/initialisation",
            to: "/sdk/tkey/initialize",
          },
          {
            from: "/sdk/tkey/installation",
            to: "/sdk/tkey/install",
          },
          {
            from: "/sdk/web/modal/multi-factor-authentication",
            to: "/sdk/web/modal/mfa",
          },
          {
            from: "/sdk/web/core/multi-factor-authentication",
            to: "/sdk/web/no-modal/mfa",
          },
          {
            from: "/sdk/web/web3auth/multi-factor-authentication",
            to: "/sdk/web/modal/mfa",
          },
          {
            from: "/guides/one-key-flow",
            to: "/content-hub/guides/single-factor-auth",
          },
          {
            from: "/customauth/auth0",
            to: "/content-hub/guides/auth0",
          },
          {
            from: "/guides/selfhost",
            to: "/content-hub/guides/tkey",
          },
          {
            from: "/guides/",
            to: "/content-hub",
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes('/content-hub')) {
            return [
              existingPath.replace('/content-hub/guides', '/guides'),
            ];
          }
          if (existingPath.includes('/sdk')) {
            return [
              existingPath.replace('/sdk', '/api-reference'),
            ];
          }
          if (existingPath.includes('/auth-provider-setup')) {
            return [
              existingPath.replace('/auth-provider-setup', '/custom-authentication'),
            ];
          }
          if (existingPath.includes('/sdk/web/no-modal')) {
            return [
              existingPath.replace('/sdk/web/no-modal', '/sdk/web/core'),
              existingPath.replace('/sdk/web/no-modal', '/sdk/web/customloginui'),
            ];
          }
          if (existingPath.includes('/sdk/web/modal')) {
            return [
              existingPath.replace('/sdk/web/modal', '/sdk/web/web3auth'),
              existingPath.replace('/sdk/web/modal', '/sdk/web/plugnplay'),
            ];
          }
          if (existingPath.includes('/sdk/tkey')) {
            return [
              existingPath.replace('/sdk/tkey', '/sdk/self-host'),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

async function createConfig() {
  const lightTheme = (await import("./src/components/prismLight.mjs")).default;
  const darkTheme = (await import("./src/components/prismDark.mjs")).default;

  config.themeConfig.prism.theme = lightTheme;
  config.themeConfig.prism.darkTheme = darkTheme;

  return config;
}

module.exports = createConfig;
