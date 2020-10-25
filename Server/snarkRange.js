const snarkjs = require("snarkjs");
const fs = require("fs");
 async function run(publicRange, inputValue) {
   //生成证明
   const { proof, publicSignals } = await snarkjs.groth16.fullProve(
     {
       publicRange: publicRange,
       inputValue: inputValue,
     },
     "circom/circuit.wasm",
     "circom/circuit_final.zkey"
   );
   //给到验证人
   const vKey = JSON.parse(fs.readFileSync("./circom/verification_key.json"));
   const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
   if (res === true) {
     //验证人验证通过，更新转账人和收款人账本支出账本
     return "Success";
   } else {
     return "Fail";
   }
 }
export {run};
