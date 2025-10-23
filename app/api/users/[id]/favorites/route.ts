import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mockDatabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = db.getUser(id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    userId: user.id,
    userName: user.name,
    favoriteArtists: user.favoriteArtists,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { artist } = await request.json();

    if (!artist || typeof artist !== "string") {
      return NextResponse.json(
        { error: "Artist is required" },
        { status: 400 }
      );
    }

    const user = db.addFavoriteArtist(id, artist);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Artist added to favorites",
      favoriteArtists: user.favoriteArtists,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { artist } = await request.json();

    if (!artist || typeof artist !== "string") {
      return NextResponse.json(
        { error: "Artist is required" },
        { status: 400 }
      );
    }

    const user = db.removeFavoriteArtist(id, artist);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Artist removed from favorites",
      favoriteArtists: user.favoriteArtists,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
