import { getBalanceData, getERC20Data, getNFTData } from './moralis.js'

export const dashboard = async (req, res) => {
  const address = req.params.address
  const balanceData = await getBalanceData(address)
  console.log(balanceData)
  const tokenData = await getERC20Data(address)
  console.log(tokenData.tokens)

  const nftData = await getNFTData(address)
  console.log(nftData.nfts.length)

  res.render('dashboard/index', { title: 'Dashboard', balanceData, tokenData, nftData, userAddress: address })
}

export const profile = async (req, res) => {
  res.render('dashboard/profile', { title: 'profile' })
}

export const nft = async (req, res) => {
  const address = req.params.address
  const nftData = await getNFTData(address)
  console.log(nftData.nfts.length)
  res.render('dashboard/nft', { title: 'nft', nftData, userAddress: address })
}

export const token = async (req, res) => {
  const address = req.params.address
  const tokenData = await getERC20Data(address)
  console.log(tokenData.tokens)
  res.render('dashboard/token', { title: 'token', tokenData, userAddress: address })
}

export const signIn = async (req, res) => {
  res.render('dashboard/sign-in', { title: 'signin' })
}
