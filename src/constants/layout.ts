import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "./tokens";
import { Platform } from "react-native";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    ...Platform.select({
        ios: {
            headerLargeTitle: true,
            headerLargeStyle: {
                backgroundColor: colors.background,
            },
            headerLargeTitleStyle: {
                color: colors.text
            },
        },
        android: {
        }
    }),
    headerTintColor: colors.text,
    headerTransparent: true,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false,
}