import { TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

import library from '@/assets/data/library.json';
import { useEffect } from "react";

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
            const response = await fetch('https://octocloud.ivanft.com/music');
            let data = await response.json();
            data = data.map((val: any) => {
                return {
                    "url": val.filePath,
                    "title": val.title,
                    "artist": val.artists ? val.artists.join(" & ") : '',
                    "artwork": val.albumImageURL,
                    "rating": 1,
                    "playlist": []
                }
            });
            console.log(data);
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