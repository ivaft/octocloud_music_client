import { styles } from "@/components/QueueControls";
import { colors, fontSize, screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { ScrollView, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';


const SettingsScreen = () => {
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
            <Text style={{color: colors.text, textAlign: 'center', fontSize: fontSize.lg, marginBottom: 20}}>Login</Text>
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
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={true}
            />
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {}} activeOpacity={0.8} style={[styles.button, {
                    margin: 10
                }]}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
}

export default SettingsScreen;