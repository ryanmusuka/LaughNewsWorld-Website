/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  console.log("🕵️ MY SECRET API KEY IS:", API_KEY);

  const LONG_VIDEOS_PLAYLIST_ID = "PLNgyrPQ_-1BG2nnJbbGNpc7zqYtnseWbC";
  const SHORTS_PLAYLIST_ID = "PLNgyrPQ_-1BGRa1LWazXjJ8xRwI2Q6Y5u";

  try {
    // Fetch both playlists at the same time, cached for 3600 seconds (1 hour)
    const [longRes, shortsRes] = await Promise.all([
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=${LONG_VIDEOS_PLAYLIST_ID}&key=${API_KEY}`, { next: { revalidate: 3600 } }),
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=${SHORTS_PLAYLIST_ID}&key=${API_KEY}`, { next: { revalidate: 3600 } })
    ]);

    const longData = await longRes.json();
    const shortsData = await shortsRes.json();

    // 🚨 THE TRIPWIRE: Print exact error to terminal if YouTube rejects us
    if (!longData.items) {
      console.error("🚨 YOUTUBE API ERROR (LONG VIDEOS):", JSON.stringify(longData, null, 2));
    }
    if (!shortsData.items) {
      console.error("🚨 YOUTUBE API ERROR (SHORTS):", JSON.stringify(shortsData, null, 2));
    }

    // Format the messy YouTube data into clean objects for our frontend
    const formatVideo = (item: any, isShort: boolean) => {
      const snippet = item.snippet;
      const videoId = snippet.resourceId.videoId;
      
      // Get the highest quality thumbnail available
      const thumbnail = snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "";

      return {
        id: videoId,
        title: snippet.title,
        thumbnail: thumbnail,
        link: isShort 
          ? `https://www.youtube.com/shorts/${videoId}` 
          : `https://www.youtube.com/watch?v=${videoId}`
      };
    };

    // Filter out private/deleted videos just in case, then format
    const longVideos = longData.items 
      ? longData.items.filter((item: any) => item.snippet.title !== "Private video").map((item: any) => formatVideo(item, false)) 
      : [];
      
    const shorts = shortsData.items 
      ? shortsData.items.filter((item: any) => item.snippet.title !== "Private video").map((item: any) => formatVideo(item, true)) 
      : [];

    return NextResponse.json({ longVideos, shorts });
    
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}