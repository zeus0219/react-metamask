import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Delete from '@material-ui/icons/Delete';
import Refresh from '@material-ui/icons/Refresh';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Web3 from 'web3';

const items = [{
    name: "Item 1",
    id: 1
}, {
    name: "Item 2",
    id: 2
}, {
    name: "Item 3",
    id: 3
}, {
    name: "Item 4",
    id: 4
}];

export default function ListComponent() {
    const classes = useStyles();
    const [addedItems, setAddItem] = React.useState({});
    const [totalCount, updateTotalCount] = React.useState(0);
    const [loginStatusMetaMask, updateLoginStatusMetaMask] = React.useState(false);

    React.useEffect(function effectFunction() {
        if (addedItems) {
            let obj = {};
            items.map((item, idx) => {
                obj[item.id] = 0;
            });
            
            setAddItem(obj);
        }

        let web3 = null;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try { 
               window.ethereum.enable().then(function() {
                    updateLoginStatusMetaMask(true);
               });
            } catch(e) {
               
            }
         }
         else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            updateLoginStatusMetaMask(true);
         }
         else {
            alert('You have to install MetaMask !');
         }
    }, [items]);

    const addToCart = (key) => {
        updateTotalCount(totalCount + 1)
        setAddItem((prevState) => {
            return {
                ...prevState,
                [key]: addedItems[key] ++
            }
        })
    }

    const removeCart = (key) => {
        updateTotalCount(totalCount - 1)
        setAddItem((prevState) => {
            return {
                ...prevState,
                [key]: addedItems[key] --
            }
        })
    }

    const removeItem = (key) => {
        updateTotalCount(totalCount - addedItems[key])
        setAddItem((prevState) => {
            return {
                ...prevState,
                [key]: 0
            }
        })
    }

    const clearAll = () => {
        updateTotalCount(0)
        setAddItem((prevState) => {
            var obj = {
                ...prevState,
            }

            items.map((item, idx) => {
                obj[item.id] = 0;
            })
            return obj
        })
    }

    return (
        <Box className={classes.itemWrapper}>
            <Box className={classes.toolbar}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Refresh />}
                    onClick={() => clearAll()}
                    disabled={!loginStatusMetaMask}
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AddShoppingCartIcon />}
                    disabled={!loginStatusMetaMask}
                >
                    Add to Cart ({totalCount})
                </Button>
            </Box>
            {
                items.map((item, index) => (
                    <Paper component="form" className={classes.paper} key={index}>
                        <IconButton className={classes.iconButton} aria-label="minus" onClick={() => removeCart(item.id)} disabled={!loginStatusMetaMask}>
                            <RemoveCircle />
                        </IconButton>
                        <InputBase
                            className={classes.input}
                            inputProps={{ 'aria-label': 'search google maps' }}
                            readOnly={true}
                            value={item.name}
                        />
                        <IconButton className={classes.iconButton} aria-label="plus" onClick={() => addToCart(item.id)} disabled={!loginStatusMetaMask}>
                            <AddCircle />
                        </IconButton>
                        <IconButton className={classes.iconButton} aria-label="delete" onClick={() => removeItem(item.id)} disabled={!loginStatusMetaMask}>
                            <Delete />
                        </IconButton>
                    </Paper>
                    )
                )
            }
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginTop: '10px',
        margin: 'auto'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    itemWrapper: {
        textAlign: 'center',
        padding: '50px'
    },
    toolbar: {
        padding: '10px'

    },
    button: {
        margin: theme.spacing(1),
    },
}));
