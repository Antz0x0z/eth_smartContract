const IPFS = require("nano-ipfs-store");
const ipfs = IPFS.at("https://ipfs.infura.io:5001");
const json = require("./MyNFT.json");

(async () => {

  const doc = JSON.stringify(json);
  
  const cid = await ipfs.add(doc);

  console.log("See IPFS cid: https://", cid,".ipfs.dweb.link");
  
  console.log(await ipfs.cat(cid));

})();