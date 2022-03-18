// coins
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const icons = {
  'prev': <KeyboardDoubleArrowLeftRoundedIcon />,
  'next': <KeyboardDoubleArrowRightRoundedIcon />,
  'menu': <MenuIcon />,
  'chevron-left': <ChevronLeftIcon />,
  'chevron-right': <ChevronRightIcon />,
  'list': <ListItem />,
  'list-item': <ListItemIcon />,
  'list-item-text': <ListItemText />,
  'inbox': <InboxIcon />,
  'mail': <MailIcon />,
  'close': <CloseRoundedIcon style={{color: 'white'}} />
};

export default icons;
