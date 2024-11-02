import { colors } from "@/constants/tokens";
import { useEffect, useState } from "react"
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors, WebImageColors } from "react-native-image-colors/build/types"
import { match } from "ts-pattern";

export type ImageColors = AndroidImageColors | IOSImageColors | WebImageColors;

type ColorsType = string[];

const getColorsByPlatform = (imageColors: AndroidImageColors | IOSImageColors | WebImageColors) => {
    return match(Platform.OS)
        .returnType<ColorsType>()
        .with('android', () => [
            (imageColors as AndroidImageColors)?.average,
            (imageColors as AndroidImageColors)?.lightVibrant
        ])
        .with('ios', () => [
            (imageColors as IOSImageColors)?.background,
            (imageColors as IOSImageColors)?.primary
        ])
        .with('web', () => [
            (imageColors as WebImageColors)?.vibrant,
            (imageColors as WebImageColors)?.dominant
        ])
        .otherwise(() => [
            colors.background,
            colors.background,
        ]);
}

export const usePlayerBackground = (imageUrl: string) => {
    const [imageColors, setImageColors] = useState<ColorsType>([
        colors.background,
        colors.background,
    ]);


    useEffect(() => {
        getColors(imageUrl, {
            fallback: colors.background,
            cache: true,
            key: imageUrl
        }).then((colors) => setImageColors(getColorsByPlatform(colors)));
    }, [imageUrl]);

    return { imageColors };
}