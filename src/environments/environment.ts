/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyA9-Hst7Lwh0042wH9Diux5-y4KZKYZ9Ks",
    authDomain: "dirceturcuscoapp.firebaseapp.com",
    databaseURL: "https://dirceturcuscoapp.firebaseio.com",
    projectId: "dirceturcuscoapp",
    storageBucket: "dirceturcuscoapp.appspot.com",
    messagingSenderId: "22208929829",
    appId: "1:22208929829:web:6458a99980863c7b8c9fcc",
    measurementId: "G-C697355QSN"
  },
  algolia: {
    appId: 'PVF9B2B1IR',
    apiKey: '7f1666a6ca8a70ceca65b83b097dccb6',
    indexName: 'dircetur',
    urlSync: false
  }
};
