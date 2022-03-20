// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { run } from "hardhat";

const richardAddress = "0x1155bfc5270ea845990ABc1F941851603486fa7a";
const lucasAddress = "0xFf6B4F53f8655Db04d46a08dAEBB6277243aCD29";
const ipfs = [
  "ipfs://QmefQCqppvDHV493UL4BJcYQLaQB95svrqoEmkbXaT88vy", //Cantagalo 2022
  "ipfs://QmSAUijdrmNL8AcV7P5Doxef2STtsoMyJix4deDxLGwpPC", //Cantagalo 2022 Verão
  "ipfs://QmdFyFJAvDKxdwqEB5dd639vh8whtgKisauAou1b7Acwop", //Cantagalo 2022 Outono
  "ipfs://QmS4H8uBtikXz6v1EVdStiiFJ5C1751G8XKV3enW9Vy1zn", //Cantagalo 2022 Primavera
  "ipfs://QmWyHYudT7ZwSV558R2Rer3NonJzPpPtexf9bMpAE9vxCf", //Cantagalo 2022 Inverno
  "ipfs://QmRbbP2BdJbQoNEJK4pwVpA5adRnRdk8hg8ioD5VqYgN21", //PAVÃO PAVÃOZINHO VERÃO
  "ipfs://QmTcPJk1QqBsTPvRUvZWH9nJTGm7EpxECyT3yGm7qqZnGX", //Pavão Pavãozinho Primavera
  "ipfs://QmPTczGRCDDrrXMhzmHrLW5tZy2yMs2EDBtT7MKgt9zstz", //Pavão Pavãozinho Outono
  "ipfs://QmYJ71Eck4Df2iFZsuhjmtsRP6F1tVimYsgf4wBhoCeTPz", //Pavão Pavãozinho Inverno
  "ipfs://QmXuHwS9wAqSyDKkLG4n5CPLr2cRjMHGck5F9xNno5DLMZ", //PAVÃO PAVÃOZINHO
  // "ipfs://",
];
async function main() {
  const nftContract = await ethers.getContractFactory("FavelaGO");
  const nftDeploy = await nftContract.deploy();

  const deployerAddress = (await ethers.getSigners())[0].address;
  await nftDeploy.deployed();

  console.log("nft deployed to:", nftDeploy.address);

  await run("verify:verify", {
    address: nftDeploy.address,
  });

  for (let index = 0; index < ipfs.length; index++) {
    await nftDeploy.AddItem(ipfs[index], true);
    await delay(1000);
  }

  for (let index = 0; index < ipfs.length; index++) {
    await nftDeploy.safeMint(richardAddress, 0);
    await delay(1000);
    await nftDeploy.grantRole(await nftDeploy.MINTER_ROLE(), richardAddress);
    await delay(1000);
    await nftDeploy.safeMint(lucasAddress, index);
    await delay(1000);
    await nftDeploy.safeMint(deployerAddress, index);
    await delay(1000);
  }
  console.log("finished");
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
