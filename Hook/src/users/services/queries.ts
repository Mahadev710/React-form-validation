import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import type { Option } from '../../types/option';
import type { ApiGet } from '../types/apiTypes';
import type { Schema } from '../types/schema';

/**
 * Fetches a list of states for UI selection.
 */
export function useStates() {
    return useQuery({
        queryKey: ['states'],
        queryFn: async (): Promise<Option[]> => {
            const { data } = await axios.get<Option[]>('http://localhost:8080/states');
            return data;
        },
    });
}

/**
 * Fetches a list of languages for UI selection.
 */
export function useLanguages() {
    return useQuery({
        queryKey: ['languages'],
        queryFn: async (): Promise<Option[]> => {
            const { data } = await axios.get<Option[]>('http://localhost:8080/languages');
            return data;
        },
    });
}

/**
 * Fetches a list of genders for UI selection.
 */
export function useGenders() {
    return useQuery({
        queryKey: ['genders'],
        queryFn: async (): Promise<Option[]> => {
            const { data } = await axios.get<Option[]>('http://localhost:8080/genders');
            return data;
        },
    });
}

/**
 * Fetches a list of skills for UI selection.
 */
export function useSkills() {
    return useQuery({
        queryKey: ['skills'],
        queryFn: async (): Promise<Option[]> => {
            const { data } = await axios.get<Option[]>('http://localhost:8080/skills');
            return data;
        },
    });
}

/**
 * Fetches all users and transforms the data into a simplified format for UI lists.
 */
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<Option[]> => {
            const { data } = await axios.get<ApiGet[]>('http://localhost:8080/users');
            
            // Transform the full user data into a simple { id, label } format
            return data.map((user) => ({
                id: user.id.toString(),
                label: user.name,
            }));
        },
    });
}

/**
 * Fetches a single user by ID and transforms the API response 
 * into the format required by the form schema.
 * @param id The ID of the user to fetch.
 */
export function useUser(id: string) {
    return useQuery({
        queryKey: ['user', { id }],
        queryFn: async (): Promise<Schema> => {
            const { data } = await axios.get<ApiGet>(
                `http://localhost:8080/users/${id}`
            );

            // This is a critical adapter layer: it transforms the raw API data
            // into the precise shape and data types the form needs (e.g., string -> Date)
            return {
                variant: 'edit',
                id: data.id.toString(),
                name: data.name,
                email: data.email,
                formerEmploymentPeriod: [
                    new Date(data.formerEmploymentPeriod[0]),
                    new Date(data.formerEmploymentPeriod[1]),
                ],
                gender: data.gender,
                languagesSpoken: data.languagesSpoken,
                registrationDateAndTime: new Date(data.registrationDateAndTime),
                salaryRange: [data.salaryRange[0], data.salaryRange[1]],
                skills: data.skills,
                states: data.states,
                students: data.students,
                isTeacher: data.isTeacher,
            };
        },
        // This query will not run until a valid 'id' is provided.
        enabled: !!id,
    });
}
