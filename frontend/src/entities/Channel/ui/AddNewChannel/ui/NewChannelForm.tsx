import React, { FC } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TFunction } from 'i18next/index'

import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/shared/hooks'
import { isApiError } from '@/shared/utils/isApiError'
import { Button } from '@/shared/ui/Button'

import { setCurrentChannelId } from '../../../model/currentChannelIdSlice'
import {
    selectAllChannelsNames,
    useAddNewChannelMutation,
} from '../../../api/ChannelApi'

const validationSchema = (
    t: TFunction<'translation', undefined>,
    channelsNames: string[],
) => {
    return Yup.object().shape({
        name: Yup.string()
            .required(t('modals.add.validation.required'))
            .min(3, t('modals.add.validation.min3'))
            .max(20, t('modals.add.validation.max20'))
            .notOneOf(channelsNames, t('modals.add.validation.notUniqueName')),
    })
}

interface NewChannelModalProps {
    onClose: () => void
}

export const NewChannelForm: FC<NewChannelModalProps> = ({ onClose }) => {
    const [addNewChannel] = useAddNewChannelMutation()

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const channelNamesList = useSelector(selectAllChannelsNames)

    const schema = validationSchema(t, channelNamesList)
    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const channel = await addNewChannel({
                        name: filter.clean(values.name),
                    }).unwrap()
                    dispatch(setCurrentChannelId({ id: channel.id }))
                    toast.success(t('modals.add.addChannelSuccess'))
                    resetForm()
                    onClose()
                } catch (error) {
                    if (isApiError(error)) {
                        toast.error(t('modals.add.addChannelError'))
                    } else {
                        console.error(error)
                    }
                }
            }}
        >
            <Form className=''>
                <div>
                    <Field
                        autoFocus={true}
                        id='name'
                        name='name'
                        type='text'
                        className='mb-2 form-control'
                    />
                    <ErrorMessage name='name' component='label' />
                    <label className='visually-hidden' htmlFor='name'>
                        {t('modals.add.name')}
                    </label>
                    <div className='d-flex justify-content-end'>
                        <Button
                            onClick={() => {
                                onClose()
                            }}
                            type='button'
                            className='me-2 btn btn-secondary'
                        >
                            {t('modals.add.cancel')}
                        </Button>
                        <Button type='submit' className='btn btn-primary'>
                            {t('modals.add.add')}
                        </Button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
