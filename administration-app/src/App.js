import React, { useState } from 'react';
import { Label, Button, Textarea } from 'flowbite-react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import naslovna from './slika1.png';

const useStyles = makeStyles(theme => ({
  /*formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },*/
}));

function UserForm() {
  const vendor = {
    name:"",
    address:"",
    details:"",
    users: []
  };
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: '1', name: 'Din Švraka' },
    { id: '2', name: 'Toni Kapetanović' },
    { id: '3', name: 'Emin Džanko' },
    { id: '4', name: 'Zejneb Kost' },
    { id: '5', name: 'Amina Kurtović' },
    { id: '6', name: 'Amar Hasanović' },
    { id: '7', name: 'Aldin Kulagić' },
    { id: '8', name: 'Amina Abdagić' },
    { id: '9', name: 'Kemal Hadžiabdić' },
  ];

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleUsers = event => {
    console.log("Odabrao");
  };

  const handleAddressChange = event => {
    setAddress(event.target.value);
  };

  const handleDetailsChange = event => {
    setDetails(event.target.value);
  };


  const handleUserSelect = event => {
    const selectedUsers = event.target.selectedOptions
      ? Array.from(event.target.selectedOptions, option => option.value)
      : [];
    setSelectedUsers(selectedUsers);
  };

  const handleSubmit = event => {
    event.preventDefault();
    vendor.name = username;
    vendor.address = address;
    vendor.details = details;
    vendor.users = selectedUsers;
    console.log(selectedUsers.length);
    /*console.log('Username:', username);
    console.log('Address:', address);
    console.log('Details:', details);
    console.log('Selected Users:', selectedUsers);*/
  };

  return (
    <div>
      <h1 className='title'>VENDOR MANAGEMENT</h1>
      <div className='container'>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%' }}>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <Label htmlFor='details' value='Name' />
                    <input
                      value={username}
                      onChange={handleUsernameChange}
                      name='Name'
                      placeholder='Your Name'
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <Label htmlFor='details' value='Address' />
                    <input
                      value={address}
                      onChange={handleAddressChange}
                      name='address'
                      placeholder='Your Address'
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <div className='mb-2 block'>
                      <Label htmlFor='details' value='Details' />
                    </div>
                    <Textarea
                      className='text-area'
                      value={details}
                      onChange={handleDetailsChange}
                      id='details'
                      placeholder='Leave a comment...'
                      required={true}
                      rows={4}
                    />
                  </div>
                  <div className='mb-2 block'>
                    <Label htmlFor='users' value='Users' />
                  </div>
                  <div>
                    <Multiselect className='multiselect'
                      displayValue='name'
                      placeholder='Select Users'
                      onSubmit={handleUsers}
                      value={selectedUsers}
                      options={users}

                      showCheckbox
                    />
                  </div>
                  <div>
                    <Button className={classes.button} type='submit' value='Submit'>
                      Submit
                    </Button>
                  </div>
                </form>
              </td>
              <td style={{ width: '50%' }}>
                <img src={naslovna} className='App-logo' alt='logo' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserForm;
