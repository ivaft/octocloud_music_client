import { TracksList } from "@/components/TracksList";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles"
import { ScrollView, Text, View } from "react-native"
import { useEffect, useMemo, useState } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";
import { generateTrackListId } from "@/helpers/miscellanious";

const SongsScreen = () => {
    const { tracks, fetchServerTrackList } = useTracks();


    useEffect(() => {
        const interval = setInterval(() => {
            fetchServerTrackList();
        }, 10 * 1000);
        return () => clearInterval(interval);
    }, []);

    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Search for Song'
        }
    })

    const filteredTracks = useMemo(() => {
        if (!search) return tracks

        return tracks.filter(trackTitleFilter(search))
    }, [search, tracks]);

    return <View style={defaultStyles.container}>
        <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{
                paddingHorizontal: screenPadding.horizontal
            }}
        >
            <TracksList id={generateTrackListId('songs', search)} tracks={filteredTracks} scrollEnabled={false} />
        </ScrollView>
    </View>
}

export default SongsScreen;