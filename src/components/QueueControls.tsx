import { colors } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { StyleSheet, View, ViewProps, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import TrackPlayer, { Track } from "react-native-track-player"
import { Ionicons } from '@expo/vector-icons'

type QueueControlsProps = {
    tracks: Track[]
} & ViewProps

export const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
    const playQueue = async (tracksArray: Track[]) => {
        await TrackPlayer.setQueue(tracksArray);
        await TrackPlayer.play();
    }

    const handlePlay = async () => {
        await playQueue(tracks);
    }
    const handleShufflePlay = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

        await playQueue(shuffledTracks);
    }

    return <View style={[{ flexDirection: 'row', columnGap: 16 }, style]} {...viewProps}>
        {/* Play Button */}
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
                <Ionicons name='play' size={22} color={colors.primary} />
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
        {/* Shuffle Button */}
        <View>
            <TouchableOpacity onPress={handleShufflePlay} activeOpacity={0.8} style={styles.button}>
                <Ionicons name='play' size={22} color={colors.primary} />
                <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: 'rgba(47, 47, 47, 0.5)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 8,
    },
    buttonText: {
        ...defaultStyles.text,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    }
})