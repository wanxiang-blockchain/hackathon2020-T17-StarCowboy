var abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_username",
        type: "string",
      },
      {
        name: "_companyname",
        type: "string",
      },
      {
        name: "_location",
        type: "string",
      },
      {
        name: "_point",
        type: "uint256",
      },
    ],
    name: "createUser",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_address",
        type: "address",
      },
      {
        name: "_point",
        type: "uint256",
      },
    ],
    name: "deduction",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        name: "username",
        type: "string",
      },
      {
        name: "companyname",
        type: "string",
      },
      {
        name: "location",
        type: "string",
      },
      {
        name: "point",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
export default abi;
