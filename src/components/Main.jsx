import React from 'react';
import {StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background
  },
});

const Main = () => {
  return (
    <>
    <AppBar />
    <View style={styles.container}>
    <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
    </>
  );
};

export default Main;
