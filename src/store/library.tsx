import { TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

import library from '@/assets/data/library.json';
import { useEffect } from "react";

interface Artist {
    Id: string;
    Name: string;
}
interface Album {
    Id: string;
    Name: string;
    ImageUrl: string;
}
interface Music {
    Id: string;
    Title: string;
    Album?: Album;
    Artists: Array<Artist>;
    StreamUrl: string;
}

interface LibraryState {
    tracks: TrackWithPlaylist[]
    setTracks: (tracks: TrackWithPlaylist[]) => void
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: [],
    setTracks: (tracks: TrackWithPlaylist[]) => set((state) => ({
        tracks: tracks
    })),
    toggleTrackFavorite: (track) =>
        set((state) => ({
            tracks: state.tracks.map((currentTrack) => {
                if (currentTrack.url === track.url) {
                    return {
                        ...currentTrack,
                        rating: currentTrack.rating === 1 ? 0 : 1,
                    }
                }

                return currentTrack
            }),
        })),
    addToPlaylist: () => { },
}));

export const useFetchLibrary = () => {
    const { tracks, setTracks } = useLibraryStore();

    const fetchLibrary = async () => {
        try {
            const response = await fetch('https://octocloud.ivanft.com/Music/List');
            let data = await response.json();
            data = data.map((val: Music) => {
                return {
                    "url": val.StreamUrl,
                    "title": val.Title,
                    "artist": val.Artists? val.Artists.map((artist: Artist) => artist.Name).join(" & ") : "Unkown",
                    "artwork": val.Album?.ImageUrl ?? "",
                    "rating": 1,
                    "playlist": []
                }
            });
            setTracks(data);
        } catch (error) {
            console.error('Error fetching library data:', error);
        }
    };

    return { fetchLibrary };
};

export const useTracks = () => {
    const { fetchLibrary } = useFetchLibrary();
    return {
        fetchServerTrackList: fetchLibrary,
        tracks: useLibraryStore((state) => state.tracks)
    };
};

export const useFavorites = () => {
    const favorites = useLibraryStore(state => state.tracks.filter(track => track.rating === 1));
    const toggleTrackFavorite = useLibraryStore(state => state.toggleTrackFavorite);

    return {
        favorites, toggleTrackFavorite
    };
}