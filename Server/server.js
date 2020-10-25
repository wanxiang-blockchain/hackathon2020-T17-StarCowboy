import { run } from "./snarkRange";
import webWallet from "./libs/web-wallet";
import ethabi from "ethjs-abi";
import abi from "./abi";
const fs = require("fs");
const qtum = require("qtumjs-lib");
const Koa = require("koa");
const Router = require("koa-router");
const router = new Router();
const app = new Koa();

//跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*"); //访问控制允许来源：*为所有
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild"
  ); //访问控制允许报头Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); //访问控制允许方法
  ctx.set("X-Powered-By", "nodejs"); //自定义头信息，表示服务端用nodejs
  if (ctx.method == "OPTIONS") {
    ctx.body = 200; //OPTIONS类型的请求直接返回200
  } else {
    await next();
  }
});


var gasPrice = "40";
var gasLimit = "2500000";
var fee = "0.01";
var contractAddress = "6fac46fda48b05f018153c470adb4535c0517372";



router.get("/verificationUser/:address", async (ctx) => {
  var callResult = await callcontract(ctx.params.address);
  console.log(callResult);
  var returnResult = {
    username: callResult.username,
    companyname: callResult.companyname,
    location: callResult.location,
    point: callResult.point.words[0],
  };

  ctx.body = returnResult;
});


 router.get("/getAmount/:address", async (ctx) => {
  var spent = readFile();
  var chainPoint =await getPointFromChain(ctx.params.address);

  var returnResult = {
    "layer2spent": spent,
    "chainPoint": chainPoint,
  };
  ctx.body = returnResult;
});


//通道减值
 router.get("/reducePoint/:point", async (ctx) => {
  

   var result = reducePoint(
     parseInt(ctx.params.point),
     "qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj"
   )
   
  //  console.log(result);
  ctx.body = { "result": "success" };
 });


app.use(router.routes());
app.listen(3000);


  // const re = reducePoint(parseInt(10), "qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj");
  // console.log(re);



//结束通道
function sendDataToContract(){
  restoreWallet();
  const encodedData = ethabi
    .encodeMethod(abi[1], ["rickey22",10])
    .substr(2);
  return encodedData;
}

var encodedData = sendDataToContract();

//提交交易获取交易号
async function getTx() {
  var rawTx = await webWallet
    .getWallet()
    .generateSendToContractTx(
      contractAddress,
      encodedData,
      gasLimit,
      gasPrice,
      fee
    );
  const res = await webWallet.getWallet().sendRawTx(rawTx);
  console.log(res);
}

// getTx(encodedData);

//查询链信息

restoreWallet();

//调用智能合约
async function callcontract(_address) {
  const address=get16Address(_address);
  const encodeMethod = ethabi.encodeMethod(abi[3], [address]).substr(2);
  var result = await webWallet
    .getWallet()
    .callContract(contractAddress, encodeMethod);
  const setOutputBytecode = ethabi.decodeMethod(abi[3], "0x" + result);
  return setOutputBytecode;
}



//获取钱包16进制地址
function get16Address(_address) {
  const address =
    "0x" + qtum.address.fromBase58Check(_address)["hash"].toString("hex");
  return address;
}

// get16Address();

//恢复钱包
function restoreWallet() {
  const wallet = webWallet.restoreFromWif(
    "cVabax9wP5CWasK7RBGqkxLngtNGNBincnL9HBMbfbfWfGrJnLEv"
  );
}

function readFile() {
  var result;
  var data = fs.readFileSync("layer2db.txt", "utf-8").toString();
  return data.split(",")[1];
}

function writeFile(reducePoint, spentPoint) {
  var nowPoint = parseInt(reducePoint) + parseInt(spentPoint);
  console.log(nowPoint);
  fs.writeFileSync(
    "layer2db.txt",
    "qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj," + nowPoint
  );
}

//从链上获得金额
async function getPointFromChain(address) {
  var callResult = await callcontract(address);

  return callResult.point.words[0];
 
}

//通道扣款
async function reducePoint(_reducePoint, address) {

  var chainPoint = await getPointFromChain(address);
  
  var spentPoint = readFile(); 
  var nowChainPoint = chainPoint - spentPoint;
 
  run([_reducePoint, nowChainPoint], nowChainPoint).then((res) => {
 
    if (res == "Success") {
      writeFile(_reducePoint, spentPoint);

      return "OK";
    } else {
      return "Fail";
    }
    // process.exit(0);
  });
}
// reducePoint(100, "qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj");
