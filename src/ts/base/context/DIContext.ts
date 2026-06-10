import DependencyInjection from '@Base/di/DependencyInjection';
import { createContext } from 'react';

export const DIContext = createContext<{ container: DependencyInjection }>({
	container: new DependencyInjection(),
});
