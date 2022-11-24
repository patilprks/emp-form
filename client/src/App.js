import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Form from './components/Form';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {useState} from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';

function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState(0);
    const [displayRecords, setDisplayRecords] = useState([]);
    const [newWage, setNewWage] = useState(0);
    
    let errorMsg = '';

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    const submitForm = () => {
      console.log(name,' not defined')
      if(name && email && age && country && position && wage === undefined ){
        errorMsg = "Please fill the form details"
      } else {
        Axios.post("http://localhost:3001/create", {
          name: name,
          email: email,
          age: age,
          country: country,
          position: position,
          wage: wage,
        }).then(() => {
          getEmployee();
          console.log("Thank you. We have received your data ");
        });
      }
    };

const getEmployee = () => {
  Axios.get("http://localhost:3001/display").then((response) =>{
    setDisplayRecords (response.data);
    })
}

const updateEmployeeWage = (id) => {
  console.log(newWage)
    Axios.put("http://localhost:3001/update", {wage:newWage, id:id}).then((response) => {
      getEmployee();
    })
}

const deleteRecord = (id) => {
  console.log('delete url')
  Axios.delete(`http://localhost:3001/delete/${id}`)
  .then((response) =>{
  console.log(response);
  getEmployee();
  })
}

  return (
    <div className="App">
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
            <p>{errorMsg}</p>
            <div>
            <Button  variant="contained" onClick={getEmployee} className="btn-display">Display</Button>
            <Button className="btn-submit" onClick={submitForm} variant="contained">Submit</Button>
            </div>
          </Box>
          </CardContent>
        </Card>
      </div>
      {displayRecords.map((val,key) => (
      <div className="emp-records">
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    
        <Grid item xs={1}>
            <Item>
              {val.name}
            </Item>
          </Grid>
          <Grid item xs={2}>
          <Item>
            {val.email}
          </Item>
          </Grid> 
          <Grid item xs={1}>
          <Item>
            {val.age}
          </Item>
          </Grid> 
          <Grid item xs={1}>
          <Item>
            {val.country}
          </Item>
          </Grid> 
          <Grid item xs={2}>
          <Item>
            {val.position}
          </Item>
          </Grid> 
          <Grid item xs={1}>
          <Item>
            {val.wage}
          </Item>
          </Grid> 
          <Grid item xs={4} >
          <Item  className="pd-0">
          <span
            component="form"
           noValidate
            autoComplete="off"
          >
          <TextField
                required
                id="newWage"
                label="New Wage"
                type="text"
                variant="outlined"
                onChange={(event) => setNewWage(event.target.value)}
              />
              </span>
              <SaveIcon onClick={updateEmployeeWage}/>
              <DeleteIcon onClick={() =>{deleteRecord(val.id)}}/>
          </Item>
          </Grid> 
      </Grid>
    </Box>
      </div>
        ))}
    </div>
  );
}

export default App;
