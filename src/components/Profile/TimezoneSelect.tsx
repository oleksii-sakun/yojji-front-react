import React, {useEffect, useState} from 'react';
import ct from 'countries-and-timezones';
import Select from 'react-select';
import axios from 'axios';
import {toast} from 'react-toastify';
import {userUrl} from './Profile';

export const TimezoneSelector = ({user}) => {
  const token = localStorage.getItem('token');
  const [selectedTimezone, setSelectedTimezone] = useState({value: 'select', label: 'Select your timezone'});

  useEffect(()=> {
    if (user.timezone !== 'no timezone') {
      setSelectedTimezone({value: user.timezone, label: user.timezone});
    }
  }, [user]);

  const timezones = ct.getAllTimezones();
  const timezonesValues = Object.values(timezones);

  const handleChange = (selectedOption) => {
    setSelectedTimezone({
      label: selectedOption.value,
      value: selectedOption.label,
    });
  };

  const selectOptions = timezonesValues.map((country)=> ({value: country.name, label: country.name}));
  // const currentSelectedTimezoneInfo = timezones[selectedTimezone.value];


  const handleSaveSelectedTimezone = ()=> {
    if (selectedTimezone.value && selectedTimezone.value !== 'select') {
      axios.post(`${userUrl}timezone/${user.id}`, {timezone: selectedTimezone.value}, {headers: {Authorization: `Bearer ${token}`}})
          .then(() => {
            toast.success('Timezone successfully saved.');
          })
          .catch((err) => {
            console.log(err);
            toast.error(`${err.response.data.message}`);
          });
    } else {
      toast.error('Please select your timezone');
    }
  };


  return (
    <>
      <Select onChange={handleChange}
        options={selectOptions}
        value={selectedTimezone}
      />
      <button onClick={handleSaveSelectedTimezone} type="button" className="btn btn-success">Save selected timezone</button>
    </>
  );
};
