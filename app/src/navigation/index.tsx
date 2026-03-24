import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListingsScreen from '../screens/ListingsScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Session } from '@supabase/supabase-js';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TabNavigator from './bottomNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type AuthStackParamList = {
    // Auth
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
};

export type TabNavParamList = {
    Listings: undefined;
    Profile: undefined;
};

export type AppStackParamList = {
    MainTabs: undefined;
    EditProfile: undefined;
};

const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();

function AuthStack({ setIsGuest }: { setIsGuest: (isGuest: boolean) => void }) {
    return (
        <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
            <AuthStackNav.Screen name="Welcome">
                {() => <WelcomeScreen setIsGuest={setIsGuest} />}
            </AuthStackNav.Screen>
            <AuthStackNav.Screen name="Login" component={LogInScreen} />
            <AuthStackNav.Screen name="SignUp" component={SignUpScreen} />
        </AuthStackNav.Navigator>
    );
}

const AppStackNav = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabNavParamList>();

function AppStack() {
    return (
        <AppStackNav.Navigator>
            <AppStackNav.Screen 
                name="MainTabs" 
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <AppStackNav.Screen name="EditProfile" component={EditProfileScreen} />
        </AppStackNav.Navigator>
    );
}

export default function RootNavigator({ 
    session, 
    isGuest, 
    setIsGuest 
}: { 
    session: Session | null; 
    isGuest: boolean; 
    setIsGuest: (isGuest: boolean) => void;
}) {
    return (
        <>
            {session || isGuest ? (
                <AppStack />
            ) : (
                <AuthStack setIsGuest={setIsGuest} />
            )}
        </>
    );
}