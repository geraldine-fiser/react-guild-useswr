interface User {
  id: string;
  name: string;
  favoriteArtists: string[];
}

interface Database {
  users: User[];
}

// In-memory database
let mockDatabase: Database = {
  users: [
    {
      id: "1",
      name: "John Doe",
      favoriteArtists: ["Taylor Swift", "Drake", "Billie Eilish"],
    },
    {
      id: "2",
      name: "Jane Smith",
      favoriteArtists: ["The Weeknd", "Ariana Grande"],
    },
    {
      id: "3",
      name: "Bob Johnson",
      favoriteArtists: ["Ed Sheeran", "Olivia Rodrigo", "Bad Bunny"],
    },
  ],
};

export const db = {
  // Get user by ID
  getUser: (id: string) => mockDatabase.users.find((user) => user.id === id),

  // Add artist to user's favorites
  addFavoriteArtist: (userId: string, artist: string) => {
    const user = mockDatabase.users.find((u) => u.id === userId);
    if (user && !user.favoriteArtists.includes(artist)) {
      user.favoriteArtists.push(artist);
    }
    return user;
  },

  // Remove artist from user's favorites
  removeFavoriteArtist: (userId: string, artist: string) => {
    const user = mockDatabase.users.find((u) => u.id === userId);
    if (user) {
      user.favoriteArtists = user.favoriteArtists.filter(
        (artistName) => artistName !== artist
      );
    }
    return user;
  },

  // Get all users
  getAllUsers: () => mockDatabase.users,

  // Get user's favorite artists
  getUserFavorites: (userId: string) => {
    const user = mockDatabase.users.find((u) => u.id === userId);
    return user ? user.favoriteArtists : [];
  },
};
