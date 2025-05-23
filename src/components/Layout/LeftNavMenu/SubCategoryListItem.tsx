import { Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { SubCategory } from '~/query/category/category.types';

type Props = {
    el: SubCategory;
    onClick: () => void;
};

export function SubCategoryListItem({ el, onClick }: Props) {
    const { subcategoryId } = useParams();
    const isActive = subcategoryId === el.category;
    return (
        <Flex
            data-test-id={isActive ? `${el.category}-active` : ''}
            onClick={onClick}
            p='6px 8px 6px 40px'
            height={10}
            cursor='pointer'
            alignItems='center'
            position='relative'
            _before={{
                content: '""',
                position: 'absolute',
                background: 'lime.300',
                width: isActive ? '8px' : '1px',
                height: isActive ? '28px' : '24px',
                left: isActive ? '33px' : '40px',
                transition: 'all 0.2s ease-in-out',
            }}
            _hover={{
                bg: 'lime.100',
            }}
        >
            <Text ml={3} fontSize='md' fontWeight={isActive ? 'bold' : 'normal'}>
                {el.title}
            </Text>
        </Flex>
    );
}
