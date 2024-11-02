import { useEffect, useRef } from "react";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from "react-native-track-player"
import * as Notifications from 'expo-notifications';
import { Linking } from "react-native";

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    });
    await TrackPlayer.updateOptions({
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
        ],
    });
    TrackPlayer.addEventListener(Event.RemotePlay, () =>
        TrackPlayer.play()
    );
    TrackPlayer.addEventListener(Event.RemotePause, () =>
        TrackPlayer.pause()
    );
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemoteDuck, () => {
        TrackPlayer.pause();
    });

    await TrackPlayer.setVolume(0.5);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        setupPlayer()
            .then(() => {
                isInitialized.current = true;
                onLoad?.();
            })
            .catch(error => {
                isInitialized.current = false;
                console.error(error);
            })
    }, []);

}