import * as fs from "fs";
import prettier from "prettier";


const ABI_DIR = "../smart-contracts/out/RepTokensInstance.sol/RepTokensInstance.json";

function loadAbiFromDirectory(abiDir: string) {
    if (!fs.existsSync(abiDir)) {
        throw Error("Please generate contract ABIs before attempting migration!");
    }

    const { abi } = JSON.parse(
        fs.readFileSync(abiDir).toString(),
    );

    return abi;
}

async function main() {

    let chainId = process.argv[2];
    let chainName = process.argv[2];

    const abi = loadAbiFromDirectory(ABI_DIR);

    const TRANSACTIONS_PATH = `../smart-contracts/broadcast/DeployRepTokensInstanceWithData.s.sol/${chainId}/run-latest.json`;
    if (!fs.existsSync(TRANSACTIONS_PATH)) {
        throw Error(`Please make deployments to ${chainId} before attempting migration!`);
    }

    const broadcastString = fs.readFileSync(TRANSACTIONS_PATH, { encoding: 'utf8' });
    const broadcast = JSON.parse(broadcastString);

    const contracts = {} as any;

    for (let i = 0; i < broadcast.transactions.length; i++) {
        if (broadcast.transactions[i].transactionType == "CREATE") {

            contracts[broadcast.transactions[i].contractName] = {};
            contracts[broadcast.transactions[i].contractName].address = broadcast.transactions[i].contractAddress;
            contracts[broadcast.transactions[i].contractName].abi = abi;
        }
    }

    const output = {} as Record<string, any>;

    let name;

    const names = {
        "31337": "localhost",
        "11155111": "sepolia"
    } as any;

    output[chainId] = [
        {
            chainId,
            name: names[chainId],
            contracts
        }
    ];

    const fileContent = Object.entries(output).reduce((content, [chainId, chainConfig]) => {
        return `${content}${parseInt(chainId).toFixed(0)}:${JSON.stringify(chainConfig, null, 2)},`;
    }, "");

    const TARGET_DIR = "../nextjs/generated/";
    const TARGET_FILE_NAME = "deployedContracts.ts";

    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR);
    }

    fs.writeFileSync(
        `${TARGET_DIR + TARGET_FILE_NAME}`,
        prettier.format(`const contracts = {${fileContent}} as const; \n\n export default contracts`, {
            parser: "typescript",
        }),
    );

    console.log("Succesfully migrated deployments!");
}

main();
