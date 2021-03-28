import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Typography, Toolbar, Grid, BottomNavigationAction, Tooltip, Hidden, IconButton } from '@material-ui/core';
import { CollectionsBookmark, LibraryBooks } from '@material-ui/icons';
import useStyles from './styles';
import impression from 'images/impression.png';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LOGOUT } from 'constants/actionTypes';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <div className={classes.brandContainer}>
                        <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Impressions</Typography>
                        <Hidden smDown>
                            <img className={classes.image} src={impression} alt='impression' height='60' />
                        </Hidden>
                    </div>
                </Grid>
                <Grid item xs={8} sm={3}>
                    <Toolbar className={classes.toolbar}>
                        {user ? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button component={Link} to='/auth' variant='contained' color='primary' className={classes.signin}>Sign In</Button>
                        )}
                    </Toolbar>
                </Grid>
                <Grid item xs={4} sm={2}>
                    {/* <Button component={Link} to='/news' variant='contained' color='primary' >News</Button> */}
                    <Tooltip title="Latest news">
                        <IconButton aria-label="news" color="primary" component={Link} to='/news'>
                            <LibraryBooks color='primary' />
                        </IconButton>
                        {/* <BottomNavigationAction label="News" color='primary' component={Link} to='/news' value="recents" icon={<LibraryBooks label="a" color='primary' />} /> */}
                    </Tooltip>
                    {user && (<Tooltip title="Bookmarked news">
                        {/* <BottomNavigationAction value="recents" icon={<CollectionsBookmark />} /> */}
                        <IconButton aria-label="news" color="primary" component={Link}
                            to={{
                                pathname: "/bookmarked-news",
                                state: { bookmark: true }
                            }}>
                            <CollectionsBookmark color='primary' />
                        </IconButton>
                    </Tooltip>)}
                </Grid>
            </Grid>


        </AppBar>
    )
}

export default Navbar;