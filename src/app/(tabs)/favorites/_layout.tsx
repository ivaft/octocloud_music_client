import { Stack } from "expo-router"
import { View } from "react-native"

import { StackScreenWithSearchBar } from "@/constants/layout"
import { defaultStyles } from "@/styles"

const FavoritesLayout = () => {
    return (<View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                ...StackScreenWithSearchBar,
                headerTitle: 'Favorites'
            }} />
        </Stack>
    </View>)
}

export default FavoritesLayout;