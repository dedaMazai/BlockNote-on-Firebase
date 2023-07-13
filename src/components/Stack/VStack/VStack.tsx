import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>; // Omit исключает поле из типа

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return (
        <Flex align={align} direction="column" {...props} />
    );
};
