import { Redirect, Unmatched, useFocusEffect, useRouter } from 'expo-router';
import { View, Text } from 'react-native';

const NotFound = () => {
    const router = useRouter();


    useFocusEffect(() => {
        router.back();
    });

    return <Text>Please wait...</Text>
}

export default NotFound;
