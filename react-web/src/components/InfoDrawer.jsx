import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';

const InfoDrawer = ({ open, onClose }) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose} style={{ position: 'absolute' }}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mail" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default InfoDrawer;
