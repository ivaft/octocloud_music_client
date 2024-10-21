import { Tabs } from "expo-router";

const TabsNavigation = () => {

    return (<Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="playlist" />
        <Tabs.Screen name="(songs)" />
        <Tabs.Screen name="artists" />
    </Tabs>)

}

export default TabsNavigation;