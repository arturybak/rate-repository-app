import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.token = `${this.namespace}:token`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(this.token);
    return token ? token : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.token, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.token);
  }
}

export default AuthStorage;