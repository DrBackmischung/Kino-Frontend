import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider'}}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example" 
          centered 
          variant="fullWidth"
        >
          <Tab icon={<HomeIcon/>} {...a11yProps(0)}/>  
          <Tab label="Programm" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          <Tab label="Preisübersicht" {...a11yProps(3)} />
          <Tab label="News" {...a11yProps(4)} />
          <Tab icon={<AccountBoxIcon/>} {...a11yProps(5)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel value={value} index={1}>
        Programm
      </TabPanel>
      <TabPanel value={value} index={2}>
        Events
      </TabPanel>
      <TabPanel value={value} index={3}>
        Preisübersicht
      </TabPanel>
      <TabPanel value={value} index={4}>
        News
      </TabPanel>
      <TabPanel value={value} index={5}>
        Profil
      </TabPanel>
    </Box>
  );
}