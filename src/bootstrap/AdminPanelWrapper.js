import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchSession, doLogout } from '../actions';
import { colors } from '../conventions';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  appBar: {
    padding: '19px 24px 21px',
    background: colors.primary[500],
    color: '#FFF',
    position: 'relative'
  },
  appBarDecoration: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 8,
    height: '100%',
    backgroundColor: colors.secondary['A200']
  },
  appTitle: {
    fontWeight: 400,
    margin: 0,
    padding: 0
  },
  sectionBar: {
    width: 'calc(100% - 300px)',
    marginLeft: 300
  },
  sectionTitle: {
    fontWeight: 300
  },
  drawerPaper: {
    width: 300,
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  },
  menuList: {
    flex: 0
  },
  content: {
    position: 'relative',
    padding: 24,
    paddingTop: 86,
    marginLeft: 300
  }
});

const mapStateToProps = state => ({
  session: state.session,
  navigation: state.navigation
});

class AdminPanelWrapper extends React.Component {

  componentDidMount () {
    this.props.dispatch(fetchSession());
  }

  renderLoading () {
    return (
      <div style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress size={ 120 } />
      </div>
    );
  }

  render () {

    let { classes, session } = this.props;
    
    if (session.sessionIsFetching) {
      return this.renderLoading();  
    }

    if (!session.profile) return null;

    return (
      <div className={ classes.root }>

        <AppBar className={ classes.sectionBar }>
          <Toolbar>
            <Typography type="title" color="inherit" className={ classes.sectionTitle }>
              { this.props.navigation.title }
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          type="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={ classes.appBar }>
            <div className={ classes.appBarDecoration } />
            <Typography type="title" color="inherit" className={ classes.appTitle }>
              Admin panel
            </Typography>
          </div>
          <List className={ classes.menuList }>
            <ListItem button onClick={ () => this.props.dispatch(push('/admin')) }>
              <ListItemIcon>
                <Icon>dashboard</Icon>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
          <Divider />
          <List className={ classes.menuList }>
            <ListItem button onClick={ () => this.props.dispatch(doLogout()) }>
              <ListItemIcon>
                <Icon>arrow_back</Icon>
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </List>
        </Drawer>

        <div className={ classes.content }>
          { this.props.children }
        </div>

      </div>
    );
  
  }

}

export default connect(mapStateToProps)(withStyles(styles)(AdminPanelWrapper))