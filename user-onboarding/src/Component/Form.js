import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    firstName:yup.string().required('First Name is required.'),
    lastName:yup.string().required("Last Name is required."),
    email:yup.string().email("Enter a valid email address."),
    password:yup.string().required("a password is required.").min(4).matches(/(^(?=.*[!@#$%^&*()-_=+<>/])) /, "Your Password is required to have special characters with it (at least one)"),
    vacation:yup.string().required("Choose your dream vactaion"),
    terms: yup.boolean().oneOf([true], "Agree to the terms and conditions that have yet to be displayed... Still working on it.")
});

function Form(){

    const[submitDisabled, setSubmitDisabled] = useState(true);

    const [formInput, setFormInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        vacation: '',
    }) 


    const formSubmission =(event) =>{
        event.preventDefault();
    }


    const formChange = (event) =>{
        event.persist();
        
    }


return(
    <form onSubmit={formSubmission} >
        <label htmlFor="firstName">First Name: 
            <input id="firstName" name="firstName" type="text" value={formInput.firstName} onChange={formChange}/> {/*value={} onChange={}*/} 
        </label>

        <br/>

        <label htmlFor="lastName">Last Name: 
            <input id="lastName" name="lastName" type="text" value={formInput.lastName} onChange={formChange}/> {/*value={} onChange={}*/} 
        </label>

        <br/>

        <label htmlFor="email">Email: 
            <input id="email" name="email" type="text" value={formInput.email} onChange={formChange} />{/*value={} onChange={}*/}
        </label>

        <br/>

        <label htmlFor="password">Password: 
            <input id="password" name="password" type="text" value={formInput.password} onChange={formChange}/> {/*value={} onChange={}*/} 
        </label>

        <br/>

        <label htmlFor="Dream Vacation">Dream Vacation: 
            <select id='Dream Vacation' name="dream vacation" value={formInput.vacation} onChange={formChange}>
                <option value="Empty"> </option>
                <option value="france">France</option>
                <option value="italy">Italy</option>
                <option value="disneyWorld">Disney World</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="moon">Moon</option>
            </select>
        </label>

        <br/>

        <label htmlFor="terms">
            <input id="terms" name="terms" type="checkbox" checked={formInput.terms} onChange={formChange}/> {/*value={} onChange={}*/}
            Terms and Conditions 
        </label>

        <br/>

        <label htmlFor="submit">
            <input id="submit" disabled={submitDisabled} name="submit" type="submit" />
        </label>
    </form>
)
}
export default Form;