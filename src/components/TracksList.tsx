import { FlatList, FlatListProps, View, Text, Platform } from "react-native"

import { TracksListItem } from "./TrackListItem"
import { utilsStyles } from "@/styles"
import TrackPlayer, { Track } from "react-native-track-player"
import FastImage from "react-native-fast-image"
import { unkownTrackImageUri } from "@/constants/images"

export type TracksListProps = Partial<FlatListProps<Track>> & {
    tracks: Track[]
}

const ItemDivider = () => (
    <View style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 9,
        marginLeft: 60
    }} />
)

export const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {

    const handleTrackSelect = async (track: Track) => {
        console.log(track);
        await TrackPlayer.load(track);
        await TrackPlayer.play();
    }

    return <FlatList
        data={tracks}
        contentContainerStyle={{
            ...Platform.select({
                android: {
                    paddingTop: 70
                },
                ios: { paddingTop: 10 }
            }), paddingBottom: 128
        }}
        ListFooterComponent={tracks.length == 0 ? <></> : ItemDivider}
        ItemSeparatorComponent={ItemDivider}
        ListEmptyComponent={<View>
            <Text style={utilsStyles.emptyContentText}>No songs found</Text>
            <FastImage
                source={{
                    uri: unkownTrackImageUri,
                    priority: FastImage.priority.normal
                }}
                style={utilsStyles.emptyContentImage}
            />
        </View>}
        renderItem={({ item: track }) => <TracksListItem
            track={track}
            onTrackSelect={handleTrackSelect}
        />}
        {...flatListProps}
    />
}