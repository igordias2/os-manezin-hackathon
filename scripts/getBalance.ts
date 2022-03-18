import { ethers } from "hardhat";

const mmemonic = String(process.env.mmemonic);

async function main() {
  const wallet = ethers.Wallet.fromMnemonic(mmemonic);
  wallet.connect();

  console.log(balance);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
