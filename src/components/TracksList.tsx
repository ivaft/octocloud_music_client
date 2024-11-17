import { FlatList, FlatListProps, View, Text, Platform } from "react-native"

import { TracksListItem } from "./TrackListItem"
import { utilsStyles } from "@/styles"
import TrackPlayer, { Track } from "react-native-track-player"
import FastImage from "react-native-fast-image"
import { unkownTrackImageUri } from "@/constants/images"
import { useQueue } from "@/store/queue"
import { useRef } from "react"
import { QueueControls } from "./QueueControls"

export type TracksListProps = Partial<FlatListProps<Track>> & {
    id: string
    tracks: Track[]
    hideQueueControls?: boolean
}

const ItemDivider = () => (
    <View style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 9,
        marginLeft: 60
    }} />
)

export const TracksList = ({ id, tracks, hideQueueControls = false, ...flatListProps }: TracksListProps) => {
    const queueOffset = useRef(0);
    const { activeQueueId, setActiveQueueId } = useQueue();

    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = tracks.findIndex(track => track.url === selectedTrack.url);
        // Track not found, don't do nothing
        if (trackIndex === -1) return;

        const isChangingQueue = id !== activeQueueId;

        if (isChangingQueue) {
            const beforeTracks = tracks.slice(0, trackIndex);
            const afterTracks = tracks.slice(trackIndex + 1);

            // Remove the queue and stop current song
            await TrackPlayer.reset();
            // Build the queue
            await TrackPlayer.add(selectedTrack);
            await TrackPlayer.add(afterTracks);
            await TrackPlayer.add(beforeTracks);
            // Play the song
            await TrackPlayer.play();

            queueOffset.current = trackIndex;
            setActiveQueueId(id);
        } else {
            const nextTrackIndex = trackIndex - queueOffset.current < 0 ?
                tracks.length + trackIndex - queueOffset.current :
                trackIndex - queueOffset.current;

            await TrackPlayer.skip(nextTrackIndex);
            await TrackPlayer.play();
        }


        //console.log(track);
        //await TrackPlayer.load(track);
        //await TrackPlayer.play();
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
        ListHeaderComponent={!hideQueueControls ? (
            <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined}
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