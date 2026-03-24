import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListingsScreen from '../screens/ListingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Listings" 
                component={ListingsScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                            style={{ marginRight: 15 }}
                        >
                            <Text>👤</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Tab.Screen 
                name="Profile" 
                component={UserProfileScreen} 
            />
        </Tab.Navigator>
    );
}