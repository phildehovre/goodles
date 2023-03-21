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
import dayjs from 'dayjs'
import { getNextDayOfWeek } from '../utils/dates';

const schema = yup
    .object()
    .shape({
        title: yup.string().required('You must name your todo!'),
        startDate: yup.date().default(() => (new Date())).required('You must pick a time'),
        endDate: yup.date().default(() => (new Date())).required('You must pick a time'),
    })
    .required();


function CreateTodo() {

    const [startDate, setStartDate] = React.useState(dayjs())
    const [endDate, setEndDate] = React.useState(dayjs())

    const session = useSession()
    const { register, control, watch, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const queryClient = useQueryClient()

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
        setStartDate(dayjs(value))
        setEndDate(dayjs(value).add(1, 'hours'))
    }

    return (
        <div style={{ display: 'flex' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Todo:</label>
                <input type='text' {...register('title')}></input>
                {errors?.title && <p style={{ color: 'salmon ' }}>{errors?.title?.message?.toString()}</p>}
                <Select options={selectOptions} onChange={(e: any) => { handleSelectDate(e.value) }} />
                <DateTimePicker
                    {...register('startDate')}
                    name='startDate'
                    // @ts-ignore
                    value={startDate} onChange={setStartDate} />
                <DateTimePicker
                    {...register('endDate')}
                    name='endDate'
                    // @ts-ignore
                    value={endDate} onChange={setEndDate} />
                <button type='submit'>{useCreateTodo.isLoading ? <Spinner /> : 'submit'}</button>
            </form>
        </div>
    )
}

export default CreateTodo