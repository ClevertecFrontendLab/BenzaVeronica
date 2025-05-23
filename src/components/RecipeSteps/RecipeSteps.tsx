import { Flex, Text } from '@chakra-ui/react';

import { recipe } from '~/store/recipe/recipe.types';

import RecipeStepCard from './RecipeStepCard';

type Props = {
    item: recipe;
};

function RecipeSteps(props: Props) {
    return (
        <Flex direction='column' gap={5} justifyContent='space-between'>
            <Text fontSize={{ base: '2xl', xl: '5xl' }} fontWeight={600}>
                Шаги приготовления
            </Text>
            {props.item.steps.map((el, index) => (
                <RecipeStepCard
                    key={`RecipeSteps_${el.stepNumber}`}
                    el={el}
                    isLast={props.item.steps.length - 1 === index}
                />
            ))}
        </Flex>
    );
}

export default RecipeSteps;
