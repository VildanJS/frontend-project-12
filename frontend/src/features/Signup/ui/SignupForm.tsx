import { ErrorMessage, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { TFunction } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { useSignupUserMutation } from '../api/signup'

import { setCredentials } from '@/features/Auth/model/sliceAuth'
import { useAppDispatch } from '@/shared/hooks'

import { isApiResponse } from '@/shared/utils/isApiError'
import { Alert } from '@/shared/ui/Alert'
import React from 'react'


const makeSignupSchema = (t: TFunction<'translation', undefined>) => {
    return Yup.object().shape({
        username: Yup.string()
            .required(t('signupPage.validation.required'))
            .min(3, t('signupPage.validation.min3'))
            .max(20, t('signupPage.validation.max20'))
            .notOneOf([Yup.ref('busyName')], t('signupPage.validation.notUniqueUser')),
        password: Yup.string()
            .required(t('signupPage.validation.required'))
            .min(6, t('signupPage.validation.min6')),
        passwordConfirmation: Yup.string()
            .required(t('signupPage.validation.required'))
            .oneOf([Yup.ref('password')], t('signupPage.validation.mustMatch')),
    })
}

export const SignupForm = () => {

    const [signupUser, { error }] =
        useSignupUserMutation()

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    let schema = makeSignupSchema(t)

    return (
        <section className='vh-100' style={{ backgroundColor: '#eee' }}>
            <div className='container h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-lg-12 col-xl-11'>
                        <div className='card text-black' style={{ borderRadius: '25px' }}>
                            <div className='card-body p-md-5'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                                            {t('signupPage.signupCaption')}
                                        </p>
                                        <Formik
                                            initialValues={{
                                                username: '',
                                                password: '',
                                                passwordConfirmation: '',
                                                busyName: '',
                                            }}
                                            validationSchema={schema}
                                            onSubmit={async (values, { setFieldValue, setSubmitting }) => {
                                                try {
                                                    const data = await signupUser({
                                                        username: values.username,
                                                        password: values.password,
                                                    }).unwrap()

                                                    setSubmitting(false)
                                                    dispatch(setCredentials(data))
                                                    navigate('/')
                                                } catch (error) {
                                                    if (isApiResponse(error)) {
                                                        if (error.status === 409) {
                                                            await setFieldValue('busyName', values.username)
                                                        } else {
                                                            toast.error(t('signupPage.networkError', { code: error.status }))
                                                        }
                                                    } else {
                                                        console.error(error)
                                                    }
                                                }
                                            }}
                                        >
                                            {({
                                                  values,
                                                  handleChange,
                                                  handleBlur,
                                                  handleSubmit,
                                                  isSubmitting,
                                              }) => (
                                                <form onSubmit={handleSubmit} className='mx-1 mx-md-4'>
                                                    <div className='d-flex flex-row align-items-center mb-4'>
                                                        <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <input
                                                                placeholder={t('signupPage.username')}
                                                                type='text'
                                                                name='username'
                                                                id='usernameId'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.username}
                                                                className='form-control'
                                                            />
                                                            <ErrorMessage name='username' component='label' />
                                                            <label
                                                                className='visually-hidden'
                                                                htmlFor='username'
                                                            >{t('signupPage.username')}
                                                            </label>
                                                        </div>
                                                    </div>


                                                    <div className='d-flex flex-row align-items-center mb-4'>
                                                        <i className='fas fa-lock fa-lg me-3 fa-fw'></i>
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <input
                                                                placeholder={t('signupPage.password')}
                                                                type='password'
                                                                name='password'
                                                                id='passwordId'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                className='form-control'
                                                            />
                                                            <ErrorMessage name='password' component='label' />
                                                            <label
                                                                className='visually-hidden'
                                                                htmlFor='password'
                                                            >{t('signupPage.password')}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className='d-flex flex-row align-items-center mb-4'>
                                                        <i className='fas fa-key fa-lg me-3 fa-fw'></i>
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <input
                                                                placeholder={t('signupPage.passwordConfirmation')}
                                                                type='password'
                                                                name='passwordConfirmation'
                                                                id='passwordConfirmationId'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.passwordConfirmation}
                                                                className='form-control'
                                                            />
                                                            <ErrorMessage
                                                                name='passwordConfirmation'
                                                                component='label' />
                                                            <label
                                                                className='visually-hidden'
                                                                htmlFor='passwordConfirmation'
                                                            >{t('signupPage.passwordConfirmation')}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <Alert error={error} />


                                                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                                        <button
                                                            disabled={isSubmitting}
                                                            type='submit'
                                                            className='btn btn-primary'>
                                                            {t('signupPage.signupButton')}
                                                        </button>
                                                    </div>

                                                </form>
                                            )}
                                        </Formik>


                                    </div>
                                    <div
                                        className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                                        <img
                                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                            className='img-fluid' alt={t('signupPage.image')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
