const { ApiPromise, WsProvider } = require('@polkadot/api');

const NODE_ID = '12D3KooWQhKvsVDW2SzQNzZ33rZFcWdN5gzBEJN7RNDKaceTSgNF'; // Replace with your node ID
const PROVIDER_URL = 'wss://rpc.hippius.network/chainstate'; // Replace with your node's WebSocket provider

async function checkNodeRegistration() {
    // Connect to the blockchain
    const provider = new WsProvider(PROVIDER_URL);
    const api = await ApiPromise.create({ provider });

    console.log('Connected to the blockchain.');

    // Query the storage to check node registration
    const nodeInfo = await api.query.registration.nodeRegistration(NODE_ID);

    if (nodeInfo.isSome) {
        console.log('Node is registered:', nodeInfo.toHuman());
    } else {
        console.log('Node is not registered.');
    }

    await api.disconnect();
}

// Run the function
checkNodeRegistration().catch(console.error);
