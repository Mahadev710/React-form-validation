import { Fragment,useEffect } from "react";

import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubHeader,
  Stack,
  Typography
} from '@mui/material';

import { RHFAutocomplete } from "../../components/RHFAutocomplete";

import{defaultValues,Schema} from '../types/schema'

