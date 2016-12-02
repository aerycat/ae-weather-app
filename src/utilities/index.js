export const listIdCreator = function* () {
  let count = 0
  while(true) {
    yield ++count
  }
}