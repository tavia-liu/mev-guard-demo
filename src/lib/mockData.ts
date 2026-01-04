export interface SandwichAttack {
  victimTxHash: string;
  frontrunTxHash: string;
  backrunTxHash: string;
  attackerAddress: string;
  victimLossUSD: string;
  blockNumber: number;
  timestamp: number;
  tokenPair: string;
}

export interface ScanResult {
  walletAddress: string;
  ensName?: string;
  totalTransactions: number;
  attackedTransactions: number;
  totalLossUSD: string;
  attacks: SandwichAttack[];
  aiReport: string;
  riskLevel: 'low' | 'medium' | 'high';
}

// Mock data for demo
export const MOCK_RESULTS: Record<string, ScanResult> = {
  'vitalik.eth': {
    walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    ensName: 'vitalik.eth',
    totalTransactions: 156,
    attackedTransactions: 8,
    totalLossUSD: '2,847.32',
    riskLevel: 'medium',
    aiReport: 'This wallet has experienced 8 sandwich attacks over 156 DEX transactions (5.1% attack rate). The majority of attacks occurred during high-volatility periods on Uniswap V3. Estimated total loss is $2,847. Recommendation: Use private RPC endpoints like MEV Blocker or Flashbots Protect for future transactions.',
    attacks: [
      {
        victimTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        frontrunTxHash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        backrunTxHash: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        attackerAddress: '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13',
        victimLossUSD: '523.45',
        blockNumber: 18956234,
        timestamp: Date.now() - 86400000 * 3,
        tokenPair: 'ETH/USDC',
      },
      {
        victimTxHash: '0x2345678901bcdef12345678901bcdef12345678901bcdef12345678901bcdef1',
        frontrunTxHash: '0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        backrunTxHash: '0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        attackerAddress: '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13',
        victimLossUSD: '892.10',
        blockNumber: 18945123,
        timestamp: Date.now() - 86400000 * 7,
        tokenPair: 'ETH/USDT',
      },
      {
        victimTxHash: '0x3456789012cdef123456789012cdef123456789012cdef123456789012cdef12',
        frontrunTxHash: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        backrunTxHash: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        attackerAddress: '0x5050F69a9786F081509234F1a7F4684b5E5b76C9',
        victimLossUSD: '1,431.77',
        blockNumber: 18932456,
        timestamp: Date.now() - 86400000 * 14,
        tokenPair: 'WBTC/ETH',
      },
    ],
  },
  'default': {
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f5bE21',
    ensName: undefined,
    totalTransactions: 45,
    attackedTransactions: 3,
    totalLossUSD: '347.89',
    riskLevel: 'low',
    aiReport: 'This wallet shows moderate MEV exposure with 3 detected sandwich attacks across 45 DEX transactions (6.7% attack rate). Total estimated loss is $347.89. The attacks primarily targeted ETH/stablecoin swaps during periods of high gas prices. Consider using MEV-protected RPC endpoints.',
    attacks: [
      {
        victimTxHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        frontrunTxHash: '0x1111111111111111111111111111111111111111111111111111111111111111',
        backrunTxHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
        attackerAddress: '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57',
        victimLossUSD: '156.23',
        blockNumber: 18967890,
        timestamp: Date.now() - 86400000 * 2,
        tokenPair: 'ETH/DAI',
      },
    ],
  },
};

export function getMockResult(query: string): Promise<ScanResult> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (query.toLowerCase() === 'vitalik.eth') {
        resolve(MOCK_RESULTS['vitalik.eth']);
      } else {
        // Return default result with the queried address
        const result = { ...MOCK_RESULTS['default'] };
        if (query.endsWith('.eth')) {
          result.ensName = query;
          result.walletAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
        } else {
          result.walletAddress = query;
        }
        resolve(result);
      }
    }, 2000);
  });
}
