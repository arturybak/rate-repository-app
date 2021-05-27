import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import theme from '../theme';
import RepositoryDetailed from './RepositoryDetailed';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

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
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/repo/:id" exact>
            <RepositoryDetailed />
          </Route>
          <Route path="/review" exact>
            <ReviewForm />
          </Route>
          <Route path="/myreviews" exact>
            <ReviewList />
          </Route>

          <Redirect to="/" />
        </Switch>
      </View>
    </>
  );
};

export default Main;
