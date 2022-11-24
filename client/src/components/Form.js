import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import {useState} from 'react';

function form() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState(0);

    const submitForm = () => {
        console.log(name + email)
    }

  return (
    <div className="user-form">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <h1>Employee Database</h1>
      <p className="sub-title">Digital record of current and past employees</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="user-list">
            <TextField
              required
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="age"
              label="Age"
              type="number"
              variant="outlined"
              onChange={(event) => setAge(event.target.value)}
            />
            <TextField
              required
              id="country"
              label="Country"
              type="text"
              variant="outlined"
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="position"
              label="Position"
              type="text"
              variant="outlined"
              onChange={(event) => setPosition(event.target.value)}
            />
            <TextField
              required
              id="wage"
              label="Wage"
              type="number"
              variant="outlined"
              onChange={(event) => setWage(event.target.value)}
            />
          </div>
          <div>
          <Button onClick={submitForm} variant="contained">Submit</Button>
          </div>
        </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default form;
