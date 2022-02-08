import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function SignInModal() {

    const { modalState, toggleModals, signIn } = useContext(UserContext);
    //console.log(modalState, toggleModals);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("");

    const inputs = useRef([])
    const addInputs = el => {
        // si l'élément existe et qu'il n'est pas dans le tableau alors je le push
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }
    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault()

        try {
            await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            // formRef.current.reset();
            setValidation("");
            //console.log(cred);
            toggleModals("close")
            navigate("/private/private-home")

        } catch {
            //console.dir(err);
            setValidation("Woopsy, email and/or password incorrect")
        }

    }
    //pour effacer le message dans la modal lors de la fermeture de celle-ci
    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

    return (
        <>
            {modalState.signInModal && (
                <div className='position-fixed top-0 vw-100 vh-100'>
                    <div
                        onClick={closeModal}
                        className='w-100 h-100 bg-dark bg-opacity-75'>
                    </div>
                    <div className='position-absolute bg-white top-50 start-50 translate-middle'
                        style={{ minWidth: "400px" }}>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'>Sign In</h5>
                                    <button
                                        onClick={closeModal}
                                        className='btn-close'>
                                    </button>
                                </div>
                                <div className='modal-body'>
                                    <form
                                        ref={formRef}
                                        onSubmit={handleForm}
                                        className='sign-up-form'>
                                        <div className='mb-3'>
                                            <label htmlFor='signInEmail'
                                                className='form-label'>Email adress</label>
                                            <input
                                                ref={addInputs}
                                                name='email'
                                                required
                                                type='email'
                                                className='form-control'
                                                id='signUpEmail'
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='signInPwd'
                                                className='form-label'>Password</label>
                                            <input
                                                ref={addInputs}
                                                name='pwd'
                                                required
                                                type='pwd'
                                                className='form-control'
                                                id='signUpPwd'
                                            />
                                            <p className='text-danger mt-1'>{validation}</p>
                                        </div>
                                        <button className='btn btn-primary'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
