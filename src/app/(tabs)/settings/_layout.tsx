import { Stack } from "expo-router"
import { View } from "react-native"

import { StackScreenWithSearchBar } from "@/constants/layout"
import { defaultStyles } from "@/styles"

const SettingsLayout = () => {
    return (<View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                ...StackScreenWithSearchBar,
                headerTitle: 'Settings',
                headerShown: false
            }} />
        </Stack>
    </View>)
}

export default SettingsLayout;