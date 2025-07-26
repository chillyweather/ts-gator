

export async function fetchFeed() {
  const feedURL = "https://www.wagslane.dev/index.xml "
  // if (!feedURL) {
  //   // process.exit(1)
  //   return
  // }
  const feed = await fetch(feedURL, {
    headers: {
      'User-Agent': "gator"
    }
  })
  if (!feed.ok) {
    throw Error("something went wrong")
  }
  const content = await feed.text()
  return content
}
