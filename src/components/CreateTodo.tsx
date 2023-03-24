import React, { useEffect } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CardWrapper from './layout/CardWrapper';

const schema = yup
    .object()
    .shape({
        title: yup.string().required('You must name your todo!'),
        startDate: yup.date().default(new Date()).required('You must pick a time'),
        // endDate: yup.date().default(new Date()).required('You must pick a time'),
    })
    .required();


function CreateTodo() {

    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [category, setCategory] = React.useState('')

    const session = useSession()
    const { register, control, watch, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })


    useEffect(() => {
        let end = dayjs(startDate).add(1, 'hours')
        let start = dayjs(startDate)
        setStartDate(new Date(start.year(), start.month(), start.date()))
        setEndDate(new Date(end.year(), end.month(), end.date()))
    }, [])

    const queryClient = useQueryClient()

    const onSubmit = (data: any) => {
        useCreateTodo.mutateAsync({
            ...data,
            user_id: session?.user.id,
            startDate: startDate,
            endDate: endDate,
            calendar_id: uuidv4().split('-').join(''),
            category: category
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
            label: 'In two days',
            value: dayjs().add(2, 'days')
        },
        {
            label: 'Friday',
            value: getNextDayOfWeek(5)
        },
        {
            label: 'Before Monday',
            value: getNextDayOfWeek(7)
        },

    ]

    const categoryOptions = [
        {
            label: 'Work',
            value: 'work',
            color: 'var(--type-1)'
        },
        {
            label: 'Personal',
            value: 'personal',
            color: 'var(--type-2)'
        },
    ]

    const handleSelectDate = (value: any) => {
        let endDate = dayjs(value).add(1, 'hours')
        let startDate = dayjs(value)
        setStartDate(new Date(startDate.year(), startDate.month(), startDate.date()))
        setEndDate(new Date(endDate.year(), endDate.month(), endDate.date()))
    }

    return (
        <CardWrapper title='Create new todo'>

            <form className='create_form' onSubmit={handleSubmit(onSubmit)}>
                <span className='column align-left'>
                    <input type='text' placeholder='What needs to be done?' className='todo-name' {...register('title')}></input>
                    {errors?.title && <p style={{ color: 'salmon ' }}>{errors?.title?.message?.toString()}</p>}

                </span>
                <Select
                    options={selectOptions}
                    onChange={(e: any) => { handleSelectDate(e.value) }}
                    placeholder='Done by...'
                    styles={{
                        option: (baseStyles, state) => (
                            {
                                ...baseStyles,
                                color: 'black',
                                cursor: 'pointer',
                            }),
                        valueContainer: (baseStyles, state) => (
                            {
                                ...baseStyles,
                                cursor: 'pointer',
                            }),
                    }}
                />
                <Select
                    options={categoryOptions}
                    onChange={(e: any) => { setCategory(e.value) }}
                    placeholder='Category...'
                    styles={{
                        option: (baseStyles, state) =>
                        ({
                            ...baseStyles,
                            color: 'black',
                            cursor: 'pointer',
                            backgroundColor: state.data.color
                        }),
                        valueContainer: (baseStyles, state) => (
                            {
                                ...baseStyles,
                                cursor: 'pointer',
                            }),
                    }}
                />
                <span className='column'>
                    <DateTimePicker
                        {...register('startDate')}
                        name='startDate'
                        value={startDate} onChange={setStartDate} />
                    {errors?.startDate && <p style={{ color: 'salmon ' }}>{errors?.startDate?.message?.toString()}</p>}
                    {/* <DateTimePicker
                        {...register('endDate')}
                        name='endDate'
                        value={endDate} onChange={setEndDate} />
                    {errors?.endDate && <p style={{ color: 'salmon ' }}>{errors?.endDate?.message?.toString()}</p>} */}
                </span>
                <button className='todo-submit' title='Create todo.' type='submit'>{useCreateTodo.isLoading ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />}</button>
            </form>
        </CardWrapper>
    )
}

export default CreateTodo