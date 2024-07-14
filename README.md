# Solana Dashboard

## Functionality

- `page.tsx`: Main entry point fetching Solana network data and displaying various components.
- `address/[key]/page.tsx`: Fetches and displays account information based on the provided public key.
- `tx/[sign]/page.tsx`: Fetches and displays detailed information about a specific transaction based on its signature.
- `block/[num]/page.tsx`: Fetches and displays information about a specific block based on its number.

## Features

- Includes interactive charts for tracking TPS (Transactions Per Second), network metrics, and token statistics.
- Offers a responsive and user-friendly interface for easy navigation and data visualization.
- Allows users to filter and search transactions, blocks, and accounts for specific information.
- Integrates real-time updates for transaction and block data to keep users informed of the latest activity on the Solana network.

## Setup

1. Clone the repository: `git clone https://github.com/thrishank/solana-dashboard`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the dashboard locally at `http://localhost:3000`

```
git clone https://github.com/thrishank/solana-dashboard

npm install

npm run dev
```
