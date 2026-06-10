import { useContext } from 'react';
import { DIServices } from '@Base/di';
import { DIContext } from '@Base/context/DIContext';
import DependencyInjection from '@Base/di/DependencyInjection';

const useDIGet = <T>(alias: DIServices): T => {
	const { container } = useContext<{ container: DependencyInjection }>(DIContext);
	return container.get<T>(alias);
};

export default useDIGet;
