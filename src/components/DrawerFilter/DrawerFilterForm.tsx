import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import SelectedTags from '~/components/SelectedTags';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe/recipe-filter-selector';
import { resetFilters, setAllFilter } from '~/store/recipe/recipe-filter-slice';

import BsFillXCircleFill from '../../assets/BsFillXCircleFill.svg?react';
import { useFilterConfig } from './DrawerFilter.config';
import DrawerFilterFields from './DrawerFilterFields';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export type FormValues = {
    categories: string[];
    author: string[];
    meatTypes: string[];
    sideDishes: string[];
    allergens: string[];
};

const getEmptyFilterValues = (): FormValues => ({
    categories: [],
    author: [],
    meatTypes: [],
    sideDishes: [],
    allergens: [],
});

function DrawerFilterForm(props: Props) {
    const filters = useAppSelector(selectRecipeFilter);

    const {
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            ...getEmptyFilterValues(),
            ...filters,
        },
    });
    const selectedValuesMap = {
        categories: watch('categories') || [],
        meatTypes: watch('meatTypes') || [],
        sideDishes: watch('sideDishes') || [],
        allergens: watch('allergens') || [],
        author: watch('author') || [],
    };

    const dispatch = useAppDispatch();
    const handleFormSubmit = (data: FormValues) => {
        props.onClose();
        dispatch(setAllFilter(data));
    };
    const handleClear = () => {
        reset(getEmptyFilterValues());
        dispatch(resetFilters());
    };

    const filterConfig = useFilterConfig();
    const createRemoveHandlers = () => {
        const handlers: Partial<Record<keyof FormValues, (labelToRemove: string) => void>> = {};
        (Object.keys(filterConfig) as Array<keyof FormValues>).forEach((type) => {
            handlers[type] = (labelToRemove: string) => {
                const valueToRemove = filterConfig[type].find(
                    (option) => option.label === labelToRemove,
                )?.id;

                if (valueToRemove) {
                    setValue(
                        type,
                        watch(type)?.filter((value) => value !== valueToRemove),
                    );
                }
            };
        });

        return handlers;
    };
    const removeHandlers = useMemo(() => createRemoveHandlers(), [filterConfig, setValue, watch]);
    return (
        <Drawer isOpen={props.isOpen} placement='right' onClose={props.onClose} size='md'>
            <DrawerOverlay />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DrawerContent
                    bg='white'
                    w={{ base: '344px', lg: '453px' }}
                    data-test-id='filter-drawer'
                >
                    <DrawerHeader
                        p={{ base: 4, lg: 8 }}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text fontSize='2xl'>Фильтр</Text>
                        <Icon
                            as={BsFillXCircleFill}
                            boxSize={6}
                            onClick={props.onClose}
                            data-test-id='close-filter-drawer'
                        />
                    </DrawerHeader>

                    <DrawerBody
                        px={{ base: 4, lg: 8 }}
                        pt={{ base: 4, lg: 2 }}
                        pb={{ base: 4, lg: 0 }}
                        flex={1}
                        layerStyle='customScroll'
                    >
                        <DrawerFilterFields control={control} />
                    </DrawerBody>

                    <DrawerFooter display='flex' flexDirection='column' alignItems='start' gap={3}>
                        <SelectedTags
                            selectedValuesMap={selectedValuesMap}
                            removeHandlers={removeHandlers}
                        />
                        <Box alignSelf='end'>
                            <Button
                                data-test-id='clear-filter-button'
                                size={{ base: 'sm', lg: 'lg' }}
                                variant='outline'
                                colorScheme='black'
                                onClick={handleClear}
                            >
                                Очистить фильтр
                            </Button>
                            <Button
                                data-test-id='find-recipe-button'
                                size={{ base: 'sm', lg: 'lg' }}
                                colorScheme='black'
                                ml={2}
                                type='submit'
                                isDisabled={!isDirty}
                                pointerEvents={!isDirty ? 'none' : 'auto'}
                            >
                                Найти рецепт
                            </Button>
                        </Box>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    );
}

export default DrawerFilterForm;
