import { Image } from 'react-native'


import unkownArtistImage from '@/assets/unknown_artist.png'
import unkownTrackImage from '@/assets/unknown_track.png'

export const unkownArtistImageUri = Image.resolveAssetSource(unkownArtistImage).uri
export const unkownTrackImageUri = Image.resolveAssetSource(unkownTrackImage).uri