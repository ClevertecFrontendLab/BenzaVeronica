import { Button, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { CustomModal } from './CustomModal';

type ModalItem = {
    img: string;
    title: string;
    text: ReactNode | string;
    footer?: ReactNode | string;
    btn?: string;
    alt?: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    item: ModalItem;
    onSubmit?: () => void;
    isDisabled?: boolean;
    dataTestId?: string;
    dataTestIdBtn?: string;
};

export function CustomModalInfo({
    isOpen,
    onClose,
    item,
    onSubmit,
    isDisabled,
    dataTestId,
    dataTestIdBtn,
}: Props) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} dataTestId={dataTestId}>
            <Flex flexDirection='column' gap={8} alignItems='center' p={8} textAlign='center'>
                <Image
                    src={item.img}
                    alt={item?.alt || 'infoImg'}
                    w={{ base: '108px', lg: '206px' }}
                />
                <VStack spacing={4}>
                    <Text fontSize='2xl' color='blackAlpha.900' fontWeight={700}>
                        {item.title}
                    </Text>
                    <Text fontSize='md' color='blackAlpha.700'>
                        {item.text}
                    </Text>
                </VStack>
                {item.footer && (
                    <Text fontSize='xs' color='blackAlpha.600'>
                        {item.footer}{' '}
                        <Link href='https://google.com' isExternal textDecoration='underline'>
                            с поддержкой
                        </Link>
                    </Text>
                )}
                {onSubmit && (
                    <Button
                        data-test-id={dataTestIdBtn}
                        type='submit'
                        colorScheme='black'
                        width='full'
                        fontSize='lg'
                        fontWeight={600}
                        bg='blackAlpha.900'
                        isDisabled={isDisabled}
                        onClick={onSubmit}
                    >
                        {item.btn}
                    </Button>
                )}
            </Flex>
        </CustomModal>
    );
}
