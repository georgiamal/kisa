import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { useEffect, useState } from 'react';
import { supabase } from './src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import LoadingIndicator from './src/components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
    const initialize = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const guest = await AsyncStorage.getItem('guest_mode');
        setSession(session);
        setIsGuest(guest === 'true');
        setLoading(false);
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
            setSession(session);
            if (session) {
                await AsyncStorage.removeItem('guest_mode');
                setIsGuest(false);
            }
        }
    );

    return () => subscription.unsubscribe();
}, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <NavigationContainer>
            <RootNavigator session={session} isGuest={isGuest} setIsGuest={setIsGuest} />
        </NavigationContainer>
    );
}