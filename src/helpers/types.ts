import { Track } from "react-native-track-player";

export type PlayList = {
    name: string
    tracks: Track[]
    artworkPreview: string
}

export type Artist = {
    name: string,
    tracks: Track[]
}

export type TrackWithPlaylist = Track & { playlist?: string[] };