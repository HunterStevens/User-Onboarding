import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    firstName:yup.string().required('First Name is required.'),
    lastName:yup.string().required("Last Name is required."),
    email:yup.string().email("Enter a valid email address.").required("Can't leave Email field blank"),
    password:yup.string().required("a password is required.").min(4),//.matches(/(^(?=.*[!@#$%^&*()-_=+<>/])) /, "Your Password is required to have special characters with it (at least one)"),
    vacation:yup.string(),//.required("Choose your dream vactaion"),
    terms: yup.boolean().oneOf([true], "Agree to the terms and conditions that have yet to be displayed... Still working on it.")
});

function Form(){

    const[submitDisabled, setSubmitDisabled] = useState(true);

    const [formInput, setFormInput] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        vacation:'',
        terms:''
    }) 
    
    const [formErr, setFormErr] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        vacation:"",
        terms:""
    })

    const[account, setAccount] = useState([]);

    useEffect(() => {
        schema.isValid(schema).then(good =>{
            setSubmitDisabled(!good);
        })
    }, [formInput]);

    const formSubmission =(event) =>{
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formInput)
        .then(res =>{
            console.log("Grabbed Data", res);
            setAccount([
                ...account,
                res.data
            ])
            console.log("New Account ", account)
        })
        .catch(err => console.log("ERROR: ", err));
    }

    const validateInput = event =>{
        yup
        .reach(schema, event.target.name)
        .validate(event.target.value)
        .then(good =>{
            setFormErr({
                ...formErr,
                [event.target.name]:""
            });
        })
        .catch(err => {
            setFormErr({
                ...formErr,
               [event.target.name]:err.errors[0]
            });
        });
    }


    const formChange = (event) =>{
        event.persist();
        const newForm ={
            ...formInput,
            [event.target.name]: 
            event.target.type === "checkbox" ? event.target.checked :event.target.value
        };
        validateInput(event);
        setFormInput(newForm);
    };


return(
    <form onSubmit={formSubmission} >
        <label htmlFor="firstName">First Name: 
            <input id="firstName" name="firstName" type="text" 
            value={formInput.firstName} onChange={formChange}/>
            {formErr.firstName.length > 0 ? <p>{formErr.firstName}</p> : null} 
        </label>

        <br/>

        <label htmlFor="lastName">Last Name: 
            <input id="lastName" name="lastName" type="text"
            value={formInput.lastName} onChange={formChange}/>
            {formErr.lastName.length > 0 ? <p>{formErr.lastName}</p> : null}
        </label>

        <br/>

        <label htmlFor="email">Email: 
            <input id="email" name="email" type="text" 
            value={formInput.email} onChange={formChange} />
            {formErr.email.length > 0 ? <p>{formErr.email}</p> : null}
        </label>

        <br/>

        <label htmlFor="password">Password: 
            <input id="password" name="password" type="text" 
            value={formInput.password} onChange={formChange}/>
            {formErr.password.length > 0 ? <p>{formErr.password}</p> : null}
        </label>

        <br/>

        <label htmlFor="vacation">Dream Vacation: 
            <select id='vacation' name="vacation" 
            value={formInput.vacation} onChange={formChange}>
                <option value="Empty"> </option>
                <option value="france">France</option>
                <option value="italy">Italy</option>
                <option value="disneyWorld">Disney World</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="moon">Moon</option>
            </select>
            {formErr.vacation.length > 0 ? <p>{formErr.vacation}</p> : null}
        </label>

        <br/>

        <label htmlFor="terms">
            <input id="terms" name="terms" type="checkbox" 
            checked={formInput.terms} onChange={formChange}/> 
            Terms and Conditions
            {formErr.terms.length > 0 ? <p>{formErr.terms}</p> : null} 
        </label>

        <br/>

        <label htmlFor="submit">
            <input id="submit" disabled={submitDisabled} name="submit" type="submit" />
        </label>
    </form>
)
}
export default Form;