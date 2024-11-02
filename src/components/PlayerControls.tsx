import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import TrackPlayer, { useIsPlaying } from "react-native-track-player"
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { colors } from "@/constants/tokens";

type PlayerControlProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle,
    iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlProps) => {
    return <View style={[styles.container, style]}>
        <View style={styles.row}>
            <SkipToPreviousButton iconSize={40} style={styles.item} />

            <PlayPauseButton iconSize={60} style={styles.item} />

            <SkipToNextButton iconSize={40} style={styles.item} />
        </View>
    </View>
}

export const PlayPauseButton = ({ style, iconSize = 30 }: PlayerButtonProps) => {
    const { playing } = useIsPlaying();

    return <View style={[{
        height: iconSize
    }, style
    ]}>
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        >
            <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
        </TouchableOpacity>
    </View>
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return <TouchableOpacity activeOpacity={0.7} onPress={() => { TrackPlayer.skipToNext(); TrackPlayer.play(); }} >
        <FontAwesome6 name={"forward"} size={iconSize} color={colors.text} />
    </TouchableOpacity>
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return <TouchableOpacity activeOpacity={0.7} onPress={() => { TrackPlayer.skipToPrevious(); TrackPlayer.play(); }}>
        <FontAwesome6 name={"backward"} size={iconSize} color={colors.text} />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginHorizontal: 40
    }
})