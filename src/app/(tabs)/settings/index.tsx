import { styles } from "@/components/QueueControls";
import { colors, fontSize, screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { NativeSyntheticEvent, ScrollView, Text, TextInput, TextInputChangeEventData, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import useSecureStorage from "@/hooks/useSecureStorage";
import { useState } from "react";


const SettingsScreen = () => {
    const [username, setUsername, saveUsernameToStorage] = useSecureStorage("username");
    const [password, setPassword] = useState<string>("");

    const login = (username: string, password: string) => {
        console.log("Username: " + username);
        console.log("Password: " + password);

        ToastAndroid.show("Not Implemented", 1000);
    };

    const onButtonPress = () => {
        if(username === undefined) return;

        login(username, password);
    };

    return <View style={defaultStyles.container}>
        <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{
                paddingTop: 55,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                flex: 1
            }}
        >
            <Text style={{ color: colors.text, textAlign: 'center', fontSize: fontSize.lg, marginBottom: 20 }}>Login</Text>
            <TextInput
                style={{
                    fontSize: fontSize.sm,
                    color: colors.text,
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    paddingLeft: 20,
                    margin: 10
                }}
                placeholder="user@server.example"
                placeholderTextColor={colors.textMuted}
                value={username}
                onChangeText={(value: string) => setUsername(value)}
            />
            <TextInput
                style={{
                    fontSize: fontSize.sm,
                    color: colors.text,
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    paddingLeft: 20,
                    margin: 10
                }}
                value={password}
                onChangeText={(value: string) => setPassword(value)}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={true}
            />
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={onButtonPress} activeOpacity={0.8} style={[styles.button, {
                    margin: 10
                }]}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
}

export default SettingsScreen;