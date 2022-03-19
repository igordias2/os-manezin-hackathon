// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const richardAddress = "0x1155bfc5270ea845990ABc1F941851603486fa7a";
const lucasAddress = "0xFf6B4F53f8655Db04d46a08dAEBB6277243aCD29";
const ipfs = "QmXoey9YuDfJN2EQc1Z9Rz7AogEqcXcr4g56p6ZfxyPF87";

async function main() {
  const nftContract = await ethers.getContractFactory("FavelaGO");
  const nftDeploy = await nftContract.deploy();

  const deployerAddress = (await ethers.getSigners())[0].address;
  await nftDeploy.deployed();

  console.log("nft deployed to:", nftDeploy.address);

  await nftDeploy.safeMint(richardAddress, ipfs);
  await delay(3000);
  await nftDeploy.safeMint(lucasAddress, ipfs);
  await delay(3000);
  await nftDeploy.safeMint(deployerAddress, ipfs);
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
