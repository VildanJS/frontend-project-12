import React, { type FC, type PropsWithChildren } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { type TFunction } from 'i18next'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/shared/hooks'
import { isApiError } from '@/shared/utils/isApiError'
import { Alert } from '@/shared/ui/Alert'
import { useLoginUserMutation } from '@/entities/User/api/UserApi'
import { setCredentials } from '@/entities/User'
import { getRouteMain, getRouteSignupPage } from '@/shared/const'


interface LoginFormProps extends PropsWithChildren {
    className?: string
}

const makeLoginSchema = (t: TFunction<'translation', undefined>) => Yup.object({
    username: Yup.string()
        .required(t('loginPage.validation.required')),
    password: Yup.string()
        .required(t('loginPage.validation.required')),
})


export const LoginForm: FC<LoginFormProps> = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [loginUser, { isError }] = useLoginUserMutation()

    const schema = makeLoginSchema(t)

    return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const data = await loginUser(values).unwrap()
                        dispatch(setCredentials(data))
                        setSubmitting(false)
                        navigate(getRouteMain())
                    } catch (error) {
                        if (isApiError(error)) {
                            toast.error(t('signupPage.networkError', { code: error.status }))
                        } else {
                            console.error(error)
                        }
                    }
                }}
            >{
                ({
                     values,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isSubmitting,
                 }) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className='form-outline mb-4'>
                                <input
                                    placeholder={t('loginPage.username')}
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
                                    htmlFor='usernameId'
                                >{t('loginPage.username')}
                                </label>
                            </div>

                            <div className='form-outline mb-4'>
                                <input
                                    placeholder={t('loginPage.password')}
                                    type='password'
                                    name='password'
                                    id='passwordId'
                                    onChange={handleChange}
                                    onBlur={handleBlur} value={values.password}
                                    className='form-control'
                                />
                                <ErrorMessage name='password' component='label' />
                                <label
                                    className='visually-hidden'
                                    htmlFor='passwordId'
                                >{t('loginPage.password')}
                                </label>
                            </div>

                            {isError && <Alert error={t('loginPage.wrongCredentials')} />}


                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='btn btn-primary btn-block mb-4'
                            >{t('loginPage.login')}
                            </button>

                            <div className='text-center'>
                                <p>
                                    {t('loginPage.noAccountQuestion')}
                                    <NavLink to={getRouteSignupPage()}>{t('loginPage.signup')}</NavLink>
                                </p>
                            </div>
                        </form>
                    </>
                )
            }
            </Formik>
        </div>
    )
}
