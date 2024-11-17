import { colors, fontSize } from "@/constants/tokens";
import { Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Tabs, usePathname } from "expo-router";
import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons'
import { FloatingPlayer } from "@/components/FloatingPlayer";

const TabsNavigation = () => {
    const currentRoute = usePathname();

    return (<>
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                fontWeight: '500'
            },
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8
            },
            tabBarBackground: () => <BlurView
                intensity={Platform.OS == "ios" ? 95 : 75}
                experimentalBlurMethod={
                    Platform.OS == "android" && currentRoute != "/player" ?
                        "dimezisBlurView" : "none"
                }
                tint="dark"
                style={{
                    ...StyleSheet.absoluteFillObject,
                    overflow: 'hidden',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
            />

        }}>
            <Tabs.Screen name="(songs)" options={{
                title: 'Songs',
                tabBarIcon: ({ color }) => <Ionicons
                    name="musical-notes-sharp"
                    size={24}
                    color={color}
                />
            }} />
            <Tabs.Screen name="playlist" options={{
                title: 'Playlists',
                tabBarIcon: ({ color }) => <FontAwesome6
                    name="list-ul"
                    size={20}
                    color={color}
                />
            }} />
            <Tabs.Screen name="search" options={{
                title: 'Search',
                tabBarIcon: ({ color }) => <FontAwesome6
                    name="magnifying-glass"
                    size={20}
                    color={color}
                />
            }} />
            <Tabs.Screen name="settings" options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => <FontAwesome6
                    name="gear"
                    size={20}
                    color={color}
                />
            }} />
        </Tabs>

        <FloatingPlayer style={{
            position: 'absolute',
            left: 8,
            right: 8,
            ...Platform.select({
                android: {
                    bottom: 55
                },
                ios: {
                    bottom: 90
                }
            })
        }} />
    </>)

}

export default TabsNavigation;