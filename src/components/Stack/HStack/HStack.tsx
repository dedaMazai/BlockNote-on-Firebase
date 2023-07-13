import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>; // Omit исключает поле из типа

export const HStack = (props: HStackProps) => <Flex direction="row" {...props} />;
