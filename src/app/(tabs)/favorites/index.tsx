import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { defaultStyles } from "@/styles"
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native"

import library from '@/assets/data/library.json';
import { screenPadding } from "@/constants/tokens";
import { TracksList } from "@/components/TracksList";

const Favorites = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs'
        }
    });

    const favoritesTracks = useMemo(() => {
        return library.filter((track) => track.rating == 1)
    }, []);

    return <View style={defaultStyles.container}>
        <ScrollView
            style={{ paddingHorizontal: screenPadding.horizontal }}
            contentInsetAdjustmentBehavior="automatic"
        >
            <TracksList scrollEnabled={false} tracks={favoritesTracks} />
        </ScrollView>
    </View>
}

export default Favorites;