import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <>
      <StatusBar style='dark' animated />
      <NavigationContainer>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
}
