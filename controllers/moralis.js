import Moralisdefault from 'moralis'
import pkg from '@moralisweb3/evm-utils'
import config from '../config'
import axios from 'axios'

const { EvmChain } = pkg

const Moralis = Moralisdefault.default
await Moralis.start({
  apiKey: config.MORALIS.API_KEY
})
const chain = EvmChain.POLYGON
// console.log(chain)

export async function getBalanceData (address) {
  // Get native balance
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain
  })

  // Format the native balance formatted in ether via the .ether getter
  const native = nativeBalance.result.balance.ether
  // console.log(native)
  return native
}

export async function getERC20Data (address) {
  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain
  })

  // Format the balances to a readable output with the .display() method
  const tokens = tokenBalances.result.map((token) => {
    return {
      name: token.toJSON().token.name,
      tokenAddress: token.toJSON().token.contractAddress,
      symbol: token.toJSON().token.symbol,
      balance: token.toJSON().value,
      decimal: token.toJSON().token.decimals
    }
  })

  // Get token balances
  const tokenTransfers = await Moralis.EvmApi.token.getWalletTokenTransfers({
    address,
    chain
  })
  //   console.log(tokenTransfers)
  // Format the balances to a readable output with the .display() method
  const transfers = await Promise.all(tokenTransfers.result.map(async (transfer) => {
    let tokenData = await Moralis.EvmApi.token.getTokenMetadata({
      addresses: [transfer.toJSON().address],
      chain

    })
    tokenData = tokenData.toJSON()[0].token
    return {
      name: tokenData.name,
      tokenAddress: transfer.toJSON().address,
      symbol: tokenData.symbol,
      decimal: tokenData.decimals,
      fromAddress: transfer.toJSON().fromAddress,
      toAddress: transfer.toJSON().toAddress,
      amount: transfer.toJSON().value,
      transactionHash: transfer.toJSON().transactionHash
    }
  }))

  //   console.log(tokens)
  // console.log(transfers)
  // Add tokens to the output
  return { tokens, transfers }
}

export async function getNFTData (address) {
  // Get the nfts
  const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain
  })

  // Format the output to return name, amount and metadata
  const nfts = nftsBalances.result.map((nft) => {
    console.log(nft.toJSON())
    return {
      name: nft.toJSON().name,
      symbol: nft.toJSON().symbol,
      tokenId: nft.toJSON().tokenId,
      amount: nft.toJSON().amount,
      contractType: nft.toJSON().contractType,
      tokenAddress: nft.toJSON().tokenAddress,
      tokenUri: nft.toJSON().tokenUri,
      tokenMetadata: nft.toJSON().metadata.json

    }
  })

  const nftsTransfers = await Moralis.EvmApi.nft.getWalletNFTTransfers({
    address,
    chain
  })

  const transfers = await Promise.all(nftsTransfers.result.map(async (transfer) => {
    if (!isNaN(transfer.toJSON().tokenId)) {
      try {
        const options = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/nft/${transfer.toJSON().tokenAddress}/${transfer.toJSON().tokenId}`,
          params: { chain: chain._value, format: 'decimal' },
          headers: { accept: 'application/json', 'X-API-Key': config.MORALIS.API_KEY }
        }
        const nftDetails = (await axios.request(options)).data
        return {
          name: nftDetails.name,
          symbol: nftDetails.symbol,
          tokenId: transfer.toJSON().tokenId,
          amount: transfer.toJSON().amount,
          contractType: transfer.toJSON().contractType,
          tokenAddress: transfer.toJSON().tokenAddress,
          fromAddress: transfer.toJSON().fromAddress,
          toAddress: transfer.toJSON().toAddress,
          transactionHash: transfer.toJSON().transactionHash

        }
      } catch (err) {
        //   console.log(transfer)
        // console.log(err)
      }
    }
  }))

  // Add nfts to the output)
  // console.log(nfts)
  //   console.log(transfers)
  return { nfts, transfers }
}

// getBalanceData('0x86619406d3d3b0ce29f7564d03cb7de6e9e8de16')
// getERC20Data('0x86619406d3d3b0ce29f7564d03cb7de6e9e8de16')
// getNFTData('0x86619406d3d3b0ce29f7564d03cb7de6e9e8de16')
