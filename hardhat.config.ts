import * as dotenv from "dotenv";
import { Account, Wallet } from "@harmony-js/account";

import { Messenger, HttpProvider } from "@harmony-js/network";
import { ChainID, ChainType } from "@harmony-js/utils";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { forEach } from "underscore";

dotenv.config();

let mnemonic = process.env.mmemonic;
const mnemonicAccounts = {
  mnemonic,
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const mmemonic = process.env.mmemonic ? process.env.mmemonic : "";

  const messenger = new Messenger(
    new HttpProvider("https://api.s0.b.hmny.io"),
    ChainType.Harmony,
    ChainID.HmyTestnet
  );

  const wallet = new Wallet(messenger);
  for (let index = 0; index < 1; index++) {
    const account = await wallet.addByMnemonic(mmemonic, index);
    console.log(account);
  }
});

task("generateAccounts", "generate a mmemonic", async (taskArgs, hre) => {
  const wallet = await hre.ethers.Wallet.createRandom();
  const mmenonic = wallet._mnemonic();
  console.log(mmenonic);
});
task("balance", "check balance", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const mmemonic = process.env.mmemonic ? process.env.mmemonic : "";
  //let wallet = hre.ethers.Wallet.fromMnemonic(mmemonic);

  for (let index = 0; index < 1; index++) {
    const account = accounts[index];
    const balance = await account.getBalance();
    console.log(`${account.address} ${balance}`);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",

  networks: {
    harmony_testnet: {
      chainId: 1666700000,
      // accounts: { mnemonic: process.env.mnemonic ? process.env.mnemonic : "" },
      accounts: mnemonicAccounts,
      url: "https://api.s0.b.hmny.io",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      harmonyTest: String(process.env.harmonyApi),
    },
  },
};

export default config;
