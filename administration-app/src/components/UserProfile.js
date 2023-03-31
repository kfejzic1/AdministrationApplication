import React, { useState } from "react";
import "./UserProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, Table, TableContainer, TableBody, TableRow, TableCell, Paper, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
    return (
        <div className="container">
            <Box className="profile-banner rounded-left">
                <Box
                    component="img"
                    sx={{
                        height: 250,
                        width: 250
                    }}
                    style={{borderRadius: 125}}
                    alt="profile-pic"
                    src="https://imgur.com/NAGTvvz.png"
                />
            </Box>
            
            <Box>
                <Box className="profile-main">
                    <Typography 
                        variant="h3" 
                        style={{background: "white"}}
                    >
                        Username
                    </Typography>
                    <Typography variant="h6">Mail: example@etf.unsa.ba</Typography>  
                </Box>
                
                <hr style={{margin: 'auto'}}/>

                <Box className="profile-details">
                    <TableContainer className="profile-info" component={Paper}>
                        <Table>
                            <TableRow>
                                <TableCell align="center" variant="head">First Name</TableCell>
                                <TableCell align="center">Ime</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" variant="head">Last Name</TableCell>
                                <TableCell align="center">Prezime</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" variant="head">Age</TableCell>
                                <TableCell align="center">22</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" variant="head">Company</TableCell>
                                <TableCell align="center">Elektrotehnički fakultet Sarajevo</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" variant="head">Country</TableCell>
                                <TableCell align="center">Bosnia & Herzegovina</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );

}

export default ProfilePage;