import { Box } from '@chakra-ui/react';

import { TEST_ID } from '~/test/constant';

import Loader from './Loader';

function LoaderScreen() {
    return (
        <Box
            data-test-id={TEST_ID.AppLoader}
            position='fixed'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='blackAlpha.300'
            backdropFilter='blur(2px)'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex={10}
        >
            <Loader />
        </Box>
    );
}

export default LoaderScreen;
