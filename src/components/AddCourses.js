import * as React from 'react';
import {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const toastStyle = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

function getStyles(name, prerequisiteName, theme) {
    return {
        fontWeight:
            prerequisiteName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const theme = createTheme();

const RegisterCourse = () => {
    const [ courseCode, setCourseCode ] = useState('');
    const [ courseName, setCourseName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ credits, setCredits ] = useState('');
    const [ capacity, setCapacity ] = useState('');
    const [ specialisation, setspecialisation ] = useState('');
    const [ selectedPrerequisite, setSelectedPrerequisite] = useState([]);

    const [ savedSpecialisationList, setSavedSpecialisationList] = useState([]);
    const [ savedCourseList, setSavedCourseList] = useState([]);

    useEffect(()=>{
        async function getSpecialisations(){
            await axios.get("http://localhost:8080/ESD_Project-1.0-SNAPSHOT/api/course/getSpecialisations", {})
                .then(
                    (response) => {
                        console.log(response);
                        if(response.status === 200){
                            setSavedSpecialisationList(response.data);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        async function getCourses(){
            await axios.get("http://localhost:8080/ESD_Project-1.0-SNAPSHOT/api/course/getCourses", {})
                .then(
                    (response) => {
                        console.log(response);
                        if(response.status === 200){
                            setSavedCourseList(response.data);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        getSpecialisations();
        getCourses();
    }, []);

    //Helper Method
    function resetFields (){
        setCourseCode('');
        setCourseName('');
        setDescription('');
        setCredits("");
        setCapacity("");
        setspecialisation("");
        setSelectedPrerequisite([]);
    }

    const handleCourseCode = (event) => {
        setCourseCode(event.target.value)
    }

    const handleCourseName = (event) => {
        setCourseName(event.target.value)
    }

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleCredits = (event) => {
        setCredits(event.target.value);
    }

    const handleCapacity = (event) => {
        setCapacity(event.target.value);
    }

    const handlespecialisation = (event) => {
        setspecialisation(event.target.value);
    }

    const handlePrerequisiteChange = (event) => {
        console.log(event.target.value,"hii");
        const {
            target: { value },
        } = event;
        setSelectedPrerequisite(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Perform Validations - coursecode,name,credits,capacity
        //COurse code validation
        if(typeof courseCode === 'string' && courseCode.trim().length === 0){
            toast.error("Please enter Course Code",toastStyle);
            return;
        }
        //TODO Name Validaion
        if(typeof courseName === 'string' && courseName.trim().length === 0){
            toast.error("Please enter Course Name",toastStyle);
            return;
        }
        //TODO credits validation
        let creditsNum = parseInt(credits);
        if(!creditsNum || creditsNum <= 0){
            toast.error("Please enter valid credits",toastStyle);
            return;
        }
        //TODO capacity validation
        let capacityNum = parseInt(capacity);
        console.log("lll",capacityNum);
        if(!capacityNum || capacityNum <= 0){
            toast.error("Please enter valid capacity",toastStyle);
            return;
        }
        //Check if Code is Not Registered already
        let isCourseCodePresent = false;
        savedCourseList.map(course => {
            if (course.courseCode === courseCode){
                isCourseCodePresent  = true;
            }
        })
        if(isCourseCodePresent){
            toast.error("Course Code Already registered.",toastStyle)
            return;
        }

        let temp = [];
        savedCourseList.map(c=>delete c.prerequistes);
        for(let i=0; i<savedCourseList.length; i++){
            for(let j=0; j<selectedPrerequisite.length; j++){
                if(savedCourseList[i].courseId === selectedPrerequisite[j]){
                    temp.push(savedCourseList[i]);
                }
            }
        }

        const data = new FormData(event.currentTarget);

        console.log({
            courseCode: courseCode,
            courseName: courseName,
            description: description,
            credits: creditsNum,
            capacity: capacity,
            specialisation: {specialisationId:specialisation},
            preRequisite: temp
        });

        let requestObject = {
            courseCode: courseCode,
            name: courseName,
            description: description,
            credits: credits,
            capacity: capacity,
            ...specialisation && {specialisation : {specialisationId : specialisation}},
            prerequistes: temp
        };



        await axios.post("http://localhost:8080/ESD_Project-1.0-SNAPSHOT/api/course/addCourse", requestObject)
            .then(
                (response) => {
                    console.log(response);
                    if(response.status === 200){
                        console.log("data saved");

                        //Reset fields after submit
                        resetFields()

                        toast.success('Course added successfully', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
                },
                (error) => {
                    console.log(error);
                }
            );


    };

    const handleReset = (e) => {
        console.log("IN RESET")
        resetFields()
    }
    console.log("jainam",selectedPrerequisite);
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

                    <Typography component="h1" variant="h5">
                        Register Course
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal"
                                   required fullWidth id="courseCode" label="Course Code"
                                   name="courseCode" autoComplete="courseCode" autoFocus
                                   onChange={handleCourseCode}
                                   value = {courseCode} />

                        <TextField margin="normal" required fullWidth id="courseName"
                                   label="Course Name" name="courseName" autoComplete="courseName" autoFocus
                                   onChange={handleCourseName} value={courseName} />

                        <TextField margin="normal" fullWidth id="description" label="Description"
                                   name="description" multiline rows={4} autoComplete="description" autoFocus
                                   onChange={handleDescription} value={description}/>

                        <TextField margin="normal" required fullWidth id="credits" label="Credits"
                                   name="credits" autoComplete="credits" autoFocus
                                   onChange={handleCredits} value={credits}/>

                        <TextField margin="normal" required fullWidth id="capacity" label="Capacity"
                                   name="capacity" autoComplete="capacity" autoFocus
                                   onChange={handleCapacity} value={capacity}/>

                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="select-specialisation">specialisation</InputLabel>
                            <Select fullWidth labelId="select-specialisation" id="specialisation" value={specialisation} label="specialisation" onChange={handlespecialisation}>
                                {
                                    savedSpecialisationList.map(specialisation => {
                                        return (
                                            <MenuItem value={specialisation.specialisationId}>{specialisation.name}</MenuItem>
                                        );
                                    })
                                }

                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="prerequisite-select">Prerequisite</InputLabel>
                            <Select labelId="prerequisite-select" id="prerequisite" multiple value={ selectedPrerequisite}onChange={handlePrerequisiteChange} input={<OutlinedInput id="prerequisite-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {
                                                selected.map
                                                ((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                        </Box>
                                    )} MenuProps={MenuProps}
                            >
                                {
                                    savedCourseList.map
                                    ((course) => (
                                        <MenuItem
                                            key={course.courseId}
                                            value={course.courseId}
                                            style={getStyles(course,  selectedPrerequisite, theme)}
                                        >
                                            {course.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Course
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleReset}
                        >
                            Clear
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterCourse;