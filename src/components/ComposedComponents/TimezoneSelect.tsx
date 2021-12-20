import React, {useEffect, useState} from 'react';
import ct from 'countries-and-timezones';
import Select from 'react-select';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {queryClient} from '../../App';
import {ResponseErrorI} from '../interfaces';
import {setUserTimezoneReq} from '../../api/requests';

export const TimezoneSelector = ({user}):JSX.Element => {
  const [selectedTimezone, setSelectedTimezone] = useState({value: 'select', label: 'Select your timezone'});

  useEffect(()=> {
    if (user.timezone !== 'no timezone') {
      setSelectedTimezone({value: user.timezone, label: user.timezone});
    }
  }, [user]);


  const setTimezoneMutation = useMutation(()=>setUserTimezoneReq(selectedTimezone.value, user.id), {

    onSuccess: ()=> {
      toast.success('Timezone successfully saved.');
      queryClient.invalidateQueries('userInfo');
    },

    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },
  });

  const timezones = ct.getAllTimezones();
  const timezonesValues = Object.values(timezones);

  const handleChange = (selectedOption) => {
    setSelectedTimezone({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };

  const selectOptions = timezonesValues.map((country)=> ({value: country.name, label: country.name}));

  const handleSaveSelectedTimezone = ()=> {
    setTimezoneMutation.mutate();
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
