import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListingsScreen from '../screens/ListingsScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
    Listings: undefined;
};

const Stack = createNativeStackNavigator({
    initialRouteName: 'Welcome',
    screens: {
        Welcome: WelcomeScreen,
        Login: LogInScreen,
        SignUp: SignUpScreen,
        Listings: ListingsScreen,
    },
});

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LogInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Listings' component={ListingsScreen} />
        </Stack.Navigator>
    );
}