import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
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
    const [ term, setTerm ] = useState('');
    const [ credits, setCredits ] = useState('');
    const [ specialisation, setspecialisation ] = useState('');
    const [ selectedPrerequisite, setSelectedPrerequisite] = useState([]);
    const [ selectedPrerequisiteId, setSelectedPrerequisiteId] = useState([]);
    const [ savedSpecialisationList, setSavedSpecialisationList] = useState([]);
    const [ savedCourseList, setSavedCourseList] = useState([]);
    console.log(selectedPrerequisite);
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
    console.log(savedCourseList);
    console.log(savedSpecialisationList);

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleCredits = (event) => {
        setCredits(event.target.value);
    }

    const handlespecialisation = (event) => {
        setspecialisation(event.target.value)
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
        let temp = [];
        savedCourseList.map(c=>delete c.prerequistes);
        for(let i=0; i<savedCourseList.length; i++){
            for(let j=0; j<selectedPrerequisite.length; j++){
                if(savedCourseList[i].courseId === selectedPrerequisite[j]){
                    temp.push(savedCourseList[i]);
                }
            }
        }
        // selectedPrerequisite.map(prerequiste=>{
        //     let temp = savedCourseList.filter(course=>
        //         course.courseId = prerequiste
        //     );
        //     console.log(temp,"temp");
        // })
        const data = new FormData(event.currentTarget);
        console.log({
            courseCode: data.get('courseCode'),
            courseName: data.get('courseName'),
            description: data.get('description'),
            credits: credits,
            capacity: data.get('capacity'),
            specialisation: {specialisationId:specialisation},
            preRequisite: temp
        });
        let requestObject ;
        // console.log(specialisation.specialisationId,"hejeje");
        if(specialisation.specialisationId===undefined){
            requestObject = {
                courseCode: data.get('courseCode'),
                name: data.get('courseName'),
                description: data.get('description'),
                credits: credits,
                capacity: data.get('capacity'),
                // specialisation && {specialisationId:specialisation ? specialisation : null},
                prerequistes: temp
            };
        }
        else{
            requestObject = {
                courseCode: data.get('courseCode'),
                name: data.get('courseName'),
                description: data.get('description'),
                credits: credits,
                capacity: data.get('capacity'),
                specialisation : {specialisationId: specialisation.specialisationId},
                prerequistes: temp
            };
        }


        await axios.post("http://localhost:8080/ESD_Project-1.0-SNAPSHOT/api/course/addCourse", requestObject)
            .then(
                (response) => {
                    console.log(response);
                    if(response.status === 200){
                        console.log("data saved");
                        setCredits("");
                        setTerm("");
                        setspecialisation("");
                        setSelectedPrerequisite([]);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );


    };
    console.log("jainam",selectedPrerequisite);
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Register Course
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="courseCode"
                            label="Course Code"
                            name="courseCode"
                            autoComplete="courseCode"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="courseName"
                            label="Course Name"
                            name="courseName"
                            autoComplete="courseName"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            autoComplete="description"
                            autoFocus
                        />

                        {/* <FormControl fullWidth margin='normal'>

                        <InputLabel id="select-term">Term</InputLabel>
                            <Select
                                fullWidth
                                labelId="select-term"
                                id="sem-term-select"
                                value={term}
                                label="Term"
                                onChange={handleTermChange}
                            >
                                <MenuItem value={1}>Sem 1</MenuItem>
                                <MenuItem value={2}>Sem 2</MenuItem>
                            </Select>
                    </FormControl> */}

                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="select-credit">Credits</InputLabel>
                            <Select
                                fullWidth
                                labelId="select-credit"
                                id="credts-select"
                                value={credits}
                                label="Credits"
                                onChange={handleCredits}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="capacity"
                            label="Capacity"
                            name="capacity"
                            autoComplete="capacity"
                            autoFocus
                        />

                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="select-specialisation">specialisation</InputLabel>
                            <Select
                                fullWidth
                                labelId="select-specialisation"
                                id="specialisation"
                                value={specialisation}
                                label="specialisation"
                                onChange={handlespecialisation}
                            >
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
                            <Select
                                labelId="prerequisite-select"
                                id="prerequisite"
                                multiple
                                value={ selectedPrerequisite}
                                onChange={handlePrerequisiteChange}
                                input={<OutlinedInput id="prerequisite-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {
                                            selected.map
                                            ((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
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
                            Register
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterCourse;