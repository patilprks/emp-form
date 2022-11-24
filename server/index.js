const express = require ('express')
const app = express();
const mysql = require('mysql');
const cors = require ('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'employee_system',
    host: 'localhost' 
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    
    db.query(
        "INSERT INTO emp_database(name, email, age, country, position, wage) VALUES (?,?,?,?,?,?)",
        [name, email, age, country, position, wage],
        (err, result) => {
            if(err){
                console.log('Something went wrong');
            } else{
                res.send("Successfuly inserted");
            }
        }
    );
});

app.get("/display",(req, res) =>{
    db.query(
        "SELECT * FROM emp_database", 
        (err, result) => {
            if(err) {
                console.log("Something went wrong");
            } else{
                res.send(result);
            }
        }
    )
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;

    db.query(
        "UPDATE emp_database SET wage = ? WHERE id = ?", [wage, id], (err, result) => {
            if(err){
                console.log("Something went wrong update")
            } else{
                res.send(result)
            }
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM emp_database WHERE id=?",id,(err, result) =>{
        if(err){
            console.log("Error")
        } else {
            res.send(result);
        }
    })
});



app.listen(3001, ()=>{
    console.log('Server is running on port 3001');
})