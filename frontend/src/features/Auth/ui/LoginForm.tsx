import React, { FC, PropsWithChildren } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '@/shared/hooks'
import { Alert } from '@/shared/ui/Alert'
import { setCredentials } from '@/features/Auth/model/sliceAuth'
import { useLoginUserMutation } from '../api/auth'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

interface LoginFormProps extends PropsWithChildren {
    className?: string
}

const makeLoginSchema = (t: TFunction<'translation', undefined>) => Yup.object({
    username: Yup.string()
        .required(t('loginPage.validation.required')),
    password: Yup.string()
        .required(t('loginPage.validation.required')),
})

type LoginSchemaType = Yup.ObjectSchema<{ username: string; password: string; }, Yup.AnyObject, { username: undefined; password: undefined; }>

export interface LoginInput extends Yup.InferType<LoginSchemaType> {
}


export const LoginForm: FC<LoginFormProps> = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [loginUser, { error }] =
        useLoginUserMutation()

    const schema = makeLoginSchema(t)

    return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await loginUser(values)
                    if ('data' in response) {
                        setSubmitting(false)
                        dispatch(setCredentials(response.data))
                        navigate('/')
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

                            <Alert error={error} />


                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='btn btn-primary btn-block mb-4'
                            >{t('loginPage.login')}
                            </button>

                            <div className='text-center'>
                                <p>
                                    {t('loginPage.noAccountQuestion')}
                                    <NavLink to={'/signup'}>{t('loginPage.signup')}</NavLink>
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
