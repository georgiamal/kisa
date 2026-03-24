import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListingsScreen from '../screens/ListingsScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Session } from '@supabase/supabase-js';
import UserProfileScreen from '../screens/UserProfileScreen';

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
        UserProfile: UserProfileScreen,
    },
});

export default function RootNavigator({ 
    session, 
    isGuest, 
    setIsGuest 
}: { 
    session: Session | null; 
    isGuest: boolean; 
    setIsGuest: (isGuest: boolean) => void
}) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {session || isGuest? (
                // logged in — only app screens available
                <Stack.Screen name='UserProfile' component={UserProfileScreen} />
                // <Stack.Screen name='Listings' component={ListingsScreen} />
                // TODO: add app navigator here later
            ) : (
                // not logged in — only auth screens available
                <>
                <Stack.Screen name="Welcome">
                        {() => <WelcomeScreen setIsGuest={setIsGuest} />}
                    </Stack.Screen>
                <Stack.Screen name='Login' component={LogInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}