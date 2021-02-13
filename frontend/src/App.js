import React from 'react';
import './App.css'
import axios from 'axios';
import  {Profile} from './Component/ProfileCard/Profile';
import { Container, Grid, Button, Box, Dialog, Fade, Backdrop, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddButton } from './Component/AddButton/AddButton';
import Pagination from '@material-ui/lab/Pagination';
let fs = require('fs');

const useStyles = makeStyles ({
    gridContainer: {
      maxWidth: "80%",
      paddingLeft: '30px',
    },
    innerGrid: {
    },
    margin: {
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    paper: {
        minWidth: '400px',
        minHeight: '400px'
    },
    btn: {
        width: '80px',
        margin: '10px'
    }
  }); 

const App = () => {
    const [ name, setName ] = React.useState('');
    const [ city, setCity ] = React.useState('');
    const [ gender, setGender ] = React.useState('');
    const [ image, setImage ] = React.useState('');
    const [ blood, setBlood ] = React.useState('');
    const [ students, setStudents ] = React.useState([]);
    const [ loading, setLoading ] = React.useState( false );
    const [currPage, setCurrPage] = React.useState(1);
    const [next, setNext] = React.useState(false);
    const [previous, setPrevious] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(1)
    const [ open, setOpen ] = React.useState(false);

    let classes = useStyles();
    
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    
    const limit = 3;

    const getPaginatedData = () => {
        axios.get(`http://localhost:5000/api/students/?page=${currPage}&limit=${limit}`)
        .then((res) => {
            if( res.data.prev === undefined ) {
                setPrevious( true)
            }
            else {
                setPrevious( false )
            }
            if( res.data.next === undefined ) {
                setNext( true) 
            }
            else {
                setNext( false )
            }
            setTotalPages(res.data.totalPages)
            setStudents([...res.data.current])
            setLoading( false )
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/students/${id}`)
             .then((res) => {
                 if( students.length == 1 && currPage > 1 ) {
                     setCurrPage(prev => prev - 1 )
                 }
                setStudents([...res.data])
                setLoading( false )
             })
             .catch((error) => {
               console.log( error )
             })
        getPaginatedData()
        alert("Deleted Successfully")
      }
    


    // const handlePrevious = () => {
    //     setCurrPage(prev => prev - 1)
    // }

    // const handleNext = () => {
    //     setCurrPage(prev => prev + 1)
    // }

    const handleAdd = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        formData.get('name');
        formData.get('city');
        formData.get('gender');
        formData.get('blood');
        formData.append('image', image);
        if( !name || !city || !gender || !image || !blood ) {
        return( alert("fill in alll details"))
        }
        let config = {
        method: "post",
        url: "http://localhost:5000/api/students/add",
        headers: {
           "content-type": "application/json",
           "content-type": "multipart/form-data"
        },
        data: formData,
    };
        axios(config)
            .then((res) => {
                setStudents([...res.data.reverse()])
                setLoading( false )
            })
            .catch((error) => {
                console.log( error.response )
            })
        alert("New Student Data Added")
        getPaginatedData()
        handleClose()
    }

    React.useEffect(() => {
        getPaginatedData()
    },[currPage, open])

    return (
        <div className="App">
          <Container>
            <div style={{ margin: 'auto'}}>
              <AddButton handleOpen={handleOpen} />
           </div>
           {/* <div style={{marginLeft: "-17px"}}>
                <Button className={classes.btn} color="primary" variant="contained" onClick = { () => handlePrevious() } disabled={previous === true}  >PREVIOUS</Button>
                <Button className={classes.btn} color="secondary" variant="contained" onClick = { () => handleNext()} disabled={next === true} >NEXT</Button>
           </div> */}
           <div style={{display: 'flex', justifyContent: 'center'}}>
               <Pagination count={totalPages} variant="outlined" shape="rounded" color="secondary" page={currPage} onChange={(e, p) => setCurrPage(p)} />
           </div>
            <Dialog
                classes={{ paper: classes.paper}}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                    >
                        <Fade in={open}>
                        <form className={classes.margin} onSubmit={handleAdd} method="post" encType="multipart/form-data" >
                            <Box className={classes.margin}>
                                <TextField
                                name="name"
                                value={name}
                                color="secondary"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                label="Name"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="primary"
                                name="city"
                                value={city}
                                type="city"
                                onChange={(e) => setCity(e.target.value)}
                                variant="outlined"
                                label="city"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                variant="outlined"
                                label="Gender"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                name="blood"
                                value={blood}
                                onChange={(e) => setBlood(e.target.value)}
                                variant="outlined"
                                label="Blood"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                type="file"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                variant="outlined"
                                />
                            </Box>
                            <Box style={{display: "flex", justifyContent: "space-evenly", margin: 10}}>
                                <Button type = "submit" variant="contained" color="secondary">
                                    ADD
                                </Button>
                                <Button onClick={handleClose} variant="contained" color="primary">
                                    CLOSE
                                </Button>
                            </Box>
                        </form>
                        </Fade>
                </Dialog>
          </Container>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
            <Grid container spacing={2} className={classes.gridContainer} >
                {
                    students.map((student) => {
                    return (
                            <Grid item  xs={12}  sm={6} md={4} xl={3} className={classes.innerGrid} key = {student.id}>
                                <Profile getPaginatedData={getPaginatedData} student={student} handleDelete={handleDelete} />
                            </Grid>
                    )
                    })
                }
            </Grid>
          </div>
      </div>
    )
}

export default App