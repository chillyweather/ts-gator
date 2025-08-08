
import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "../types";

export async function fetchFeed() {
  const feedURL = "https://www.wagslane.dev/index.xml"
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
  if (!content) return
  const parser = new XMLParser
  const parsedData = parser.parse(content)
  const channel = parsedData.rss.channel
  if (!channel) {
    return
  }
  const { title, link, description } = channel
  if (!(title && link && description)) {
    return
  }
  const items = Array.isArray(channel.item) ? channel.item : []

  const rssFeed: RSSFeed = {
    channel: {
      title, link, description, item: []
    }
  }

  for (const item of items) {
    const { title, link, description, pubDate } = item;
    if (!(title && link && description && pubDate)) {
      return
    }
    const rssItem: RSSItem = {
      title, link, description, pubDate
    }

    rssFeed.channel.item.push(rssItem)
  }
  return content
}
