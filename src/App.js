import React, { useState,useEffect } from 'react';
import './App.css';
import {Button,TextField,Switch,FormControlLabel,IconButton,Avatar} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileSaver from 'file-saver';
import Highlight from 'react-highlight';

function App() {
  const [conf,setConf]=useState({
    ssid:"",
    psk:"",
    scan_ssid:0
  });
  const [code,setCode]=useState("");
  const handleChange=event=>{
    switch (event.target.name) {
      case "scan_ssid":
        let value = event.target.checked?1:0;
        setConf({
          ...conf,
          [event.target.name]:value
        })
        break;
      default:
        setConf({
          ...conf,
          [event.target.name]:event.target.value
        })
        break;
    }
  }
  useEffect(()=>{
    let text=`ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n`;
    text+=`network={\n`;
    text+=`  ssid="${conf.ssid}"\n`;
    text+=`  psk="${conf.psk}"\n`;
    text+=`  scan_ssid=${conf.scan_ssid}\n`;
    text+=`}`;
    setCode(text);
  },[conf]);
  const download=()=>{
    let blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "wpa_supplicant.conf");
  }
  return (
    <div className="App">
      <h2>wifi Conf for raspberry pi</h2>
      <Avatar className="logo" alt="logo" src="/raspberrypi.png" />
      <TextField value={conf.wifi} onChange={handleChange} name="ssid" label="wifi" /><br></br>
      <TextField value={conf.psk} onChange={handleChange} name="psk" label="password" /><br></br>
      <br></br>
      <FormControlLabel
          control={<Switch onChange={handleChange} name="scan_ssid" />}
          label="scan_ssid"
      />
      <br></br>
      <br></br>
      copy wpa_supplicant.conf to your SD: /boot/wpa_supplicant.conf
      <br></br>
      <Highlight>
        {code}
      </Highlight>
      <br></br>
      <Button startIcon={<GetAppIcon />} variant="contained" color="primary" onClick={download}>download</Button>
      <br></br>
      <br></br>
      <IconButton onClick={()=>{
        window.location.href="https://github.com/reactbook/wificonf";
      }} color="primary" component="span">
          <GitHubIcon/>
      </IconButton>
    </div>
  );
}

export default App;
