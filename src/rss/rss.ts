

export async function fetchFeed(feedURL: string) {
  const feed = await fetch(feedURL, {
    headers: {
      'User-Agent': "gator"
    }
  })
  if (!feed.ok) {
    throw Error("something went wrong")
  }
  const content = await feed.text()
  console.log(content)
}
