import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker, { DateTimePickerProps } from 'react-datetime-picker'
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../main';
import { createTodo, deleteTodo, updateTodo } from '../utils/db';
import { useSession } from '@supabase/auth-helpers-react';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid'
import Select from 'react-select'
import dayjs, { Dayjs } from 'dayjs'
import { getNextDayOfWeek } from '../utils/dates';
import './CreateTodo.scss'
import './Datetime.scss'

const schema = yup
    .object()
    .shape({
        title: yup.string().required('You must name your todo!'),
        startDate: yup.date().default(new Date()).required('You must pick a time'),
        endDate: yup.date().default(new Date()).required('You must pick a time'),
    })
    .required();


function CreateTodo() {

    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())

    const session = useSession()
    const { register, control, watch, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const queryClient = useQueryClient()
    console.log(errors)

    const onSubmit = (data: any) => {
        useCreateTodo.mutateAsync({
            ...data,
            user_id: session?.user.id,
            startDate: startDate,
            endDate: endDate,
            calendar_id: uuidv4().split('-').join('')
        }).then((res) => {
            queryClient.invalidateQueries({ queryKey: ['todos', session?.user.id] })
            reset()
        })
    }


    const useCreateTodo = useMutation({
        mutationFn: createTodo
    });

    const useUpdateTodo = useMutation({
        mutationFn: updateTodo
    });

    const useDeleteTodo = useMutation({
        mutationFn: deleteTodo
    });

    const selectOptions = [
        {
            label: 'Tomorrow',
            value: dayjs().add(1, 'days')
        },
        {
            label: 'Two days',
            value: dayjs().add(2, 'days')
        },
        {
            label: 'By Friday',
            value: getNextDayOfWeek(5)
        },
        {
            label: 'Before Monday',
            value: getNextDayOfWeek(7)
        },

    ]

    const handleSelectDate = (value: any) => {
        let endDate = dayjs(value).add(1, 'hours').format('DD/MM/YYYY')
        //@ts-ignore
        setStartDate(dayjs(value))
        //@ts-ignore
        setEndDate(dayjs(value).add(1, 'hours'))
    }

    return (
        <div className='create-ctn'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span className='column align-left'>
                    <label>Todo:</label>
                    <input type='text' className='todo-name' {...register('title')}></input>
                    {errors?.title && <p style={{ color: 'salmon ' }}>{errors?.title?.message?.toString()}</p>}

                </span>
                <Select
                    options={selectOptions}
                    onChange={(e: any) => { handleSelectDate(e.value) }}
                    styles={{
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'black',
                            cursor: 'pointer'
                        }),
                    }}
                />
                <span className='column'>
                    <DateTimePicker
                        {...register('startDate')}
                        name='startDate'
                        // @ts-ignore
                        value={startDate} onChange={setStartDate} />
                    {errors?.startDate && <p style={{ color: 'salmon ' }}>{errors?.startDate?.message?.toString()}</p>}
                    <DateTimePicker
                        {...register('endDate')}
                        name='endDate'
                        // @ts-ignore
                        value={endDate} onChange={setEndDate} />
                    {errors?.endDate && <p style={{ color: 'salmon ' }}>{errors?.endDate?.message?.toString()}</p>}
                </span>
                <button type='submit'>{useCreateTodo.isLoading ? <Spinner /> : 'submit'}</button>
            </form>
        </div>
    )
}

export default CreateTodo