import React, { useState } from "react";
import "./UserProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, Table, TableContainer, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <Box className="profile-banner">
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
                
                <hr></hr>

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