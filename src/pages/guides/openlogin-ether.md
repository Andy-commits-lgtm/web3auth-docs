---
title: How to integerate Openlogin with an Ethereum dapp
image: "/contents/openlogin-ether.png"
description: Learn to use OpenLogin to integrate your app with Web3.js
order: 5
category: misc
---

import Tabs from "@theme/Tabs";

import TabItem from "@theme/TabItem";

## Introduction

This tutorial will guide you over a basic example to integerate Openlogin authentication with ethereum seamlessly.

We will create an example app where user can login,check wallet address, balance and logout.



You can find [the source code of this is example on Github](https://github.com/himanshuchawla009/openlogin-web-example).

## Let's get started with code

We will be using plain html and jquery for this example so we just need to create a single html file for this simple example app.


## Register your OpenLogin application

In order to use OpenLogin SDK, you'll need to create a project in
[Developer Dashboard](https://developer.tor.us) and get your client ID.

> App registration is not required for localhost development.

### Installing depedencies

To start with using openlogin with a ethereum dapp , you need to install Openlogin and Web3 js sdk. You can fetch SDK files which are hosted over [CDN](https://www.jsdelivr.com/package/npm/@toruslabs/openlogin) using script tags in html file.



```shell
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@toruslabs/openlogin@0"></script>
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.js"></script>
```

Openlogin and web3 libraries are also available on [npm](https://www.npmjs.com/package/@toruslabs/openlogin) and yarn.


## Initialize Openlogin sdk

Initialize the SDK after your application is mounted inside `$(document).ready` callback.

```js
$(document).ready(async function () {
  OpenLogin = window.Openlogin;
  sdkInstance = new OpenLogin.default({
    // client id can be anything for localhost
    clientId: "random_id" ,
    network: "testnet" // valid values (testnet or mainnet)
  });
  await sdkInstance.init();
  if (sdkInstance.privKey) {
    await connectWeb3()
  } else {
    $("#login").show();
  }
});
```

The code snippet given above is creating Openlogin Sdk instance  with two params ie `clientId` and `network` and it initializes it using init function. Init

- `clientId`: clientId is a public id which is used to to identify your app. You can generate your client id using getting started guide with openlogin. For localhost you can use any static random string as client id.

- `network`: network can be testnet or mainnet. For testing your dapp use testnet, for production use mainnet.

After initializing openlogin sdk, above function checks if sdk instance has private key. If private key is available then it means that user is already authenticated and it renders user account details using web3, we will cover `connectWeb3` function in next step. Good news is that openlogin sdk persist user private key even after page reload so better User Experience.

## Login user

Once the sdk is initialized , you can allow user to login. You need to call login function available on sdkInstance created in previous step.

```js
$("#login").click(async function (event) {
    if (!sdkInstance.privKey) {
        //signature  is not required for localhost
        // but it is mandatory for running for running
        // openlogin on any other domain.
        // helper functions to  generate clientId and signature
        // are given in this example (ie generateAppCreds and whitelistOrigin).
        const sig = "";
        await sdkInstance.login({
            loginProvider: "google",
            redirectUrl: `${window.origin}`,
        });
        return
    }

    await connectWeb3();
    $("#error").hide();
    $("#login").hide();
});
```

Above code snippet triggers the openlogin sdk login functionality on click of.a button.

It first checks if user is already authenticated by looking for privKey on sdkinstance. If user is not authenticated then it calls `login` function with following options:-

- `loginProvider` :- loginProvider is the authentication method which can be used for authenticating users. You can choose from a list of various login providers.

- `redirectUrl`: redirectUrl is the url of the page where user will be redirected after getting autheticated from openlogin frontend.

## Use the private key with web3.js

After calling `openlogin.login` and handling redirect result, your application will have access to the user's private key at `openlogin.privKey`. You can use this private key with web3 to generate account , to view your balance and to sign blockchain transactions.


```js
async function connectWeb3(){
    const INFURA_NODE_URL = "https://mainnet.infura.io/v3/<your-project-id>";
    const web3 = new window.Web3(
    new Web3.providers.HttpProvider(INFURA_NODE_URL)
    );
    const account = web3.eth.accounts.privateKeyToAccount(sdkInstance.privKey);
    const address = account.address;
    const balance = await web3.eth.getBalance(address);
    $("#public-address").text(`Public address: ${address} `);
    $("#private-key").text(`Private key:  ${sdkInstance.privKey} `);
    $("#account-bal").text(`Account balance: ${balance}`);
    $("#logout").show("fadein");
    $("#login").hide();
}
```

We are using infura nodes url in this example to access blockchain with web3 js. However you can use any node url. After intializing the web3 http provider, it creates a eth account using the private key available on sdk instance, retrives the account address and balance.

You can use any web3 function after this from sending ether to calling smart contract functions.

## Log out handler

In order to logout user you needs to call logout function available on sdk instance.Logout function will clears the sdk state and removes any access to private key on frontend. You can redirect user to the exit page after logout function returns.

```js
$("#logout").click(async function (event) {
    $("#text").text("Logging out....")
    $("#logout").hide();
    await sdkInstance.logout();
    window.location.reload();
});
```

### DONE!!
> You can checkout [the source code of this example on Github](https://github.com/himanshuchawla009/openlogin-web-example).
