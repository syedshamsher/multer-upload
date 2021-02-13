import React from 'react'
import { Avatar, Card, CardContent, Typography, Button, Box, Dialog, Fade, Backdrop, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles ({
    userCard: {
        width: '250px',
        height: '330px',
        borderRadius: '10px',
        boxShadow: '5px 5px 30px black',
        margin: '10px',
        background: '-webkit-linear-gradient(to left, #0c2b5e, #173c77)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to left, #0c2b5e, #173c77)',
          '&:hover': {
            background: 'black',
          }
      },
    userCardTop: {
        height: '52%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        textAlign: 'center'
      },
    UserCardBottom: {
        color: 'white',
        minHeight: '40%',
        overflow: 'auto',
        minWidth: '100%',
        maxWidth: '100%',
        padding: '0 10px 5px',
        overflowWrap: 'break-word'
      },
      title: {
        color: "white",
      },
      city: {
        color: 'white',
        fontSize: 15
        
      },
      blood: {
        color: 'white',
        fontSize: 15
        
      },
      gender: {
        color: 'white',
        fontSize: 15
      },
      avatar: {
        width: '120px',
        height: '120px',
        margin: '8px 0 0 0',
        borderRadius: '50%',
        border: '4px solid white',
        objectFit: 'cover'
      },
      box: {
        display: "flex",
        justifyContent: "space-evenly"
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
      paper1: {
          minWidth: '500px',
          minHeight: '100px',
          padding: '20px'
      },
      btn: {
            minWidth: "100px",
      }
  });
const Profile = ({student, getPaginatedData, handleDelete}) => {
    const [ name, setName ] = React.useState('');
    const [ city, setCity ] = React.useState('');
    const [ gender, setGender ] = React.useState('');
    const [ image, setImage ] = React.useState('');
    const [ blood, setBlood ] = React.useState('');
    const [ open, setOpen ] = React.useState(false);
    const [ openDeleteModal, setOpenDeleteModal ] = React.useState(false);

    let classes = useStyles();
    
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const handleEdit = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target);
      formData.get('name');
      formData.get('city');
      formData.get('gender');
      formData.get('blood');
      formData.append('_id', student._id)
      formData.append('image', image);
        let config = {
          method: "put",
          url: "http://localhost:5000/api/students/edit",
          headers: {
            "content-type": "application/json",
            "content-type": "multipart/form-data"
          },
          data: formData,
        };
        
        axios(config)
        .then((res) => {
          getPaginatedData()
          })
          .catch((error) => {
            console.log( error )
          })
        alert("Edited")
        handleClose()
      }
    
    React.useEffect(() => {
        setName(student.name)
        setCity(student.city)
        setGender(student.gender)
        setBlood(student.blood)
        setImage(student.image)
    },[])

    const getImageName = ( url ) => {
      if(student.image) {
        let imgUrl = url.split("\\")
        return imgUrl[imgUrl.length-1]
      }
    }
      
    return (
        <div>
            <Card className={classes.userCard}>
                <CardContent >
                    <Box className={classes.userCardTop}>
                        <Avatar alt="profileImg" src={`./uploads/${getImageName(student.image)}`} className={classes.avatar} />
                    </Box>
                    <Box className={classes.userCardBottom}>
                        <Typography variant="h5"  className={classes.title} >
                            {student.name}
                        </Typography>
                        <Typography variant="h6"  className={classes.city} >
                            City: {student.city}
                        </Typography>
                        <Typography variant="h6"  className={classes.blood} >
                            Blood: {student.blood}
                        </Typography>
                        <Typography variant="h6"  className={classes.gender} >
                            Gender : {student.gender}
                        </Typography>
                    </Box>
                  <Box className={classes.box}>
                    <Button className={classes.btn} color="secondary" variant="outlined" onClick={() => setOpenDeleteModal(true)} >DELETE</Button>
                    <Button className={classes.btn} color="primary" variant="outlined" onClick={handleOpen} >EDIT</Button>
                  </Box>
                </CardContent>
              </Card>
                      <Dialog
                        classes={{ paper: classes.paper1}}
                        open={openDeleteModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                      }} >
                          <Typography>Are You Sure You Wanna Delete?</Typography>
                          <Typography>Confirm Delete</Typography>
                          <Button onClick={() => handleDelete(student._id)} variant="contained" color="secondary" style={{margin: '10px'}}>CONFIRM</Button>
                          <Button onClick={() => setOpenDeleteModal(false) } variant="contained" color="primary" style={{margin: '10px'}}>CLOSE</Button>
                      </Dialog>
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
                        <form onSubmit={handleEdit} className={classes.margin}>
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
                                required
                                onChange={(e) => setImage(e.target.value)}
                                variant="outlined"
                                />
                            </Box>
                            <Box style={{display: "flex", justifyContent: "space-evenly", margin: 10}}>
                                <Button type='submit' variant="contained" color="secondary">
                                    DONE
                                </Button>
                                <Button onClick={handleClose} variant="contained" color="primary">
                                    CLOSE
                                </Button>
                            </Box>
                        </form>
                        </Fade>
                      </Dialog>
        </div>
    )
}

export  {Profile}
